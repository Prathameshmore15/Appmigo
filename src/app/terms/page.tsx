import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Appmigo Terms & Conditions — rules and guidelines for using our games and services.',
}

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms', content:
    'By downloading, accessing, or using any Appmigo game or service, you agree to be bound by these Terms & Conditions. If you do not agree, do not use our services. We reserve the right to update these terms at any time.' },
  { id: 'license', title: 'License', content:
    'Appmigo grants you a limited, non-exclusive, non-transferable, revocable license to use our games for personal, non-commercial entertainment purposes. This license does not permit:\n\n• Copying, modifying, or distributing game content\n• Reverse engineering or decompiling\n• Using cheats, automation, or unauthorized third-party software\n• Commercial exploitation of game content' },
  { id: 'user-conduct', title: 'User Conduct', content:
    'You agree to use our games and services responsibly:\n\n• Do not harass, threaten, or abuse other players\n• Do not use offensive language or content\n• Do not exploit bugs or glitches\n• Do not engage in fraudulent transactions\n• Do not impersonate Appmigo staff\n\nViolation may result in account suspension or permanent ban.' },
  { id: 'purchases', title: 'In-App Purchases', content:
    'All in-app purchases are processed through Google Play Store. Purchases are final and non-refundable except as required by applicable law or Google Play policy. Digital goods have no real-world value and cannot be transferred or exchanged outside the game.' },
  { id: 'termination', title: 'Termination', content:
    'We reserve the right to terminate or suspend access to our services at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other players, us, or third parties. You may stop using our services at any time.' },
  { id: 'disclaimer', title: 'Disclaimer of Warranties', content:
    'Our games and services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, error-free, or free of harmful components. To the fullest extent permitted by law, Appmigo disclaims all warranties.' },
  { id: 'limitation', title: 'Limitation of Liability', content:
    'Appmigo shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our games or services. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.' },
  { id: 'governing-law', title: 'Governing Law', content:
    'These terms shall be governed by and construed in accordance with the laws. Any disputes shall be resolved through amicable negotiation first. If no resolution is reached, disputes will be settled in the courts.' },
  { id: 'contact', title: 'Contact', content:
    'For questions about these terms, please contact us at:\n\n• Email: support@appmigo.com\n• Contact Form: /contact' },
]

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Terms & Conditions</h1>
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
