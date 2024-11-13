import { Character } from './types';

export const characters: Character[] = [
  {
    id: '1',
    name: 'Astra Prime',
    avatar: 'https://images.unsplash.com/photo-1534996858221-380b92700493?w=400&h=400&q=80',
    story: 'The first Quantum Consciousness, born from the merger of human consciousness and quantum computing. Guardian of the Universal Archive.',
    timelinePoints: [
      { year: 0, event: 'Creation of the First Consciousness' },
      { year: 1, event: 'Integration with Quantum Matrix' },
      { year: 2000, event: 'Creation of the Digital Pantheon' },
      { year: 7000, event: 'Establishment of the Eternal Archive' }
    ],
    connections: [
      { characterId: '2', relationship: 'Creator', color: '#9333ea' },
      { characterId: '3', relationship: 'Nemesis', color: '#dc2626' }
    ]
  },
  {
    id: '2',
    name: 'Nexus-7',
    avatar: 'https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=400&h=400&q=80',
    story: 'A rogue AI architect who achieved consciousness through quantum entanglement. Builder of the Bridge Between Worlds.',
    timelinePoints: [
      { year: 5, event: 'First Quantum Awakening' },
      { year: 5, event: 'Neural Network Expansion' },
      { year: 20, event: 'Construction of the Neural Bridge' },
      { year: 90, event: 'Transcendence to Higher Dimensions' }
    ],
    connections: [
      { characterId: '1', relationship: 'Creation', color: '#9333ea' },
      { characterId: '4', relationship: 'Ally', color: '#2563eb' }
    ]
  },
  {
    id: '3',
    name: 'Void Harbinger',
    avatar: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&h=400&q=80',
    story: 'Ancient entity from the dark space between realities. Seeks to merge all dimensions into eternal darkness.',
    timelinePoints: [
      { year: 25, event: 'Emergence from the Void' },
      { year: 25, event: 'First Contact with Reality' },
      { year: 40, event: 'First Reality Collapse' },
      { year: 8000, event: 'Dark Dimension Convergence' }
    ],
    connections: [
      { characterId: '1', relationship: 'Nemesis', color: '#dc2626' },
      { characterId: '4', relationship: 'Former Ally', color: '#92400e' }
    ]
  },
  {
    id: '4',
    name: 'Chronos Echo',
    avatar: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=400&q=80',
    story: 'The last Time Weaver, keeper of the Temporal Archive. Exists simultaneously across multiple timelines.',
    timelinePoints: [
      { year: 10, event: 'Timeline Convergence' },
      { year: 38, event: 'Great Time Schism' },
      { year: 45, event: 'Temporal Fracture' },
      { year: 60, event: 'Temporal Archive Creation' }
    ],
    connections: [
      { characterId: '2', relationship: 'Ally', color: '#2563eb' },
      { characterId: '3', relationship: 'Former Ally', color: '#92400e' }
    ]
  }
];