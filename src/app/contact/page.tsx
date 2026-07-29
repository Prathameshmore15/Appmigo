'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Mail, Clock, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

const contactSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  subject: z.string().min(1, 'Select a subject'),
  message: z.string().min(10, 'Enter your message'),
})

type ContactForm = z.infer<typeof contactSchema>

const subjects = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'press', label: 'Press / Media' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 text-accent">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h1 className="font-heading text-2xl font-bold">Message Sent!</h1>
          <p className="text-muted-foreground">We'll get back to you within 24 hours. Check your email for a confirmation.</p>
          <div className="pt-4">
            <Button onClick={() => window.location.href = '/'} className="cursor-pointer">Return Home</Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-3 text-muted-foreground">We'd love to hear from you. Get in touch with our team.</p>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-8 sm:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input label="Name *" placeholder="Your name" error={errors.name?.message} {...register('name')} />
                <Input label="Email *" type="email" placeholder="your@email.com" error={errors.email?.message} {...register('email')} />
                <Select label="Subject *" placeholder="Select a subject" options={subjects} error={errors.subject?.message} {...register('subject')} />
                <Textarea label="Message *" placeholder="How can we help you?" rows={5} error={errors.message?.message} {...register('message')} />
                <Button type="submit" size="lg" loading={isSubmitting} className="w-full cursor-pointer">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-heading font-semibold">Contact Information</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">support@appmigo.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">AI Chat</p>
                    <p className="text-muted-foreground">24/7 instant answers</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold mb-2">Before You Contact</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">• Check our <a href="/faq" className="text-primary hover:underline">FAQ</a> for quick answers</li>
                <li className="flex items-start gap-2">• Try our <a href="/support/ai" className="text-primary hover:underline">AI Chat</a> for instant help</li>
                <li className="flex items-start gap-2">• For bugs, use the <a href="/support/bug-report" className="text-primary hover:underline">Bug Report</a> form</li>
                <li className="flex items-start gap-2">• For account deletion, use the <a href="/account-deletion" className="text-primary hover:underline">Account Deletion</a> page</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
