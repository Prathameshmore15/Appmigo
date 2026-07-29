'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { games } from '@/data/games'

const deletionSchema = z.object({
  email: z.string().email('Enter a valid email'),
  game: z.string().min(1, 'Select a game'),
  reason: z.string().optional(),
  confirm: z.literal(true, { errorMap: () => ({ message: 'You must confirm this action' }) }),
})

type DeletionForm = z.infer<typeof deletionSchema>

const reasons = [
  { value: 'unused', label: 'No longer using the account' },
  { value: 'privacy', label: 'Privacy concerns' },
  { value: 'multiple', label: 'Have multiple accounts' },
  { value: 'other', label: 'Other' },
]

export default function AccountDeletionPage() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DeletionForm>({
    resolver: zodResolver(deletionSchema),
  })

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 1500))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 text-accent">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h1 className="font-heading text-2xl font-bold">Deletion Request Submitted</h1>
          <p className="text-muted-foreground">
            We'll process your request within 30 days as required by GDPR. You'll receive a confirmation email.
          </p>
          <div className="inline-block rounded-lg bg-muted px-4 py-2 text-sm font-mono text-muted-foreground">
            Reference: DEL-{Date.now().toString(36).toUpperCase()}
          </div>
          <p className="text-xs text-muted-foreground">
            You can also request deletion by emailing privacy@appmigo.com
          </p>
          <div className="pt-4">
            <Button onClick={() => window.location.href = '/'} className="cursor-pointer">Return Home</Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Account Deletion</h1>
        <p className="mt-3 text-muted-foreground">Request complete deletion of your account and associated data.</p>
      </motion.div>

      <div className="mt-8 p-4 rounded-lg border border-destructive/20 bg-destructive/5 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div className="text-sm text-destructive">
          <p className="font-medium">This action is permanent and cannot be undone.</p>
          <p className="mt-1 opacity-80">All game progress, purchases, and data will be permanently deleted. No refunds will be issued for in-app purchases.</p>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg border border-info/20 bg-info/5 flex items-start gap-3">
        <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium">What to expect:</p>
          <ul className="mt-1 space-y-0.5 list-disc list-inside opacity-80">
            <li>Your data will be deleted within 30 days (GDPR requirement)</li>
            <li>You will receive a confirmation email</li>
            <li>Some anonymized analytics data may be retained</li>
            <li>You can also email privacy@appmigo.com to request deletion</li>
          </ul>
        </div>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address *"
              type="email"
              placeholder="The email associated with your account"
              error={errors.email?.message}
              {...register('email')}
            />

            <Select
              label="Game *"
              placeholder="Select a game"
              options={games.map(g => ({ value: g.id, label: g.title }))}
              error={errors.game?.message}
              {...register('game')}
            />

            <Select
              label="Reason (optional)"
              placeholder="Why are you deleting?"
              options={reasons}
              {...register('reason')}
            />

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                {...register('confirm')}
              />
              <span className="text-sm text-muted-foreground">
                I understand that this action is permanent and will delete all my data, game progress, and purchases.
              </span>
            </label>
            {errors.confirm && (
              <p className="text-sm text-destructive">{errors.confirm.message}</p>
            )}

            <Button type="submit" variant="destructive" size="lg" loading={isSubmitting} className="w-full cursor-pointer">
              {isSubmitting ? 'Processing...' : 'Request Account Deletion'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
