import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/**
 * Word-by-word masked reveal. Pass `play` to control it manually (e.g. after the loader);
 * otherwise it reveals when scrolled into view.
 */
export default function RevealText({
  lines,
  as: Tag = 'span',
  className = '',
  accentLines = [],
  delay = 0,
  stagger = 0.06,
  play,
}) {
  const arr = Array.isArray(lines) ? lines : [lines]
  const controlled = play !== undefined
  let idx = 0

  return (
    <Tag className={`reveal-text ${className}`}>
      <span className="sr-only">{arr.join(' ')}</span>
      {arr.map((line, li) => (
        <span className={`rt-line ${accentLines.includes(li) ? 'rt-accent' : ''}`} key={li} aria-hidden="true">
          {line.split(' ').map((word, wi) => {
            const i = idx++
            const anim = controlled
              ? { animate: { y: play ? '0%' : '108%' } }
              : { whileInView: { y: '0%' }, viewport: { once: true, amount: 0.5 } }
            return (
              <span className="rt-mask" key={wi}>
                <motion.span
                  className="rt-word"
                  initial={{ y: '108%' }}
                  {...anim}
                  transition={{ duration: 0.9, ease, delay: delay + i * stagger }}
                >
                  {word}
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
