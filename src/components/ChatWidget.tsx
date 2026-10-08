import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Bot, MessageCircle, Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { askAssistant } from '../lib/assistant'
import type { ChatMessage } from '../lib/assistant'

type Message = ChatMessage & {
  id: number
  chips?: string[]
  links?: { label: string; href: string }[]
}

const greeting: Message = {
  id: 0,
  role: 'assistant',
  content: "Hi! I'm Wogenie's assistant. Ask me anything about his skills, projects, or how to get in touch.",
  chips: ['What can he build?', 'Show me his projects', 'How do I contact him?'],
}

async function replyAtLeast<T>(ms: number, work: Promise<T>): Promise<T> {
  const started = Date.now()
  const value = await work
  const remaining = ms - (Date.now() - started)
  if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining))
  return value
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([greeting])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const reduce = useReducedMotion()

  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(1)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, thinking])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const send = async (raw: string) => {
    const question = raw.trim()
    if (!question || thinking) return

    const history: ChatMessage[] = messages.map(({ role, content }) => ({ role, content }))
    setInput('')
    setMessages((prev) => [...prev, { id: nextId.current++, role: 'user', content: question }])
    setThinking(true)

    const reply = await replyAtLeast(reduce ? 150 : 550, askAssistant(history, question))

    setThinking(false)
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: 'assistant', content: reply.text, chips: reply.chips, links: reply.links },
    ])
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? 'Close chat assistant' : 'Chat with the portfolio assistant'}
        className="fixed right-5 bottom-5 z-[60] grid size-14 place-items-center rounded-full bg-accent text-on-accent shadow-lg shadow-black/15 transition hover:scale-105 hover:bg-accent/90"
      >
        {open ? <X className="size-6" aria-hidden="true" /> : <MessageCircle className="size-6" aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="chat-panel"
            role="dialog"
            aria-label="Portfolio assistant"
            initial={reduce ? undefined : { opacity: 0, y: 16, scale: 0.97 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-5 bottom-24 z-[60] flex max-h-[70vh] w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl shadow-black/15 sm:w-[380px]"
          >
            <header className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="grid size-9 place-items-center rounded-full bg-accent/10 text-accent">
                <Bot className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-ink">Portfolio Assistant</span>
                <span className="block truncate font-mono text-[11px] text-muted-soft">
                  answers questions about Wogenie's work
                </span>
              </span>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-emerald-signal">
                <span className="node-pulse size-1.5 rounded-full bg-emerald-signal" aria-hidden="true" />
                online
              </span>
            </header>

            <div ref={logRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'rounded-br-md bg-accent/10 text-ink'
                        : 'rounded-bl-md border border-line bg-panel-2 text-muted-strong'
                    }`}
                  >
                    {message.content}
                  </div>

                  {message.links?.length ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {message.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer noopener"
                          className="rounded-full border border-line bg-panel px-3 py-1 text-xs text-muted-strong transition hover:border-accent/50 hover:text-accent"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : null}

                  {message.chips?.length && message.id === messages[messages.length - 1]?.id ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {message.chips.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => void send(chip)}
                          className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs text-accent transition hover:bg-accent/10"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}

              {thinking ? (
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-panel-2 px-3.5 py-3 w-fit">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="size-1.5 animate-pulse rounded-full bg-muted-soft"
                      style={{ animationDelay: `${dot * 0.15}s` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                void send(input)
              }}
              className="flex items-center gap-2 border-t border-line px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about skills, projects…"
                aria-label="Message the assistant"
                className="min-w-0 flex-1 rounded-full border border-line bg-void px-4 py-2.5 text-sm text-ink placeholder:text-muted-soft focus:border-accent/60 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || thinking}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition hover:bg-accent/90 disabled:opacity-40"
              >
                <Send className="size-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
