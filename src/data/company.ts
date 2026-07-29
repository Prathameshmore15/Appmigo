export const company = {
  name: 'Appmigo',
  tagline: 'Simple Mobile Experiences',
  developer: 'Prathamesh More',
  description: 'Appmigo is an independent mobile game studio founded by Prathamesh More, creating brain-training and casual puzzle games for Android.',
  founded: 2024,
  stats: [
    { value: '10', label: 'Downloads' },
    { value: '1', label: 'Developer' },
    { value: '2', label: 'Games Published' },
    { value: '4.5', label: 'Avg. Rating' },
  ],
  values: [
    {
      title: 'Player-First',
      description: 'Every decision starts with what\'s best for our players.',
      icon: 'Heart',
    },
    {
      title: 'Quality',
      description: 'I never compromise on the quality of my games.',
      icon: 'Star',
    },
    {
      title: 'Innovation',
      description: 'I push boundaries to create unique gaming experiences.',
      icon: 'Lightbulb',
    },
    {
      title: 'Transparency',
      description: 'I believe in honest communication with my players.',
      icon: 'BarChart3',
    },
  ],
  offices: [
    {
      city: 'Mumbai',
      address: 'Mumbai, Maharashtra',
      country: 'India',
    },
  ],
  social: {
    linkedin: 'https://linkedin.com/in/prathamesh-more',
  },
} as const

export type Company = typeof company
