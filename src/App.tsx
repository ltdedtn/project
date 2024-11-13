import React, { useState } from 'react';
import { Timeline } from './components/Timeline';
import { CharacterPanel } from './components/CharacterPanel';
import { characters } from './data';
import { Character } from './types';

export const App: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
      </div>

      <main className="relative w-full h-full">
        <Timeline
          characters={characters}
          onSelectCharacter={setSelectedCharacter}
          selectedCharacter={selectedCharacter}
        />
        
        {selectedCharacter && (
          <CharacterPanel
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
            allCharacters={characters}
          />
        )}
      </main>
    </div>
  );
};