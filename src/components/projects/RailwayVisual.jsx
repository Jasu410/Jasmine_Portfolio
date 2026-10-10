import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion'

const VB = { w: 600, h: 300 }
const ROUTE = 'M50 235 C 150 240, 150 95, 250 95 S 380 225, 470 165 S 540 70, 560 62'
const STOPS = [0, 0.34, 0.68, 1]

export default function RailwayVisual({ stations, large = false }) {
  const wrap = useRef(null)
  const path = useRef(null)
  const train = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(wrap, { amount: 0.4 })
  const progress = useMotionValue(reduce ? 1 : 0)
  const [points, setPoints] = useState([])
  const [reached, setReached] = useState(reduce ? STOPS.length - 1 : -1)
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(null)
  const total = useRef(0)

  useLayoutEffect(() => {
    const p = path.current
    total.current = p.getTotalLength()
    setPoints(STOPS.map((s) => p.getPointAtLength(s * total.current)))
    placeTrain(progress.get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function placeTrain(v) {
    const p = path.current
    if (!p || !train.current) return
    const len = Math.min(v * total.current, total.current - 1)
    const a = p.getPointAtLength(len)
    const b = p.getPointAtLength(len + 1)
    const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI
    train.current.setAttribute('transform', `translate(${a.x} ${a.y}) rotate(${deg})`)
  }

  useMotionValueEvent(progress, 'change', (v) => {
    placeTrain(v)
    let r = -1
    STOPS.forEach((s, i) => {
      if (v >= s - 0.01) r = i
    })
    setReached(r)
    if (hovered === null && r >= 0) setActive(r)
  })

  useEffect(() => {
    if (!inView || reduce) return
    progress.set(0)
    const controls = animate(progress, 1, {
      duration: 6,
      ease: [0.45, 0, 0.25, 1],
      repeat: Infinity,
      repeatDelay: 1.6,
    })
    return () => controls.stop()
  }, [inView, reduce, progress])

  const shown = hovered ?? active

  return (
    <div className={`rail ${large ? 'rail--large' : ''}`} ref={wrap}>
      <div className="rail__map">
        <svg viewBox={`0 0 ${VB.w} ${VB.h}`} aria-hidden="true">
          <defs>
            <linearGradient id={`rail-grad-${large ? 'l' : 's'}`} x1="0" x2="1">
              <stop offset="0" stopColor="#2f6bff" />
              <stop offset="1" stopColor="#8b7cf6" />
            </linearGradient>
            <pattern id="rail-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(14,21,48,0.12)" />
            </pattern>
          </defs>
          <rect width={VB.w} height={VB.h} fill="url(#rail-dots)" />
          <path ref={path} d={ROUTE} className="rail__bed" />
          <path d={ROUTE} className="rail__sleepers" />
          <motion.path
            d={ROUTE}
            className="rail__done"
            stroke={`url(#rail-grad-${large ? 'l' : 's'})`}
            style={{ pathLength: progress }}
          />
          <g ref={train} className="rail__train">
            <rect x="-22" y="-8" width="30" height="16" rx="6" className="rail__car" />
            <rect x="10" y="-9" width="22" height="18" rx="8" className="rail__engine" />
            <rect x="-16" y="-4" width="6" height="6" rx="1.5" className="rail__window" />
            <rect x="-6" y="-4" width="6" height="6" rx="1.5" className="rail__window" />
            <circle cx="26" cy="0" r="2.6" className="rail__lamp" />
          </g>
        </svg>

        {points.map((pt, i) => (
          <button
            key={stations[i].name}
            type="button"
            className={`rail__station ${i <= reached ? 'is-reached' : ''} ${i === shown ? 'is-active' : ''}`}
            style={{ left: `${(pt.x / VB.w) * 100}%`, top: `${(pt.y / VB.h) * 100}%` }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            onClick={(e) => {
              e.stopPropagation()
              setActive(i)
            }}
            aria-describedby={`rail-feature-${large ? 'l' : 's'}`}
          >
            <span className="rail__dot" />
            <span className="rail__name">{stations[i].name}</span>
          </button>
        ))}
      </div>

      <div className="rail__feature" id={`rail-feature-${large ? 'l' : 's'}`} aria-live="polite">
        <span className="rail__feature-num">Station 0{shown + 1}</span>
        <motion.p key={shown} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <strong>{stations[shown].name}.</strong> {stations[shown].description}
        </motion.p>
      </div>
    </div>
  )
}
