'use client'

import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Upload, X, FileImage } from 'lucide-react'
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
  const uid = useId().replace(/[^A-Za-z0-9]/g, '').slice(0, 6).toUpperCase()
  const [attachments, setAttachments] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BugForm>({
    resolver: zodResolver(bugSchema),
  })

  const MAX_FILE_SIZE = 10 * 1024 * 1024
  const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'video/mp4']

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const incoming = Array.from(fileList)
    const valid: File[] = []
    for (const file of incoming) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setFileError(`${file.name}: only PNG, JPG, MP4 allowed.`)
        continue
      }
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`${file.name}: exceeds 10MB limit.`)
        continue
      }
      valid.push(file)
    }
    if (valid.length > 0) {
      setFileError(null)
      setAttachments(prev => [...prev, ...valid].slice(0, 5))
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 1500))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
            <CheckCircle className="h-8 w-8" />
          </div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Received</p>
          <h1 className="font-heading text-2xl font-bold">Bug report submitted</h1>
          <p className="text-muted-foreground">
            Thank you for your report. We&apos;ll review it and follow up if needed.
          </p>
          <div className="inline-block rounded-lg border bg-muted px-4 py-2 text-sm font-mono text-muted-foreground">
            Reference: BR-{uid}
          </div>
          <div className="pt-4">
            <Button onClick={() => { setAttachments([]); setFileError(null); setSubmitted(false); window.scrollTo(0, 0) }} className="cursor-pointer">
              Submit Another Report
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Support</p>
        <h1 className="mt-2 font-heading text-4xl sm:text-5xl font-bold tracking-tight">Submit a bug report</h1>
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

            <div>
              <label htmlFor="bug-attachments" className="text-sm font-medium text-foreground">
                Screenshots / Video (optional)
              </label>
              <label
                htmlFor="bug-attachments"
                className="mt-1.5 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 text-center text-sm text-muted-foreground hover:border-primary/50 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring transition-colors cursor-pointer"
              >
                <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
                <span>Drag and drop screenshots or video here, or <span className="text-primary font-medium underline underline-offset-2">browse files</span></span>
                <span className="text-xs mt-1">PNG, JPG, MP4 (max 10MB each, up to 5 files)</span>
              </label>
              <input
                id="bug-attachments"
                type="file"
                multiple
                accept="image/png,image/jpeg,video/mp4,.png,.jpg,.jpeg,.mp4"
                onChange={(e) => handleFiles(e.target.files)}
                className="sr-only"
              />
              {fileError && (
                <p className="mt-2 text-sm text-destructive" role="alert">{fileError}</p>
              )}
              {attachments.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {attachments.map((file, i) => (
                    <li key={`${file.name}-${i}`} className="flex items-center gap-3 rounded-lg border bg-muted/50 px-3 py-2 text-sm">
                      <FileImage className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="flex-1 min-w-0 truncate">{file.name}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(i)}
                        aria-label={`Remove ${file.name}`}
                        className="rounded p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
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
