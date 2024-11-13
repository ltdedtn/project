export interface TimelinePoint {
  year: number;
  event: string;
}

export interface Connection {
  characterId: string;
  relationship: string;
  color: string;
}

export interface Character {
  id: string;
  name: string;
  avatar: string;
  story: string;
  timelinePoints: TimelinePoint[];
  connections: Connection[];
}