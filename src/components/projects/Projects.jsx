import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionLabel from '../SectionLabel.jsx'
import RevealText from '../RevealText.jsx'
import Magnetic from '../Magnetic.jsx'
import HRVVisual from './HRVVisual.jsx'
import RailwayVisual from './RailwayVisual.jsx'
import ProjectModal from './ProjectModal.jsx'
import { projects } from '../../data/content.js'

const ease = [0.22, 1, 0.36, 1]

function Showcase({ project, reverse, onOpen }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const numY = useTransform(scrollYProgress, [0, 1], [80, -120])

  return (
    <article className={`showcase ${reverse ? 'showcase--reverse' : ''} showcase--${project.id}`} ref={ref}>
      <motion.span className="showcase__bignum" style={{ y: numY }} aria-hidden="true">
        {project.index}
      </motion.span>

      <motion.div
        className="showcase__visual"
        style={{ y }}
        data-cursor="view"
        data-cursor-label="Explore"
        onClick={onOpen}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, ease }}
      >
        {project.id === 'hrv' ? (
          <HRVVisual pipeline={project.pipeline} />
        ) : (
          <RailwayVisual stations={project.stations} />
        )}
      </motion.div>

      <motion.div
        className="showcase__info"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
      >
        <span className="showcase__index">Project {project.index}</span>
        <h3 className="showcase__title">{project.title}</h3>
        <p className="showcase__desc">{project.description}</p>
        <ul className="showcase__details">
          {project.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <div className="tags">
          {project.tech.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <Magnetic>
          <button type="button" className="btn btn--primary" onClick={onOpen} data-cursor="hover">
            Explore Project <ArrowUpRight size={18} />
          </button>
        </Magnetic>
      </motion.div>
    </article>
  )
}

export default function Projects() {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const project = projects.find((p) => p.id === open)

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionLabel index="04" label="Projects" />
        <div className="projects__head">
          <RevealText as="h2" className="display" lines={['Selected work.']} />
          <p className="lead muted">
            Two projects, two very different problems — reading the human heart, and moving
            passengers reliably.
          </p>
        </div>

        {projects.map((p, i) => (
          <Showcase key={p.id} project={p} reverse={i % 2 === 1} onOpen={() => setOpen(p.id)} />
        ))}
      </div>

      <AnimatePresence>{project && <ProjectModal key={project.id} project={project} onClose={close} />}</AnimatePresence>
    </section>
  )
}
