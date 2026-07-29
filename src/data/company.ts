export const company = {
  name: 'Appmigo',
  tagline: 'Simple Mobile Experiences',
  description: 'Appmigo is a mobile game developer focused on creating engaging puzzle and brain-training games that millions of players love.',
  founded: 2024,
  stats: [
    { value: '10M+', label: 'Downloads' },
    { value: '50+', label: 'Team Members' },
    { value: '12', label: 'Games Published' },
    { value: '4.5', label: 'Avg. Rating' },
  ],
  values: [
    {
      title: 'Player-First',
      description: 'Every decision starts with what\'s best for our players.',
      icon: 'Heart',
    },
    {
      title: 'Data-Driven',
      description: 'We measure everything to make informed decisions.',
      icon: 'BarChart3',
    },
    {
      title: 'Innovation',
      description: 'We push boundaries to create unique gaming experiences.',
      icon: 'Lightbulb',
    },
    {
      title: 'Quality',
      description: 'We never compromise on the quality of our games.',
      icon: 'Star',
    },
  ],
  offices: [
    {
      city: 'Mumbai',
      address: '123 Gaming Street, Andheri West',
      country: 'India',
    },
  ],
  social: {
    linkedin: '#',
    facebook: '#',
    instagram: '#',
    twitter: '#',
  },
} as const

export type Company = typeof company
