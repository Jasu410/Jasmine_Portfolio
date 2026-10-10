import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/projects/Projects.jsx'
import Education from './components/Education.jsx'
import Beyond from './components/Beyond.jsx'
import Connect from './components/Connect.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const finishLoading = useCallback(() => setLoaded(true), [])
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', !loaded)
  }, [loaded])

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <AnimatePresence>{!loaded && <Loader key="loader" onDone={finishLoading} />}</AnimatePresence>
      <Cursor />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Nav loaded={loaded} />
      <main id="main">
        <Hero loaded={loaded} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Beyond />
        <Connect />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
