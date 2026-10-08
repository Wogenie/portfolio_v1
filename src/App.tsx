import { About } from './components/About'
import { Capabilities } from './components/Capabilities'
import { ChatWidget } from './components/ChatWidget'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { GithubSection } from './components/GithubSection'
import { Hero } from './components/Hero'
import { Interests } from './components/Interests'
import { Navbar } from './components/Navbar'
import { Philosophy } from './components/Philosophy'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

export default function App() {
  return (
    <div className="min-h-screen bg-void">
      <a
        href="#home"
        className="sr-only rounded-md bg-accent px-4 py-2 text-sm font-medium text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80]"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Capabilities />
        <Projects />
        <Skills />
        <Philosophy />
        <Interests />
        <GithubSection />
        <Contact />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}
