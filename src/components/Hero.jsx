import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import RevealText from './RevealText.jsx'
import Magnetic from './Magnetic.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import SocialLinks from './SocialLinks.jsx'
import SceneFallback from './SceneFallback.jsx'
import { useMediaQuery } from '../hooks/useMediaQuery.js'

const HeroScene = lazy(() => import('./HeroScene.jsx'))
const ease = [0.22, 1, 0.36, 1]

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

export default function Hero({ loaded }) {
  const sectionRef = useRef(null)
  const visualRef = useRef(null)
  const webgl = useMemo(hasWebGL, [])
  const reduce = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1100px)')
  const [inView, setInView] = useState(true)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  // Pause the WebGL loop once the hero leaves the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 })
    if (visualRef.current) io.observe(visualRef.current)
    return () => io.disconnect()
  }, [])

  const show = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: loaded ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease, delay },
  })

  const quality = isMobile ? 'low' : isTablet ? 'medium' : 'high'

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <div className="hero__bg" aria-hidden="true">
        <span className="blob blob--lav" />
        <span className="blob blob--blue" />
        <span className="blob blob--coral" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__layout">
        <motion.div className="hero__copy" style={{ y: copyY, opacity: fade }}>
          <motion.p className="hero__hello" {...show(0.1)}>
            <span className="hero__hello-dot" />
            Hi, I&apos;m Jasmine.
          </motion.p>

          <RevealText
            as="h1"
            className="hero__title"
            lines={['Computer Science Engineer', 'Building Ideas Into', 'Digital Experiences.']}
            accentLines={[2]}
            play={loaded}
            delay={0.2}
            stagger={0.07}
          />

          <motion.p className="hero__intro" {...show(0.75)}>
            Computer Science Engineering graduate with a strong foundation in Java, SQL and web
            technologies, passionate about building practical software solutions and continuously
            learning new technologies.
          </motion.p>

          <motion.div className="hero__actions" {...show(0.9)}>
            <Magnetic>
              <a href="#projects" className="btn btn--primary">
                View My Work
                <ArrowDown size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn--ghost">
                Let&apos;s Connect
                <ArrowUpRight size={18} />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div className="hero__social" {...show(1.05)}>
            <span className="hero__social-label">Find me on</span>
            <SocialLinks />
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          ref={visualRef}
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease, delay: 0.35 }}
        >
          <div className="hero__canvas">
            {webgl ? (
              <ErrorBoundary fallback={<SceneFallback />}>
                <Suspense fallback={<SceneFallback />}>
                  {loaded && <HeroScene quality={quality} reduced={!!reduce} active={inView} />}
                </Suspense>
              </ErrorBoundary>
            ) : (
              <SceneFallback />
            )}
          </div>

          <motion.div
            className="hero__panel glass"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 1.1 }}
            aria-hidden="true"
          >
            <div className="hero__panel-bar">
              <i /> <i /> <i /> <span>Jasmine.java</span>
            </div>
            <pre>
              <code>
                <b className="tk-k">public class</b> <b className="tk-t">Jasmine</b> {'{'}
                {'\n  '}
                <b className="tk-t">String</b> degree = <b className="tk-s">&quot;B.Tech CSE&quot;</b>;
                {'\n  '}
                <b className="tk-t">String[]</b> stack = {'{'}
                <b className="tk-s">&quot;Java&quot;</b>, <b className="tk-s">&quot;SQL&quot;</b>,{' '}
                <b className="tk-s">&quot;Web&quot;</b>
                {'}'};{'\n'}
                {'}'}
              </code>
            </pre>
          </motion.div>

          <motion.div
            className="hero__chip glass"
            initial={{ opacity: 0, y: -16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 1.25 }}
            aria-hidden="true"
          >
            <span className="status-dot" /> Open to software roles
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="hero__scroll"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
      >
        <span className="hero__scroll-track">
          <span />
        </span>
        Scroll
      </motion.a>
    </section>
  )
}
