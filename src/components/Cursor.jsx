import { useEffect, useRef, useState } from 'react'
import { useFinePointer } from '../hooks/useMediaQuery.js'

const INTERACTIVE = '[data-cursor], a, button, input, textarea, select, label, [role="button"]'

export default function Cursor() {
  const fine = useFinePointer()
  const dot = useRef(null)
  const ring = useRef(null)
  const [mode, setMode] = useState('default')
  const [label, setLabel] = useState('View')

  useEffect(() => {
    if (!fine) return
    const root = document.documentElement
    root.classList.add('custom-cursor')

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...target }
    let visible = false
    let raf

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!visible) {
        visible = true
        ringPos.x = target.x
        ringPos.y = target.y
        root.classList.add('cursor-visible')
      }
    }
    const onOver = (e) => {
      const el = e.target.closest?.(INTERACTIVE)
      if (!el) return setMode('default')
      const m = el.dataset.cursor
      if (m === 'view') setLabel(el.dataset.cursorLabel || 'View')
      if (m) return setMode(m)
      const tag = el.tagName
      setMode(tag === 'INPUT' || tag === 'TEXTAREA' ? 'text' : 'hover')
    }
    const onLeave = () => {
      visible = false
      root.classList.remove('cursor-visible')
    }
    const onDown = () => root.classList.add('cursor-down')
    const onUp = () => root.classList.remove('cursor-down')

    const tick = () => {
      const k = reduce ? 1 : 0.17
      ringPos.x += (target.x - ringPos.x) * k
      ringPos.y += (target.y - ringPos.y) * k
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('custom-cursor', 'cursor-visible', 'cursor-down')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [fine])

  if (!fine) return null

  return (
    <div className={`cursor cursor--${mode}`} aria-hidden="true">
      <div className="cursor__ring" ref={ring}>
        <span className="cursor__ring-inner">
          <span className="cursor__label">{label}</span>
        </span>
      </div>
      <div className="cursor__dot" ref={dot}>
        <span />
      </div>
    </div>
  )
}
