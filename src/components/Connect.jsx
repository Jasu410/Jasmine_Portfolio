import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionLabel from './SectionLabel.jsx'
import RevealText from './RevealText.jsx'
import Magnetic from './Magnetic.jsx'
import { GithubIcon, LeetcodeIcon, LinkedinIcon } from './Icons.jsx'
import { profile } from '../data/content.js'

const ease = [0.22, 1, 0.36, 1]

const tiles = [
  {
    name: 'GitHub',
    tagline: 'Explore my code',
    handle: 'github.com/Jasu410',
    href: profile.links.github,
    Icon: GithubIcon,
    tone: 'ink',
  },
  {
    name: 'LeetCode',
    tagline: 'See my problem-solving journey',
    handle: 'leetcode.com/u/jasminesk',
    href: profile.links.leetcode,
    Icon: LeetcodeIcon,
    tone: 'coral',
  },
  {
    name: 'LinkedIn',
    tagline: 'Connect professionally',
    handle: 'linkedin.com/in/jasminesk41',
    href: profile.links.linkedin,
    Icon: LinkedinIcon,
    tone: 'blue',
  },
]

function onTileMove(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function Connect() {
  return (
    <section id="connect" className="section connect">
      <div className="container">
        <SectionLabel index="08" label="Code & Connect" />
        <RevealText as="h2" className="heading" lines={['Find me where', 'the work happens.']} accentLines={[1]} />

        <div className="tiles">
          {tiles.map(({ name, tagline, handle, href, Icon, tone }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease, delay: i * 0.12 }}
            >
              <Magnetic strength={0.12} block>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`tile tile--${tone}`}
                  onMouseMove={onTileMove}
                  data-cursor="view"
                  data-cursor-label="Open"
                >
                  <span className="tile__glow" aria-hidden="true" />
                  <span className="tile__icon">
                    <Icon size={30} />
                  </span>
                  <span className="tile__name">{name}</span>
                  <span className="tile__tagline">{tagline}</span>
                  <span className="tile__handle">
                    {handle}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                  <span className="tile__arrow" aria-hidden="true">
                    <ArrowUpRight size={22} />
                  </span>
                </a>
              </Magnetic>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
