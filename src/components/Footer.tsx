const email = 'wogenieliyewsenay@gmail.com'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-sm font-medium text-ink">Neural Engineer-Wogenie L</p>
          <p className="mt-1 font-mono text-[11px] tracking-[0.18em] text-muted-soft">
            AI/ML Engineer · Applied AI · Intelligent Systems
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Wogenie"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-block py-1 text-sm text-muted transition hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={`mailto:${email}`}
            className="inline-block py-1 text-sm text-muted transition hover:text-ink"
          >
            Email
          </a>
        </div>

        <p className="font-mono text-[11px] text-muted">© 2026 Wogenie Liyew</p>
      </div>
    </footer>
  )
}
