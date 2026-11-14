import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Label, Logo, Pill, Stars } from './ui'

const LINKS = [['Home', '#home'], ['Who We Are', '#who'], ['Products', '#products'], ['Services', '#services'], ['Team', '#team']]

const SECTION_IDS = ['home', 'who', 'values', 'pipeline', 'products', 'services', 'team', 'contact']
const GROUP: Record<string, string> = { values: 'who', pipeline: 'who' }

export default function Hero() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Scroll-spy: highlight the nav link for the section crossing the viewport's upper-middle band.
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(GROUP[e.target.id] ?? e.target.id) })
    }, { rootMargin: '-40% 0px -55% 0px' })
    SECTION_IDS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  // Mobile menu: Escape and outside click close it; focus returns to the toggle on Escape.
  useEffect(() => {
    if (!open) return
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus() } }
    const out = (e: PointerEvent) => { if (!headerRef.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('keydown', key); document.addEventListener('pointerdown', out)
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', out) }
  }, [open])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const glass = scrolled || open
  return (
    <>
      <header ref={headerRef} data-dark className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <div className={`mx-auto max-w-7xl rounded-[28px] border px-4 transition-all duration-500 ease-out sm:px-5 ${glass ? 'border-white/10 bg-obsidian/70 py-2 backdrop-blur-xl' : 'border-transparent bg-transparent py-3'}`}>
          <nav aria-label="Primary" className="flex items-center justify-between">
            <a href="#home" aria-label="NOVA AI home" className="inline-flex min-h-11 items-center"><Logo /></a>
            <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
              {LINKS.map(([l, h]) => <li key={h}><a href={h} aria-current={active === h.slice(1) ? 'true' : undefined} className={`block rounded-full px-4 py-2.5 text-sm transition duration-200 hover:bg-cyan/15 hover:text-cyan ${active === h.slice(1) ? 'bg-white/10 text-white' : 'text-white/75'}`}>{l}</a></li>)}
            </ul>
            <div className="flex items-center gap-2">
              <span className="hidden sm:block"><Pill href="#contact">Start Project</Pill></span>
              <button ref={toggleRef} className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-cyan/50 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
            </div>
          </nav>
          <div id="mobile-menu" className={`grid text-white transition-all duration-300 ease-out lg:hidden ${open ? 'grid-rows-[1fr] pt-3' : 'grid-rows-[0fr]'}`}>
            <ul className="overflow-hidden">
              {[...LINKS, ['Contact', '#contact']].map(([l, h]) => <li key={h}><a href={h} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} aria-current={active === h.slice(1) ? 'true' : undefined} className={`flex min-h-12 items-center rounded-xl px-4 transition-colors hover:bg-cyan/10 hover:text-cyan ${active === h.slice(1) ? 'bg-white/10 text-cyan' : ''}`}>{l}</a></li>)}
            </ul>
          </div>
        </div>
      </header>

      <section id="home" data-dark className="relative m-3 overflow-hidden rounded-[28px] bg-obsidian text-white sm:m-4">
        <Stars count={36} />
        <div aria-hidden className="absolute -right-32 top-10 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,.18),rgba(59,130,246,.08)_45%,transparent_70%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />

        <div className="relative z-10 flex min-h-[calc(100svh-2rem)] flex-col justify-between gap-16 px-5 pb-8 pt-32 sm:px-8 sm:pb-10 lg:pt-44">
          <div>
            <div className="hero-in"><Label dark>NOVA AI • The Mentor’s Mind</Label></div>
            <h1 className="hero-in mt-8 max-w-5xl text-[2.6rem] leading-[1] min-[400px]:text-[2.9rem] sm:text-6xl lg:text-6xl xl:text-7xl 2xl:text-[6.5rem]" style={{ ['--d' as string]: '120ms' }}>
              Building Intelligent<br className="hidden sm:block" /> Apps, Games &<br className="hidden sm:block" /> <span className="em text-cyan">Digital Experiences.</span>
            </h1>
          </div>
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <ul className="hero-in tag flex flex-wrap gap-x-6 gap-y-2 text-white/65" style={{ ['--d' as string]: '420ms' }}>
              {['Android & iOS', 'Game Studio', 'ASO & QA'].map((t) => <li key={t}>+ {t}</li>)}
            </ul>
            <div className="hero-in max-w-md" style={{ ['--d' as string]: '280ms' }}>
              <p className="text-base text-white/80">Driven by The Mentor’s Mind, NOVA AI combines AI-accelerated engineering, creative game design, and human mentorship to turn bold ideas into top-ranking Google Play and App Store products.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Pill href="#products" variant="cyan" className="w-full sm:w-auto">Explore Products</Pill><Pill href="#contact" className="w-full sm:w-auto">Contact Us</Pill></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
