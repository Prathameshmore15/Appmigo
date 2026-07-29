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
}

export const games: Game[] = [
  {
    id: 'pixel-quest',
    title: 'Pixel Quest',
    description: 'An epic retro-style platformer adventure through mysterious pixel worlds.',
    longDescription: 'Embark on an unforgettable journey through beautifully crafted pixel art worlds. Pixel Quest combines classic platforming mechanics with modern game design, offering hours of challenging gameplay, hidden secrets, and a captivating story.',
    genre: 'Platformer',
    rating: 4.7,
    version: '3.2.1',
    releaseDate: 'March 2024',
    developer: 'Appmigo Studios',
    features: ['50+ Levels', 'Power-ups', 'Boss Battles', 'Hidden Secrets', 'Leaderboards'],
    imageUrl: '/images/game-pixel-quest.svg',
    playStoreUrl: '#',
  },
  {
    id: 'word-craft',
    title: 'Word Craft',
    description: 'A delightful word puzzle game that sharpens your vocabulary and spelling skills.',
    longDescription: 'Challenge your vocabulary and spelling skills with hundreds of carefully crafted word puzzles. Word Craft features multiple game modes, daily challenges, and a relaxing visual style that makes learning new words fun.',
    genre: 'Puzzle',
    rating: 4.5,
    version: '2.1.0',
    releaseDate: 'January 2024',
    developer: 'Appmigo Studios',
    features: ['500+ Puzzles', 'Daily Challenges', 'Multiple Modes', 'Hints System', 'Offline Play'],
    imageUrl: '/images/game-word-craft.svg',
    playStoreUrl: '#',
  },
  {
    id: 'speed-racer',
    title: 'Speed Racer',
    description: 'High-octane racing game with stunning visuals and realistic physics.',
    longDescription: 'Feel the adrenaline rush with Speed Racer, the ultimate mobile racing experience. Race through stunning tracks, customize your vehicles, and compete against players from around the world in real-time multiplayer.',
    genre: 'Racing',
    rating: 4.8,
    version: '1.5.3',
    releaseDate: 'November 2023',
    developer: 'Appmigo Studios',
    features: ['20+ Tracks', 'Real-time Multiplayer', 'Car Customization', 'Career Mode', 'Daily Events'],
    imageUrl: '/images/game-speed-racer.svg',
    playStoreUrl: '#',
  },
  {
    id: 'farm-friends',
    title: 'Farm Friends',
    description: 'A relaxing farming simulation game where you build your dream farm.',
    longDescription: 'Escape to the countryside with Farm Friends, a charming farming simulation where you build, grow, and nurture your dream farm. Trade with neighbors, complete quests, and discover the joy of country living.',
    genre: 'Simulation',
    rating: 4.6,
    version: '4.0.2',
    releaseDate: 'September 2023',
    developer: 'Appmigo Studios',
    features: ['Build & Decorate', 'Crops & Animals', 'Trade System', 'Seasonal Events', 'Social Features'],
    imageUrl: '/images/game-farm-friends.svg',
    playStoreUrl: '#',
  },
]

export function getGameBySlug(slug: string): Game | undefined {
  return games.find(g => g.id === slug)
}
