import { ArrowUp } from 'lucide-react'
import SocialLinks from './SocialLinks.jsx'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__credit">
          <span className="nav__logo-mark">J</span>
          Designed &amp; Built by Jasmine
        </p>
        <SocialLinks />
        <p className="footer__meta">
          © {year} Shaik Jasmine
          <a href="#home" className="footer__top" aria-label="Back to top">
            <ArrowUp size={16} />
          </a>
        </p>
      </div>
    </footer>
  )
}
