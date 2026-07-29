export interface Release {
  id: string
  version: string
  date: string
  gameId: string
  gameTitle: string
  changes: {
    type: 'new' | 'fixed' | 'improved'
    description: string
  }[]
}

export const releases: Release[] = [
  {
    id: 'r1',
    version: '3.2.1',
    date: 'July 15, 2026',
    gameId: 'pixel-quest',
    gameTitle: 'Pixel Quest',
    changes: [
      { type: 'new', description: '5 new challenging levels in World 3' },
      { type: 'fixed', description: 'Fixed crash on level 27 boss encounter' },
      { type: 'improved', description: 'Reduced loading times by 40%' },
    ],
  },
  {
    id: 'r2',
    version: '2.1.0',
    date: 'July 10, 2026',
    gameId: 'word-craft',
    gameTitle: 'Word Craft',
    changes: [
      { type: 'new', description: 'New "Time Attack" game mode' },
      { type: 'new', description: '50 additional word puzzles' },
      { type: 'fixed', description: 'Fixed dictionary lookup for rare words' },
    ],
  },
  {
    id: 'r3',
    version: '1.5.3',
    date: 'July 5, 2026',
    gameId: 'speed-racer',
    gameTitle: 'Speed Racer',
    changes: [
      { type: 'fixed', description: 'Fixed multiplayer desync issue' },
      { type: 'improved', description: 'Improved frame rate on mid-range devices' },
      { type: 'improved', description: 'Adjusted vehicle physics for better handling' },
    ],
  },
  {
    id: 'r4',
    version: '4.0.2',
    date: 'June 28, 2026',
    gameId: 'farm-friends',
    gameTitle: 'Farm Friends',
    changes: [
      { type: 'new', description: 'Summer Festival seasonal event' },
      { type: 'new', description: '5 new decorative items' },
      { type: 'fixed', description: 'Fixed trade notification bug' },
      { type: 'improved', description: 'Optimized battery usage during farming' },
    ],
  },
  {
    id: 'r5',
    version: '3.2.0',
    date: 'June 20, 2026',
    gameId: 'pixel-quest',
    gameTitle: 'Pixel Quest',
    changes: [
      { type: 'new', description: 'New power-up: Time Slow' },
      { type: 'improved', description: 'Enhanced controller support' },
      { type: 'fixed', description: 'Fixed audio sync issues on some devices' },
    ],
  },
]

export function getReleasesByGame(gameId: string): Release[] {
  return releases.filter(r => r.gameId === gameId)
}
