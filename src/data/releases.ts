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
    version: '1.0.7',
    date: 'July 15, 2026',
    gameId: 'speed-memory',
    gameTitle: 'Speed Memory Challenge',
    changes: [
      { type: 'new', description: 'Daily challenge mode with bonus rewards' },
      { type: 'fixed', description: 'Fixed combo scoring on Reverse mode' },
      { type: 'improved', description: 'Reduced loading times by 40%' },
    ],
  },
  {
    id: 'r2',
    version: '1.0.6',
    date: 'July 10, 2026',
    gameId: 'speed-memory',
    gameTitle: 'Speed Memory Challenge',
    changes: [
      { type: 'new', description: 'Blitz 60-second speed run mode' },
      { type: 'new', description: '4 additional icon packs' },
      { type: 'fixed', description: 'Fixed haptic feedback on low-end devices' },
    ],
  },
  {
    id: 'r3',
    version: '1.0.5',
    date: 'July 5, 2026',
    gameId: 'speed-memory',
    gameTitle: 'Speed Memory Challenge',
    changes: [
      { type: 'fixed', description: 'Fixed theme auto-detect on Android 14' },
      { type: 'improved', description: 'Improved frame rate on mid-range devices' },
      { type: 'improved', description: 'Adjusted difficulty curve for Normal mode' },
    ],
  },
  {
    id: 'r4',
    version: '0.9.0-beta',
    date: 'June 28, 2026',
    gameId: 'tile-debt',
    gameTitle: 'Tile Debt',
    changes: [
      { type: 'new', description: 'Internal prototype: strategic grid clearing' },
      { type: 'new', description: 'Interest-Free Relaxed Mode for casual play' },
      { type: 'improved', description: 'Early neon particle pass' },
    ],
  },
]

export function getReleasesByGame(gameId: string): Release[] {
  return releases.filter(r => r.gameId === gameId)
}
