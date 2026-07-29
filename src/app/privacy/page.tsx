import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Appmigo Privacy Policy — how we collect, use, and protect your data.',
}

const sections = [
  { id: 'information-we-collect', title: 'Information We Collect', content:
    'We collect information necessary to provide and improve our games and services:\n\n• Account Information: When you contact support or submit a bug report, we collect your email address and the details you provide.\n• Game Data: Game progress, settings, and achievements are stored locally or in the cloud to enable cross-device play.\n• Device Information: Device type, operating system version, and anonymous usage statistics to optimize performance.\n• Analytics: Aggregated, anonymized data about game usage to improve gameplay experience.\n\nWe do not collect sensitive personal information unless voluntarily provided.' },
  { id: 'how-we-use', title: 'How We Use Your Information', content:
    'Your information is used solely for:\n\n• Providing and maintaining game services\n• Responding to support requests\n• Improving game performance and user experience\n• Complying with legal obligations\n\nWe never sell your personal information to third parties.' },
  { id: 'third-party-services', title: 'Third-Party Services', content:
    'Our games integrate with the following third-party services for analytics and advertising:\n\n• Google AdMob — Advertising\n• Unity Ads — Advertising\n• ironSource — Advertising\n• AppLovin MAX — Advertising\n\nEach service has its own privacy policy governing data collection. We encourage you to review them.\n\nFor advertising compliance, we maintain an app-ads.txt file accessible at /app-ads.txt.' },
  { id: 'data-retention', title: 'Data Retention & Deletion', content:
    'We retain your personal data only as long as necessary:\n\n• Support correspondence: 12 months after resolution\n• Account data: Until you request deletion\n• Analytics data: Anonymized and retained indefinitely\n\nYou can request complete data deletion at any time via our Account Deletion page. We will process your request within 30 days as required by GDPR.' },
  { id: 'your-rights', title: 'Your Rights (GDPR/CCPA)', content:
    'Depending on your jurisdiction, you may have the following rights:\n\n• Right to Access — Request a copy of your data\n• Right to Rectification — Correct inaccurate data\n• Right to Erasure — Request data deletion ("Right to be Forgotten")\n• Right to Portability — Receive your data in a machine-readable format\n• Right to Object — Object to processing for specific purposes\n\nTo exercise any of these rights, contact us at privacy@appmigo.com.' },
  { id: 'children-privacy', title: "Children's Privacy (COPPA)", content:
    'Our games are designed for general audiences. We do not knowingly collect personal information from children under 13 (or under 16 in the EU). If you believe a child has provided us with personal data, please contact us immediately so we can delete it.' },
  { id: 'contact', title: 'Contact Us', content:
    'If you have questions about this Privacy Policy, please contact us:\n\n• Email: privacy@appmigo.com\n• Contact Form: /contact\n• Account Deletion: /account-deletion' },
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: July 15, 2026</p>

      <nav className="mt-10 mb-14 p-5 rounded-xl border bg-card">
        <h2 className="font-heading font-semibold text-sm mb-3">Contents</h2>
        <ul className="space-y-1">
          {sections.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-sm text-primary hover:underline">{s.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-12">
        {sections.map(s => (
          <section key={s.id} id={s.id}>
            <h2 className="font-heading text-xl font-semibold mb-4">{s.title}</h2>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{s.content}</div>
          </section>
        ))}
      </div>
    </div>
  )
}
