import Hero from './components/Hero'
import Progress from './components/Progress'
import { Who, Values, Pipeline, Products, Services, Team } from './components/Body'
import { Contact, Footer } from './components/Closing'

export default function App() {
  return (
    <>
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-cyan focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-obsidian">Skip to content</a>
      <Progress />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Who />
        <Values />
        <Pipeline />
        <Products />
        <Services />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
