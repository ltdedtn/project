import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Character } from '../types';
import { TimelineControls } from './TimelineControls';
import { TimelineCharacter } from './TimelineCharacter';

interface TimelineProps {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
  selectedCharacter: Character | null;
}

interface TimelineSection {
  startYear: number;
  endYear: number;
  years: number[];
}

export const Timeline: React.FC<TimelineProps> = ({
  characters,
  onSelectCharacter,
  selectedCharacter,
}) => {
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Create timeline sections based on year gaps
  const { sections, timelinePositions } = useMemo(() => {
    const allYears = characters.flatMap((c) => c.timelinePoints.map((p) => p.year));
    const sortedYears = Array.from(new Set(allYears)).sort((a, b) => a - b);
    
    const sections: TimelineSection[] = [];
    let currentSection: TimelineSection = {
      startYear: sortedYears[0],
      endYear: sortedYears[0],
      years: [sortedYears[0]]
    };

    // Group years into sections based on gaps
    for (let i = 1; i < sortedYears.length; i++) {
      const gap = sortedYears[i] - sortedYears[i - 1];
      
      if (gap > 100) { // Start a new section if gap is more than 100 years
        sections.push(currentSection);
        currentSection = {
          startYear: sortedYears[i],
          endYear: sortedYears[i],
          years: [sortedYears[i]]
        };
      } else {
        currentSection.endYear = sortedYears[i];
        currentSection.years.push(sortedYears[i]);
      }
    }
    sections.push(currentSection);

    // Calculate position for each year
    const timelinePositions = new Map<number, number>();
    const sectionWidth = 90 / sections.length;
    const padding = 5; // 5% padding on each side

    sections.forEach((section, sectionIndex) => {
      const sectionStart = padding + (sectionWidth * sectionIndex);
      const yearsInSection = section.years.length;

      section.years.forEach((year, yearIndex) => {
        const position = sectionStart + (yearIndex * (sectionWidth / Math.max(yearsInSection - 1, 1)));
        timelinePositions.set(year, position);
      });
    });

    return { sections, timelinePositions };
  }, [characters]);

  const getXPosition = useCallback(
    (year: number) => {
      return timelinePositions.get(year) || 0;
    },
    [timelinePositions]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
    timelineRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (timelineRef.current) {
      timelineRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (timelineRef.current) {
      timelineRef.current.style.cursor = 'grab';
    }
  };

  const adjustZoom = useCallback((delta: number) => {
    setZoom((prev) => Math.min(Math.max(0.5, prev + delta), 2));
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      adjustZoom(delta);
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
      return () => element.removeEventListener('wheel', handleWheel);
    }
  }, [adjustZoom]);

  const renderConnections = () => {
    return characters.flatMap((character) =>
      character.connections.map((connection) => {
        const targetCharacter = characters.find((c) => c.id === connection.characterId);
        if (!targetCharacter) return null;

        const sourceX = getXPosition(character.timelinePoints[0].year);
        const targetX = getXPosition(targetCharacter.timelinePoints[0].year);
        const sourceY = characters.indexOf(character) * 120 + 60;
        const targetY = characters.indexOf(targetCharacter) * 120 + 60;

        return (
          <path
            key={`${character.id}-${connection.characterId}`}
            d={`M ${sourceX}% ${sourceY} C ${sourceX}% ${(sourceY + targetY) / 2}, ${targetX}% ${
              (sourceY + targetY) / 2
            }, ${targetX}% ${targetY}`}
            stroke={connection.color}
            strokeWidth="2"
            fill="none"
            opacity={hoveredCharacter === character.id || hoveredCharacter === connection.characterId ? 1 : 0.3}
            filter="url(#glow)"
          />
        );
      })
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900" ref={containerRef}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900" />

      <TimelineControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        zoom={zoom}
        onZoomIn={() => adjustZoom(0.1)}
        onZoomOut={() => adjustZoom(-0.1)}
      />

      <div
        ref={timelineRef}
        className="relative h-full overflow-x-auto cursor-grab active:cursor-grabbing"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out',
          touchAction: 'none',
          userSelect: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative min-h-full p-8" style={{ width: '2000px' }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: '2000px' }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {renderConnections()}
          </svg>

          {/* Section dividers */}
          {sections.map((section, index) => (
            <React.Fragment key={section.startYear}>
              {index > 0 && (
                <div
                  className="absolute top-0 bottom-12 border-l-2 border-purple-500/20"
                  style={{ left: `${5 + (90 / sections.length) * index}%` }}
                />
              )}
            </React.Fragment>
          ))}

          {filteredCharacters.map((character) => (
            <div
              key={character.id}
              className="relative h-[120px] mb-4"
              onMouseEnter={() => setHoveredCharacter(character.id)}
              onMouseLeave={() => setHoveredCharacter(null)}
            >
              {character.timelinePoints.map((point, index) => (
                <TimelineCharacter
                  key={`${character.id}-${point.year}-${index}`}
                  character={character}
                  point={point}
                  isSelected={selectedCharacter?.id === character.id}
                  xPosition={getXPosition(point.year)}
                  onClick={() => onSelectCharacter(character)}
                />
              ))}
            </div>
          ))}

          {/* Year labels */}
          <div className="absolute bottom-0 left-0 right-0 h-12">
            {sections.map((section) =>
              section.years.map((year) => (
                <div
                  key={year}
                  className="absolute text-sm transform -translate-x-1/2 text-gray-400"
                  style={{ left: `${getXPosition(year)}%` }}
                >
                  {year}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};