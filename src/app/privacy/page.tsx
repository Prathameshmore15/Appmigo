import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Appmigo Privacy Policy — how we collect, use, and protect your data.',
}

const sections = [
  { id: 'introduction', title: '1. Introduction', content:
    'Application Name: Speed Memory Challenge\n\nPackage Name: com.appmigo.speedmemorychallenge\n\nAvailable On: Google Play Store\n\nDeveloper: Appmigo\n\nThis privacy policy applies to the Speed Memory Challenge app ("Application") for mobile devices that was created by Appmigo as an Ad Supported service. This service is intended for use "AS IS".\n\nWe are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.' },
  { id: 'information-collection', title: '2. Information Collection and Use', content:
    'The Application collects information when you download and use it. This information may include:\n\n• Your device\'s Internet Protocol address (e.g., IP address)\n• The pages of the Application that you visit\n• The time and date of your visit, the time spent on those pages\n• The time spent on the Application\n• The operating system you use on your mobile device\n• Game scores, progress, levels completed, and achievements\n\nPersonal Information: We do not collect personally identifiable information such as your name, email address, or phone number unless you voluntarily contact us.\n\nLocation Data: The Application does not gather precise information about the location of your mobile device.\n\nAI Technologies: The Application does not use Artificial Intelligence (AI) technologies to process your data or provide features.\n\nDevice Permissions: The Application requests the following permissions:\n\n• Internet Access: Required for advertisements and game functionality\n• Vibration: For haptic feedback during gameplay' },
  { id: 'advertising', title: '3. Advertising', content:
    'Our app uses Google AdMob to display advertisements. The following ad formats are used in the Application:\n\n• Banner advertisements - Always visible during gameplay\n• Interstitial advertisements - Shown periodically between games\n• Rewarded video advertisements - User-initiated for bonuses (Continue Game, 2x Coins, Free Coins, Lucky Spin, Extra Life)\n• Rewarded interstitial advertisements - User-initiated for bonuses (Level Up Bonus, Mystery Box, Streak Reward, Power-Ups)\n• App open advertisements - Shown when launching the application\n\nAdMob may collect and use data including:\n\n• Device identifiers (such as advertising ID)\n• IP address\n• App usage data\n• General location data (country/region level only)\n• Device information (model, OS version)\n\nOpting Out of Personalized Ads:\n\nYou can opt out of personalized advertising by:\n\n• Visiting Google Ads Settings: https://adssettings.google.com\n• Resetting your advertising ID in your device settings\n• Enabling "Opt out of Ads Personalization" on your Android device\n\nFor more information about how Google uses your data, please visit: https://policies.google.com/privacy\n\nFor AdMob privacy practices, visit: https://support.google.com/admob/answer/6128543' },
  { id: 'third-party-access', title: '4. Third Party Access', content:
    'Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.\n\nThe Application utilizes third-party services that have their own Privacy Policy about handling data:\n\n• Google Play Services\n• AdMob\n\nThe Service Provider may disclose User Provided and Automatically Collected Information:\n\n• As required by law, such as to comply with a subpoena or similar legal process\n• When they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request\n• With their trusted service providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement' },
  { id: 'data-storage', title: '5. Data Storage', content:
    'All game data (scores, progress, settings) is stored locally on your device. We do not store any data on our servers. You can clear this data by uninstalling the Application or clearing app data from your device settings.' },
  { id: 'your-rights', title: '6. Your Data Rights (GDPR/CCPA)', content:
    'Depending on your jurisdiction, you may have certain rights regarding your personal data:\n\n• Right to Access: You can request information about what data we hold about you\n• Right to Rectification: You can request correction of inaccurate or incomplete data\n• Right to Erasure: You can request deletion of your personal data\n• Right to Restrict Processing: You can request limitation of how we use your data\n• Right to Data Portability: You can request transfer of your data to another service\n• Right to Object: You can object to certain types of data processing\n\nCalifornia Residents (CCPA): Under the California Consumer Privacy Act, you have the right to know, delete, and opt-out of the sale of personal information. We do not sell personal information.\n\nTo exercise any of these rights, please contact us at support.appmigo@gmail.com. We will respond to your request within 30 days.' },
  { id: 'opt-out', title: '7. Opt-Out Rights', content:
    'You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.' },
  { id: 'data-retention', title: '8. Data Retention Policy', content:
    'The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you\'d like them to delete User Provided Data that you have provided via the Application, please contact them at support.appmigo@gmail.com and they will respond in a reasonable time.' },
  { id: 'children-privacy', title: "9. Children's Privacy", content:
    'The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.\n\nThe Application does not address anyone under the age of 13. The Service Provider does not knowingly collect personally identifiable information from children under 13 years of age. In the case the Service Provider discover that a child under 13 has provided personal information, the Service Provider will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact the Service Provider at support.appmigo@gmail.com so that they will be able to take the necessary actions.' },
  { id: 'security', title: '10. Security', content:
    'The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.' },
  { id: 'changes', title: '11. Changes to This Policy', content:
    'This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.\n\nThis privacy policy is effective as of April 12, 2026.' },
  { id: 'consent', title: '12. Your Consent', content:
    'By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.' },
  { id: 'contact', title: '13. Contact Us', content:
    'If you have any questions regarding privacy while using the Application, or have questions about our practices, please contact the Service Provider via email at:\n\n• Email: support.appmigo@gmail.com\n• Contact Form: /contact\n• Account Deletion: /account-deletion' },
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: April 12, 2026</p>

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
