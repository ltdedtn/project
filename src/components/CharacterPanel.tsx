import React from 'react';
import { Character } from '../types';
import { X } from 'lucide-react';

interface CharacterPanelProps {
  character: Character;
  onClose: () => void;
  allCharacters: Character[];
}

export const CharacterPanel: React.FC<CharacterPanelProps> = ({
  character,
  onClose,
  allCharacters,
}) => {
  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-gray-900/95 backdrop-blur-xl shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-xl" />
            <img
              src={character.avatar}
              alt={character.name}
              className="relative w-20 h-20 rounded-full object-cover border-2 border-purple-500"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">{character.name}</h2>
        <p className="text-gray-300 mb-6">{character.story}</p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-3">Timeline Events</h3>
            <div className="space-y-3">
              {character.timelinePoints.map((point, index) => (
                <div
                  key={`${point.year}-${index}`}
                  className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                >
                  <div className="text-sm text-purple-400">{point.year}</div>
                  <div className="text-white">{point.event}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-3">Connections</h3>
            <div className="space-y-3">
              {character.connections.map((connection) => {
                const connectedCharacter = allCharacters.find(
                  (c) => c.id === connection.characterId
                );
                if (!connectedCharacter) return null;

                return (
                  <div
                    key={`${character.id}-${connection.characterId}`}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={connectedCharacter.avatar}
                        alt={connectedCharacter.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-700"
                      />
                      <div>
                        <div className="text-white">{connectedCharacter.name}</div>
                        <div
                          className="text-sm"
                          style={{ color: connection.color }}
                        >
                          {connection.relationship}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full p-4 bg-purple-600 hover:bg-purple-700 transition-colors duration-200 text-white font-semibold flex items-center justify-center gap-2 group"
      >
        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        Close Character Panel
      </button>
    </div>
  );
};