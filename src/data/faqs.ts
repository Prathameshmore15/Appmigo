export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  gameId?: string
}

export const faqCategories = ['General', 'Account', 'Technical', 'Gameplay', 'Billing'] as const

export const faqs: FAQ[] = [
  {
    id: 'reset-progress',
    question: 'How do I reset my game progress?',
    answer: 'To reset your game progress, go to Settings > Game > Reset Progress in the game. Please note that this action is permanent and cannot be undone. If you\'re experiencing issues, try reinstalling the game first.',
    category: 'Gameplay',
  },
  {
    id: 'contact-support',
    question: 'How do I contact support?',
    answer: 'You can reach our support team through multiple channels: use our AI chat for instant answers, submit a bug report for technical issues, or fill out our contact form for general inquiries. We typically respond within 24 hours.',
    category: 'General',
  },
  {
    id: 'delete-account',
    question: 'How do I delete my account?',
    answer: 'To delete your account, visit our Account Deletion page and submit a request. Your data will be permanently removed within 30 days as per GDPR requirements. Please note that game progress cannot be recovered after deletion.',
    category: 'Account',
  },
  {
    id: 'game-crash',
    question: 'My game keeps crashing. What should I do?',
    answer: 'Try these steps: 1) Restart your device 2) Update the game to the latest version 3) Clear the game cache in Settings > Apps 4) Ensure your device meets minimum requirements. If the issue persists, submit a bug report with your device model and OS version.',
    category: 'Technical',
  },
  {
    id: 'purchase-not-received',
    question: 'I made a purchase but didn\'t receive it.',
    answer: 'In-app purchases are processed through Google Play. First, wait 5-10 minutes as transactions can sometimes be delayed. Restart the game and check your inventory. If the item still hasn\'t arrived, use the "Restore Purchases" button in Settings. Contact Google Play support if the charge appears on your account.',
    category: 'Billing',
  },
  {
    id: 'data-collection',
    question: 'What data does Appmigo collect?',
    answer: 'We collect only essential data required for game functionality: game progress, device type, and anonymized usage analytics. We do not collect personal information unless you voluntarily provide it (e.g., support emails). See our Privacy Policy for full details.',
    category: 'Account',
  },
  {
    id: 'offline-play',
    question: 'Can I play Appmigo games offline?',
    answer: 'Most Appmigo games support offline play for core features. However, online features like leaderboards, multiplayer, and cloud saves require an internet connection. Progress made offline will sync when you reconnect.',
    category: 'Technical',
  },
  {
    id: 'update-game',
    question: 'How do I update Appmigo games?',
    answer: 'Updates are distributed through Google Play Store. Enable auto-updates in Google Play settings, or manually check for updates by searching for the game in the Play Store and tapping "Update" if available.',
    category: 'General',
  },
  {
    id: 'report-player',
    question: 'How do I report inappropriate player behavior?',
    answer: 'To report a player, use the in-game report feature found in player profiles or chat windows. You can also email us at support@appmigo.com with screenshots and details. We take all reports seriously and review them within 48 hours.',
    category: 'General',
  },
  {
    id: 'refund',
    question: 'How do I request a refund?',
    answer: 'All purchases are processed through Google Play. To request a refund, visit play.google.com/store/account/orderhistory within 48 hours of purchase. For issues beyond this window, contact our support team directly.',
    category: 'Billing',
  },
]

export function getFAQsByCategory(category: string): FAQ[] {
  if (!category || category === 'all') return faqs
  return faqs.filter(f => f.category.toLowerCase() === category.toLowerCase())
}

export function searchFAQs(query: string): FAQ[] {
  const q = query.toLowerCase()
  return faqs.filter(f =>
    f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
  )
}

export function getFAQsByGame(gameId: string): FAQ[] {
  return faqs.filter(f => f.gameId === gameId)
}
