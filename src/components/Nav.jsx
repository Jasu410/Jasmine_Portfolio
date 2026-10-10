import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems } from '../data/content.js'

const ease = [0.22, 1, 0.36, 1]
const navIds = new Set(navItems.map((i) => i.id))

export default function Nav({ loaded }) {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && navIds.has(entry.target.id)) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={loaded ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease, delay: 0.2 }}
    >
      <nav className="nav__bar" aria-label="Primary">
        <a href="#home" className="nav__logo" aria-label="Jasmine — back to top">
          <span className="nav__logo-mark">J</span>
          <span className="nav__logo-text">Jasmine</span>
        </a>

        <ul className="nav__links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`nav__link ${active === item.id ? 'is-active' : ''}`}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {active === item.id && (
                  <motion.span
                    className="nav__pill"
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="nav__link-text">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="nav__status" title="Available for opportunities">
          <span className="status-dot" />
          <span className="nav__status-text">Available for opportunities</span>
        </div>

        <button
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="nav__mobile"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? 'is-active' : ''}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <span>0{i + 1}</span>
                {item.label}
              </motion.a>
            ))}
            <div className="nav__mobile-status">
              <span className="status-dot" /> Available for opportunities
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
