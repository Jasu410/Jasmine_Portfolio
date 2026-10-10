import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Activity } from 'lucide-react'

const W = 600
const MID = 92
const RR = [82, 96, 72, 90, 104, 76, 88, 94]

// Stylised ECG trace whose beat-to-beat spacing varies — that variation is what HRV measures.
function buildTrace() {
  let d = `M0 ${MID}`
  const peaks = []
  let x = 0
  let i = 0
  while (x < W) {
    const w = RR[i % RR.length]
    const b = x
    d += ` L${b + w * 0.16} ${MID} Q${b + w * 0.23} ${MID - 9} ${b + w * 0.3} ${MID}`
    d += ` L${b + w * 0.37} ${MID} L${b + w * 0.41} ${MID + 9} L${b + w * 0.46} ${MID - 62}`
    d += ` L${b + w * 0.51} ${MID + 20} L${b + w * 0.56} ${MID} L${b + w * 0.66} ${MID}`
    d += ` Q${b + w * 0.77} ${MID - 15} ${b + w * 0.88} ${MID} L${b + w} ${MID}`
    peaks.push(b + w * 0.46)
    x += w
    i++
  }
  return { d, peaks }
}

const BARS = Array.from({ length: 32 }, (_, i) => 0.35 + 0.3 * Math.sin(i * 0.9) + 0.25 * Math.sin(i * 0.37 + 1))

export default function HRVVisual({ pipeline, large = false }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { amount: 0.3 })
  const { d, peaks } = useMemo(buildTrace, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'center 55%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 70, damping: 22 })
  const [step, setStep] = useState(0)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (!inView || reduce || hovering) return
    const t = setInterval(() => setStep((s) => (s + 1) % pipeline.length), 1800)
    return () => clearInterval(t)
  }, [inView, reduce, hovering, pipeline.length])

  return (
    <div className={`hrv ${large ? 'hrv--large' : ''}`} ref={ref}>
      <div className="hrv__head">
        <span className="hrv__badge">
          <Activity size={14} /> HRV signal
        </span>
        <span className="hrv__live">
          <i /> analysing
        </span>
      </div>

      <svg className="hrv__wave" viewBox={`0 0 ${W} 160`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`hrv-grad-${large ? 'l' : 's'}`} x1="0" x2="1">
            <stop offset="0" stopColor="#8b7cf6" />
            <stop offset="0.6" stopColor="#2f6bff" />
            <stop offset="1" stopColor="#ff7a85" />
          </linearGradient>
        </defs>
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} x2={i * 50} y1="0" y2="160" className="hrv__grid" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <line key={`h${i}`} y1={i * 40} y2={i * 40} x1="0" x2={W} className="hrv__grid" />
        ))}
        <path d={d} className="hrv__ghost" />
        <motion.path
          d={d}
          className="hrv__trace"
          stroke={`url(#hrv-grad-${large ? 'l' : 's'})`}
          style={{ pathLength: large ? 1 : draw }}
        />
        {/* RR interval annotation between the first two R-peaks */}
        <g className="hrv__rr">
          <line x1={peaks[1]} x2={peaks[2]} y1="16" y2="16" />
          <line x1={peaks[1]} x2={peaks[1]} y1="11" y2="21" />
          <line x1={peaks[2]} x2={peaks[2]} y1="11" y2="21" />
          <text x={(peaks[1] + peaks[2]) / 2} y="11">
            RR interval
          </text>
        </g>
        <rect className="hrv__scan" x="0" y="0" width="60" height="160" />
      </svg>

      <div className="hrv__conv" aria-hidden="true">
        <span className="hrv__conv-label">1D convolution</span>
        <div className="hrv__bars">
          {BARS.map((h, i) => (
            <span key={i} style={{ height: `${h * 100}%`, '--i': i }} />
          ))}
          <span className="hrv__kernel" />
        </div>
      </div>

      <ol className="pipeline" onMouseLeave={() => setHovering(false)}>
        {pipeline.map((p, i) => (
          <li key={p.label} className={`pipeline__step ${i === step ? 'is-active' : ''} ${i < step ? 'is-done' : ''}`}>
            <button
              type="button"
              onMouseEnter={() => {
                setHovering(true)
                setStep(i)
              }}
              onFocus={() => setStep(i)}
              onClick={(e) => {
                e.stopPropagation()
                setStep(i)
              }}
              aria-pressed={i === step}
            >
              <span className="pipeline__num">0{i + 1}</span>
              {p.label}
            </button>
            {i < pipeline.length - 1 && <span className="pipeline__arrow" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <p className="pipeline__desc" aria-live="polite">
        {pipeline[step].description}
      </p>
    </div>
  )
}
