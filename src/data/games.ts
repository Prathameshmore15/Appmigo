export interface Game {
  id: string
  title: string
  description: string
  longDescription: string
  genre: string
  rating: number
  version: string
  releaseDate: string
  developer: string
  features: string[]
  imageUrl: string
  playStoreUrl: string
  packageName: string
}

export const games: Game[] = [
  {
    id: 'speed-memory',
    title: 'Speed Memory Challenge',
    description: 'Brain training game with 4 core cognitive modules for all skill levels.',
    longDescription: 'Challenge your memory and cognitive skills with Speed Memory Challenge. Features 4 core training modes: Speed Match, Matrix Memory, Sequence Recall, and Focus Tracking. Adaptive difficulty automatically scales to suit all age groups and skill levels. Fully playable offline with optional Google Play Games global leaderboard cloud syncing.',
    genre: 'Brain & Puzzle',
    rating: 4.5,
    version: '1.0.2',
    releaseDate: '2024',
    developer: 'Appmigo',
    features: ['4 Training Modes', 'Adaptive Difficulty', 'Offline Play', 'Cloud Sync', 'Leaderboards'],
    imageUrl: '/images/game-speed-memory.svg',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.appmigo.speedmemorygame',
    packageName: 'com.appmigo.speedmemorygame',
  },
  {
    id: 'tile-debt',
    title: 'Tile Debt',
    description: 'Strategic casual puzzle game where you clear tiles to pay off financial liabilities.',
    longDescription: 'Clear matching rows and tile sets to pay off financial liabilities before the board fills up in this strategic grid puzzle. Includes competitive timed modes and an Interest-Free Relaxed Mode for casual play. Features high-definition neon particle effects and low-latency Bluetooth audio integration. Automated local persistence with optional cloud sync for high scores and user stats.',
    genre: 'Casual Puzzle',
    rating: 4.5,
    version: '2.1.0',
    releaseDate: '2024',
    developer: 'Appmigo',
    features: ['Strategic Grid Gameplay', 'Multiple Game Modes', 'HD Visual Effects', 'Cloud Sync', 'Offline Play'],
    imageUrl: '/images/game-tile-debt.svg',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.appmigo.tiledebt',
    packageName: 'com.appmigo.tiledebt',
  },
]

export function getGameBySlug(slug: string): Game | undefined {
  return games.find(g => g.id === slug)
}
