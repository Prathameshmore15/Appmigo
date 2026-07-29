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
  status?: 'published' | 'upcoming'
}

export const games: Game[] = [
  {
    id: 'speed-memory',
    title: 'Speed Memory Challenge',
    description: 'Test your memory, sharpen your focus, and challenge your brain with the most addictive memory game on Android!',
    longDescription: '🏆 Speed Memory Challenge - The Ultimate Brain Training Game!\n\nTest your memory, sharpen your focus, and challenge your brain with the most addictive memory game on Android! Perfect brain training for all ages - kids, adults, and seniors looking to improve cognitive skills.\n\n🎮 HOW TO PLAY\nWatch the sequence of icons flash on the grid. When the pattern stops, tap the icons in the exact same order. The faster you tap, the higher your combo score! Simple to learn, challenging to master.\n\n⚡ 5 EXCITING GAME MODES\n• Classic: The original memory challenge - test your pattern memory\n• Chaos: Random patterns that keep you guessing\n• Reverse: Tap the sequence backwards! Ultimate brain test\n• Daily: New challenge every day with bonus rewards\n• Blitz: 60-second speed run for high scores\n\n🎯 DIFFICULTY LEVELS\n• Easy: Perfect for beginners starting their brain training journey\n• Normal: Standard challenge for regular memory practice\n• Hard: For memory masters who love a real brain challenge\n\n🎁 EARN REWARDS\n• Collect coins by playing and winning\n• Unlock 12+ unique icon packs (animals, space, food & more!)\n• Daily login bonuses for consistent brain training\n• Free power-ups: hints, time boosts, freeze time & more\n• Achievement system with 28+ trophies to unlock\n\n🧠 BRAIN TRAINING BENEFITS\n• Improve short-term memory and recall\n• Enhance concentration & focus skills\n• Boost cognitive speed and reaction time\n• Perfect mental workout for all ages\n\n✨ WHY THIS MEMORY GAME IS SPECIAL\n• Beautiful dark & light themes (auto-detects system theme)\n• Haptic feedback for immersive brain training\n• Sound effects & music (optional)\n• Offline play - no internet required\n• No forced ads - rewarded ads are optional for bonuses only',
    genre: 'Puzzle',
    rating: 4.5,
    version: '1.0.7',
    releaseDate: '2024',
    developer: 'Appmigo',
    features: ['5 Game Modes', '3 Difficulty Levels', '12+ Icon Packs', '28+ Achievements', 'Offline Play', 'Dark/Light Theme'],
    imageUrl: '/images/game-speed-memory.svg',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.appmigo.speedmemorychallenge',
    packageName: 'com.appmigo.speedmemorychallenge',
    status: 'published',
  },
  {
    id: 'tile-debt',
    title: 'Tile Debt',
    description: 'Strategic casual puzzle game where you clear tiles to pay off financial liabilities.',
    longDescription: 'Clear matching rows and tile sets to pay off financial liabilities before the board fills up in this strategic grid puzzle.\n\nFeatures:\n• Strategic Grid Gameplay: Clear matching rows and tile sets to pay off financial liabilities before the board fills up.\n• Game Modes: Includes competitive timed modes and an Interest-Free Relaxed Mode for casual play.\n• Visual & Audio Effects: High-definition neon particle effects and low-latency Bluetooth audio integration.\n• Cloud Sync: Automated local persistence with optional cloud sync for high scores and user stats.',
    genre: 'Casual Puzzle',
    rating: 0,
    version: '2.1.0',
    releaseDate: 'Coming Soon',
    developer: 'Appmigo',
    features: ['Strategic Grid Gameplay', 'Multiple Game Modes', 'HD Visual Effects', 'Cloud Sync', 'Offline Play'],
    imageUrl: '/images/game-tile-debt.svg',
    playStoreUrl: '#',
    packageName: 'com.appmigo.tiledebt',
    status: 'upcoming',
  },
]

export function getGameBySlug(slug: string): Game | undefined {
  return games.find(g => g.id === slug)
}
