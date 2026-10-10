import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Loader2, Mail, Send } from 'lucide-react'
import SectionLabel from './SectionLabel.jsx'
import RevealText from './RevealText.jsx'
import Magnetic from './Magnetic.jsx'
import SocialLinks from './SocialLinks.jsx'
import { profile } from '../data/content.js'

const ease = [0.22, 1, 0.36, 1]

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      // Posts to the static skeleton so Netlify Forms captures the submission.
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="contact__bg" aria-hidden="true">
        <span className="blob blob--lav" />
        <span className="blob blob--blue" />
      </div>
      <div className="container">
        <SectionLabel index="09" label="Contact" />
        <div className="contact__grid">
          <div className="contact__copy">
            <RevealText
              as="h2"
              className="display contact__title"
              lines={["Let's build", 'something', 'meaningful.']}
              accentLines={[2]}
            />
            <motion.p
              className="lead"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
            >
              Whether it&apos;s a software project, a new opportunity, or an interesting idea, I&apos;d
              love to connect.
            </motion.p>

            <div className="contact__email">
              <Magnetic>
                <a href={`mailto:${profile.email}`} className="btn btn--primary btn--lg">
                  <Mail size={20} /> Say hello
                </a>
              </Magnetic>
              <button type="button" className="contact__copy-btn" onClick={copyEmail}>
                <span>{profile.email}</span>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span className="sr-only" aria-live="polite">
                  {copied ? 'Email copied to clipboard' : ''}
                </span>
              </button>
            </div>

            <SocialLinks className="social--labels" showLabels />
          </div>

          <motion.div
            className="contact__form-wrap glass"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  role="status"
                >
                  <span className="form-success__icon">
                    <Check size={28} />
                  </span>
                  <h3>Message sent.</h3>
                  <p>Thank you for reaching out — I&apos;ll get back to you soon.</p>
                  <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={onSubmit}
                  className="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="sr-only" aria-hidden="true">
                    <label>
                      Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>
                  <h3 className="form__title">Send a message</h3>
                  <div className="field">
                    <input id="cf-name" name="name" type="text" required placeholder=" " autoComplete="name" />
                    <label htmlFor="cf-name">Name</label>
                  </div>
                  <div className="field">
                    <input id="cf-email" name="email" type="email" required placeholder=" " autoComplete="email" />
                    <label htmlFor="cf-email">Email</label>
                  </div>
                  <div className="field">
                    <textarea id="cf-message" name="message" rows={5} required placeholder=" " />
                    <label htmlFor="cf-message">Message</label>
                  </div>
                  {status === 'error' && (
                    <p className="form__error" role="alert">
                      Something went wrong. Please try again, or email me directly at {profile.email}.
                    </p>
                  )}
                  <button type="submit" className="btn btn--primary btn--full" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={18} className="spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
