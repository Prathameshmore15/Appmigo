'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { games } from '@/data/games'

const bugSchema = z.object({
  game: z.string().min(1, 'Select a game'),
  version: z.string().min(1, 'Enter the version'),
  type: z.string().min(1, 'Select bug type'),
  description: z.string().min(10, 'Describe the bug in detail'),
  steps: z.string().min(10, 'Describe steps to reproduce'),
  email: z.string().email('Enter a valid email'),
  device: z.string().min(1, 'Enter your device model'),
  os: z.string().min(1, 'Enter your OS version'),
})

type BugForm = z.infer<typeof bugSchema>

const bugTypes = [
  { value: 'crash', label: 'Crash / Freeze' },
  { value: 'visual', label: 'Visual / Graphics' },
  { value: 'gameplay', label: 'Gameplay' },
  { value: 'audio', label: 'Audio' },
  { value: 'other', label: 'Other' },
]

export default function BugReportPage() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BugForm>({
    resolver: zodResolver(bugSchema),
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
          <h1 className="font-heading text-2xl font-bold">Bug Report Submitted</h1>
          <p className="text-muted-foreground">
            Thank you for your report. We'll review it and follow up if needed.
          </p>
          <div className="inline-block rounded-lg bg-muted px-4 py-2 text-sm font-mono text-muted-foreground">
            Reference: BR-{Date.now().toString(36).toUpperCase()}
          </div>
          <div className="pt-4">
            <Button onClick={() => { setSubmitted(false); window.scrollTo(0, 0) }} className="cursor-pointer">
              Submit Another Report
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Submit a Bug Report</h1>
        <p className="mt-3 text-muted-foreground">Help us improve by reporting issues you encounter.</p>
      </motion.div>

      <Card className="mt-10">
        <CardContent className="p-8 sm:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 text-sm text-warning mb-2">
              Please do not submit bug reports for hacked/modded versions of our games.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Game *"
                placeholder="Select a game"
                options={games.map(g => ({ value: g.id, label: g.title }))}
                error={errors.game?.message}
                {...register('game')}
              />
              <Input
                label="Game Version *"
                placeholder="e.g. 3.2.1"
                error={errors.version?.message}
                {...register('version')}
              />
            </div>

            <Select
              label="Bug Type *"
              placeholder="Select type"
              options={bugTypes}
              error={errors.type?.message}
              {...register('type')}
            />

            <Textarea
              label="Description *"
              placeholder="Describe the bug in detail. What happened? What did you expect to happen?"
              rows={4}
              error={errors.description?.message}
              {...register('description')}
            />

            <Textarea
              label="Steps to Reproduce *"
              placeholder="1. Open the game\n2. Go to Settings\n3. Tap on 'Cloud Save'\n4. The app crashes"
              rows={3}
              error={errors.steps?.message}
              {...register('steps')}
            />

            <div className="rounded-lg border-2 border-dashed border-border p-6 text-center text-sm text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer">
              <p>Drag and drop screenshots or video here</p>
              <p className="text-xs mt-1">PNG, JPG, MP4 (max 10MB)</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email *"
                type="email"
                placeholder="your@email.com"
                error={errors.email?.message}
                {...register('email')}
              />
              <Input
                label="Device Model *"
                placeholder="e.g. Samsung Galaxy S24"
                error={errors.device?.message}
                {...register('device')}
              />
            </div>

            <Input
              label="OS Version *"
              placeholder="e.g. Android 14"
              error={errors.os?.message}
              {...register('os')}
            />

            <Button type="submit" size="lg" loading={isSubmitting} className="w-full cursor-pointer">
              {isSubmitting ? 'Submitting...' : 'Submit Bug Report'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
