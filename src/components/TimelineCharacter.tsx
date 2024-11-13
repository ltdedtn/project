import React from 'react';
import { Character } from '../types';

interface TimelineCharacterProps {
  character: Character;
  point: { year: number; event: string };
  isSelected: boolean;
  xPosition: number;
  onClick: () => void;
}

export const TimelineCharacter: React.FC<TimelineCharacterProps> = ({
  character,
  point,
  isSelected,
  xPosition,
  onClick,
}) => {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${xPosition}%`, top: '50%' }}
    >
      <button
        onClick={onClick}
        className={`group relative flex flex-col items-center ${
          isSelected ? 'scale-110' : ''
        }`}
      >
        <div className="relative">
          <div
            className={`absolute inset-0 blur-xl transition-all duration-300 ${
              isSelected ? 'bg-purple-400/50 scale-150' : 'bg-purple-500/30'
            } group-hover:bg-purple-400/50`}
          />
          <img
            src={character.avatar}
            alt={character.name}
            className={`w-12 h-12 object-cover transition-all duration-300 ${
              isSelected
                ? 'border-purple-400 ring-4 ring-purple-400/30'
                : 'border-purple-500 group-hover:border-purple-400'
            } border-2 rounded-lg`}
          />
        </div>
        <div className="mt-2 text-sm text-white opacity-75">{character.name}</div>
        <div className="absolute top-full mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-lg max-w-xs">
            <div className="text-purple-400 text-xs font-semibold mb-1">
              Year {point.year}
            </div>
            <p className="text-xs text-white whitespace-normal">{point.event}</p>
          </div>
        </div>
      </button>
    </div>
  );
};