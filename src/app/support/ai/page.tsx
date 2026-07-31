'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedText } from '@/components/ui/animated-text'
import { faqs, searchFAQs } from '@/data/faqs'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const suggestions = [
  'How do I reset my game progress?',
  'My game is crashing',
  'How do I delete my account?',
  'I didn\'t receive my purchase',
]

const keywordResponses: Record<string, string> = {
  hello: 'Hello! Welcome to Appmigo support. How can I help you today?',
  hi: 'Hi there! I\'m here to help with any questions about our games.',
  thanks: 'You\'re welcome! Let me know if you need anything else.',
  thank: 'Happy to help! Is there anything else you\'d like to know?',
  game: 'We currently have Speed Memory Challenge available, with Tile Debt coming soon. What would you like to know about our games?',
  download: 'You can download our games from Google Play Store. Search for "Appmigo" or visit the direct links on our Games page.',
  play: 'Our games are available on Android. Download them from Google Play Store to start playing!',
  contact: 'You can reach us through our contact form, email at support@appmigo.com, or use this AI chat for quick answers.',
  support: 'I can help with FAQs and general questions. For specific issues, you can also submit a bug report or contact our support team directly.',
  refund: 'To request a refund, visit play.google.com/store/account/orderhistory within 48 hours of purchase. For issues beyond this window, contact our support team.',
  crash: 'If your game is crashing, try: 1) Restart your device 2) Update to the latest version 3) Clear the game cache 4) Check device compatibility. If issues persist, submit a bug report.',
  bug: 'Found a bug? Please submit a bug report with details about the issue, your device model, and OS version. This helps us fix it faster!',
  account: 'For account-related questions: To delete your account, visit our Account Deletion page. We process requests within 30 days per GDPR.',
  progress: 'To reset game progress, go to Settings > Game > Reset Progress. Note that this is permanent and cannot be undone.',
  offline: 'Yes! Most Appmigo games support offline play for core features. Online features like leaderboards require internet.',
  update: 'To update games, enable auto-updates in Google Play settings, or manually check for updates in the Play Store.',
  data: 'We only collect essential data: game progress, device type, and anonymized analytics. No personal info unless you provide it voluntarily.',
}

function getAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  // Check keyword responses first
  for (const [keyword, response] of Object.entries(keywordResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response
    }
  }

  // Search FAQs
  const matchingFAQs = searchFAQs(userMessage)
  if (matchingFAQs.length > 0) {
    return matchingFAQs[0].answer
  }

  // Default response
  return 'I\'m not sure I understand that question. Could you rephrase it? For specific account or technical issues, please submit a bug report or contact our support team directly.'
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m the Appmigo AI assistant. I can help you with FAQs, troubleshooting, and general questions about our games. How can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    // Simulate faster response time (300ms instead of 1000ms)
    setTimeout(() => {
      const response = getAIResponse(userMsg)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setLoading(false)
    }, 300)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} className="flex flex-col items-center">
        <div className="text-center mb-10 w-full">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 text-primary backdrop-blur-sm mb-5">
            <Bot className="h-8 w-8" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
            <AnimatedText text="AI Assistant" variant="typewriter" />
          </h1>
          <p className="mt-3 text-muted-foreground">Get instant answers to your questions</p>
        </div>

        <div className="rounded-2xl border bg-card/95 backdrop-blur-sm shadow-xl overflow-hidden flex flex-col h-[600px] w-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-2.5 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === 'assistant' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {msg.role === 'assistant' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-muted' : 'bg-primary text-on-primary'}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl px-4 py-3 bg-muted">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-4 pb-4">
              <p className="text-xs text-muted-foreground mb-2 text-center">Try asking:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => { setInput(s); handleSend() }}
                    className="text-xs rounded-full border px-3 py-1.5 text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t p-4 bg-card/50">
            <form onSubmit={e => { e.preventDefault(); handleSend() }} className="flex items-center gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 h-11 rounded-xl border bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                disabled={loading}
              />
              <Button type="submit" size="icon" disabled={loading || !input.trim()} className="h-11 w-11 shrink-0 cursor-pointer rounded-xl">
                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </div>
        </div>

        <p className="mt-4 text-xs text-center text-muted-foreground pb-20 lg:pb-0">
          AI responses are generated by an automated system. For urgent issues, please contact our support team.
        </p>
      </motion.div>
    </div>
  )
}
