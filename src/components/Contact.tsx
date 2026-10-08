import { ArrowUpRight, Mail, Phone, Send } from 'lucide-react'
import { GithubIcon } from './GithubIcon'
import { Reveal } from './Reveal'
import { Section } from './Section'

const email = 'wogenieliyewsenay@gmail.com'
const github = 'https://github.com/Wogenie'
const telegram = 'https://t.me/WogenieL'
const whatsapp = 'https://wa.me/251921290711'

const channels = [
  { label: 'email', Icon: Mail, value: email, href: `mailto:${email}` },
  { label: 'telegram', Icon: Send, value: '@WogenieL', href: telegram },
  { label: 'whatsapp', Icon: Phone, value: '+251921290711', href: whatsapp },
  { label: 'github', Icon: GithubIcon, value: 'github.com/Wogenie', href: github },
]

export function Contact() {
  return (
    <Section
      id="contact"
      label="08 / Contact"
      title="Let's Build Something Intelligent."
      intro="AI/ML engineering, applied AI, and challenging ML problems — reach out."
      className="border-t border-line"
    >
      <Reveal>
        <div className="overflow-hidden rounded-xl border border-line bg-panel">
          <dl className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel) => (
              <div key={channel.label} className="bg-panel p-6">
                <dt className="flex items-center gap-2 font-mono text-[11px] tracking-[0.24em] text-muted-soft uppercase">
                  <channel.Icon className="size-3.5" aria-hidden="true" />
                  {channel.label}
                </dt>
                <dd className="mt-3">
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer noopener"
                    className="inline-block py-1 text-base break-all text-muted-strong underline decoration-line underline-offset-4 transition hover:text-ink hover:decoration-accent"
                  >
                    {channel.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-3 border-t border-line p-6 sm:p-8">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-on-accent transition hover:bg-accent/90"
            >
              <Mail className="size-4" aria-hidden="true" />
              Send Email
            </a>
            <a
              href={telegram}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm text-muted-strong transition hover:border-line-strong hover:bg-wash hover:text-ink"
            >
              <Send className="size-4" aria-hidden="true" />
              Telegram
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm text-muted-strong transition hover:border-line-strong hover:bg-wash hover:text-ink"
            >
              <Phone className="size-4" aria-hidden="true" />
              WhatsApp
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm text-muted-strong transition hover:border-line-strong hover:bg-wash hover:text-ink"
            >
              <GithubIcon className="size-4" aria-hidden="true" />
              View GitHub
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
