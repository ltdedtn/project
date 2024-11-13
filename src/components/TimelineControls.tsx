import React from 'react';
import { ZoomIn, ZoomOut, Search } from 'lucide-react';

interface TimelineControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const TimelineControls: React.FC<TimelineControlsProps> = ({
  searchQuery,
  onSearchChange,
  zoom,
  onZoomIn,
  onZoomOut,
}) => {
  return (
    <>
      <div className="absolute top-4 left-4 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 bg-gray-800/90 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={onZoomIn}
          className="p-2 bg-gray-800/90 rounded-lg hover:bg-gray-700/90 transition-colors"
        >
          <ZoomIn className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={onZoomOut}
          className="p-2 bg-gray-800/90 rounded-lg hover:bg-gray-700/90 transition-colors"
        >
          <ZoomOut className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center px-3 bg-gray-800/90 rounded-lg text-white text-sm">
          {Math.round(zoom * 100)}%
        </div>
      </div>
    </>
  );
};