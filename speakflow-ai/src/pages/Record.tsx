import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Webcam from 'react-webcam'
import { Mic, MicOff, Video, VideoOff, Square, Clock, Sparkles, ArrowLeft } from 'lucide-react'
import { PROMPTS, type Prompt } from '../lib/types'
import Card from '../components/ui/Card'

type RecordingState = 'setup' | 'countdown' | 'recording' | 'processing'

const durations = [
  { label: '1 min', seconds: 60 },
  { label: '3 min', seconds: 180 },
  { label: '5 min', seconds: 300 },
  { label: 'Custom', seconds: 0 },
]

export default function Record() {
  const navigate = useNavigate()
  const location = useLocation()
  const preselectedPrompt = (location.state as { prompt?: Prompt })?.prompt

  const [state, setState] = useState<RecordingState>('setup')
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(preselectedPrompt || null)
  const [duration, setDuration] = useState(60)
  const [customDuration, setCustomDuration] = useState('')
  const [cameraOn, setCameraOn] = useState(true)
  const [micOn, setMicOn] = useState(true)
  const [timeLeft, setTimeLeft] = useState(0)
  const [countdown, setCountdown] = useState(3)

  const webcamRef = useRef<Webcam>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  const effectiveDuration = duration === 0
    ? Math.min(Math.max(parseInt(customDuration) || 0, 10), 600)
    : duration

  const startCountdown = useCallback(() => {
    if (!selectedPrompt) return
    setState('countdown')
    setCountdown(3)
  }, [selectedPrompt])

  useEffect(() => {
    if (state !== 'countdown') return
    if (countdown <= 0) {
      setState('recording')
      setTimeLeft(effectiveDuration)
      return
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, state, effectiveDuration])

  useEffect(() => {
    if (state !== 'recording') return
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setState('processing')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [state])

  useEffect(() => {
    if (state === 'processing') {
      const t = setTimeout(() => {
        navigate('/results', { state: { duration: effectiveDuration - timeLeft || effectiveDuration } })
      }, 2500)
      return () => clearTimeout(t)
    }
  }, [state, effectiveDuration, timeLeft, navigate])

  const stopRecording = () => {
    clearInterval(timerRef.current)
    setState('processing')
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center gap-4">
        <button onClick={() => state === 'setup' ? navigate('/dashboard') : setState('setup')}
          className="w-10 h-10 rounded-xl bg-bg-card border border-border flex items-center justify-center hover:border-border-light transition-colors">
          <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-text-primary">
            {state === 'setup' ? 'New Practice Session' : state === 'recording' ? 'Recording...' : 'Preparing...'}
          </h1>
          <p className="text-sm text-text-secondary">{state === 'setup' ? 'Configure your session' : selectedPrompt?.title}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {state === 'setup' && (
          <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <Card className="p-0 overflow-hidden">
                <div className="relative aspect-video bg-bg-primary">
                  {cameraOn ? (
                    <Webcam ref={webcamRef} audio={micOn} mirrored className="w-full h-full object-cover" videoConstraints={{ facingMode: 'user', width: 1280, height: 720 }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center"><VideoOff className="w-12 h-12 text-text-muted mx-auto mb-3" /><p className="text-text-secondary">Camera is off</p></div>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                    <button onClick={() => setCameraOn(!cameraOn)} className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${cameraOn ? 'bg-white/20 hover:bg-white/30' : 'bg-error/80 hover:bg-error'}`}>
                      {cameraOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
                    </button>
                    <button onClick={() => setMicOn(!micOn)} className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-white/20 hover:bg-white/30' : 'bg-error/80 hover:bg-error'}`}>
                      {micOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
                    </button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <Card>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Choose a Prompt</h3>
                <div className="space-y-2">
                  {PROMPTS.map((prompt) => (
                    <button key={prompt.id} onClick={() => setSelectedPrompt(prompt)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${selectedPrompt?.id === prompt.id ? 'border-accent/50 bg-accent-glow' : 'border-transparent bg-bg-primary/50 hover:bg-bg-card-hover'}`}>
                      <div className="w-8 h-8 rounded-lg bg-accent-glow flex items-center justify-center flex-shrink-0"><Mic className="w-4 h-4 text-accent" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-text-primary">{prompt.title}</div>
                        <div className="text-xs text-text-muted truncate">{prompt.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Duration</h3>
                <div className="grid grid-cols-4 gap-2">
                  {durations.map((d) => (
                    <button key={d.label} onClick={() => setDuration(d.seconds)}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-all ${duration === d.seconds ? 'bg-accent text-white' : 'bg-bg-primary/50 text-text-secondary hover:bg-bg-card-hover border border-border'}`}>
                      {d.label}
                    </button>
                  ))}
                </div>
                {duration === 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <input type="number" min={10} max={600} value={customDuration} onChange={(e) => setCustomDuration(e.target.value)}
                      className="w-24 bg-bg-primary/50 border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent/50" placeholder="Seconds" />
                    <span className="text-sm text-text-muted">sec (10-600)</span>
                  </div>
                )}
              </Card>

              <button onClick={startCountdown} disabled={!selectedPrompt || (duration === 0 && (!customDuration || parseInt(customDuration) < 10))}
                className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold py-4 rounded-xl transition-all duration-300 glow-accent disabled:opacity-40 disabled:cursor-not-allowed">
                <Mic className="w-5 h-5" /> Start Recording
              </button>
            </div>
          </motion.div>
        )}

        {state === 'countdown' && (
          <motion.div key="countdown" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative aspect-video w-full max-w-3xl rounded-2xl overflow-hidden mb-8">
              <Webcam ref={webcamRef} audio={micOn} mirrored className="w-full h-full object-cover" videoConstraints={{ facingMode: 'user' }} />
              <div className="absolute inset-0 bg-bg-primary/40 flex items-center justify-center">
                <motion.div key={countdown} initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="text-8xl font-bold text-white">{countdown}</motion.div>
              </div>
            </div>
            <p className="text-text-secondary">Get ready to speak...</p>
          </motion.div>
        )}

        {state === 'recording' && (
          <motion.div key="recording" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden">
              <Webcam ref={webcamRef} audio={micOn} mirrored className="w-full h-full object-cover" videoConstraints={{ facingMode: 'user' }} />
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-bg-primary/70 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="relative w-3 h-3">
                  <div className="absolute inset-0 rounded-full bg-error animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-error recording-pulse" />
                </div>
                <span className="text-sm font-semibold text-white">REC</span>
              </div>
              <div className="absolute top-4 right-4 bg-bg-primary/70 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-text-secondary" />
                <span className={`text-sm font-mono font-semibold ${timeLeft <= 10 ? 'text-error' : 'text-white'}`}>{formatTime(timeLeft)}</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-bg-primary/70 backdrop-blur-sm rounded-xl px-4 py-3">
                <p className="text-sm text-text-secondary mb-1">Prompt:</p>
                <p className="text-sm font-medium text-white">{selectedPrompt?.description}</p>
              </div>
              <div className="absolute bottom-20 left-4 flex flex-col gap-2">
                {['Eye Contact', 'Pace', 'Confidence'].map((label) => (
                  <div key={label} className="flex items-center gap-2 bg-bg-primary/70 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs text-white">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button onClick={stopRecording} className="flex items-center gap-2 bg-error hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all">
                <Square className="w-5 h-5 fill-current" /> Stop Recording
              </button>
            </div>
          </motion.div>
        )}

        {state === 'processing' && (
          <motion.div key="processing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh]">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-2xl bg-accent-glow border border-accent/20 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-accent" />
            </motion.div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Analyzing your speech...</h2>
            <p className="text-text-secondary mb-6">Our AI is reviewing your performance</p>
            <div className="flex items-center gap-6">
              {['Eye Contact', 'Voice', 'Pace', 'Energy'].map((label, i) => (
                <motion.div key={label} className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.3 }}>
                  <motion.div className="w-2 h-2 rounded-full bg-accent" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                  <span className="text-xs text-text-muted">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
