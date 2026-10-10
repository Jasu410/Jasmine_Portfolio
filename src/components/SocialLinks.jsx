import { GithubIcon, LeetcodeIcon, LinkedinIcon } from './Icons.jsx'
import { profile } from '../data/content.js'

const items = [
  { name: 'LinkedIn', href: profile.links.linkedin, Icon: LinkedinIcon },
  { name: 'GitHub', href: profile.links.github, Icon: GithubIcon },
  { name: 'LeetCode', href: profile.links.leetcode, Icon: LeetcodeIcon },
]

export default function SocialLinks({ className = '', showLabels = false }) {
  return (
    <ul className={`social ${className}`}>
      {items.map(({ name, href, Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social__link"
            aria-label={showLabels ? undefined : `${name} (opens in a new tab)`}
          >
            <Icon size={18} />
            {showLabels && <span>{name}</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}
