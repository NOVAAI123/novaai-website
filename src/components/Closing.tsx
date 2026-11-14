import { Mail, Phone, MapPin } from 'lucide-react'
import ContactForm from './ContactForm'
import Booking from './Booking'
import { Label, Logo, Pill, Reveal } from './ui'

const CONTACT = {
  email: 'info@novaaimentorsmind.com',
  phone: '+852 4424 5077',
  tel: '+85244245077',
  linkedin: 'https://www.linkedin.com/company/nova-ai-ltd/posts/?feedView=all',
  address: 'Room 26, 8/F, Win Sun Factory Building, No. 2 San Hop Lane, Tuen Mun, Hong Kong',
}

export function Contact() {
  return (
    <section id="contact" className="bg-mist py-20 sm:py-24 lg:py-[120px]"><div className="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal><div className="max-w-3xl"><Label>Contact us</Label><h2 className="mt-6 text-3xl sm:text-5xl">Start Your Project</h2>
        <p className="mt-5 text-slate">Tell us what you are building and the outcome you want.</p></div></Reveal>
      <div className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <ContactForm />
        <aside className="space-y-4">
          <Booking />
          <div className="rounded-[20px] border border-slate/15 bg-white p-7 transition duration-300 hover:border-cyan hover:shadow-[0_24px_48px_-32px_rgba(15,23,42,.35)]"><h3 className="text-xl">Contact details</h3>
            <ul className="mt-4 space-y-4 text-sm text-slate">
              <li className="flex gap-3"><Mail size={18} className="mt-3 shrink-0 text-sky" aria-hidden /><a href={`mailto:${CONTACT.email}`} className="link-u inline-flex min-h-10 items-center break-all text-ink hover:text-sky">{CONTACT.email}</a></li>
              <li className="flex gap-3"><Phone size={18} className="mt-3 shrink-0 text-sky" aria-hidden /><a href={`tel:${CONTACT.tel}`} className="link-u inline-flex min-h-10 items-center text-ink hover:text-sky">{CONTACT.phone}</a></li>
              <li className="flex gap-3"><MapPin size={18} className="mt-3 shrink-0 text-sky" aria-hidden /><address className="py-2.5 not-italic text-ink">{CONTACT.address}</address></li>
            </ul></div>
        </aside>
      </div>
    </div></section>
  )
}

export function Footer() {
  return (
    <footer data-dark className="relative m-3 overflow-hidden rounded-[28px] bg-obsidian text-white sm:m-4">
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal><div className="max-w-3xl"><p className="tag text-cyan">Launch with NOVA AI</p>
          <h2 className="mt-6 text-[2.4rem] sm:text-6xl lg:text-7xl">Let’s build your next <span className="em text-cyan">digital experience.</span></h2>
          <p className="mt-6 max-w-xl text-white/70">From top-charting mobile games to intelligent Android and iOS apps, NOVA AI turns ambitious ideas into reliable, creative, and market-ready products.</p>
          <div className="mt-8"><Pill href="#contact" variant="cyan" className="w-full sm:w-auto">Launch With NOVA AI</Pill></div></div></Reveal>
        <Reveal><div className="mt-16 grid gap-10 border-t sm:mt-24 border-white/15 pt-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div><Logo /><p className="tag mt-4 text-cyan">The Mentor’s Mind</p><p className="mt-4 max-w-xs text-sm text-white/60">Mobile app and game studio: Android, iOS, game design, UI/UX, QA, and ASO.</p></div>
          <nav aria-label="Footer"><ul className="grid grid-cols-2 gap-x-6 text-sm text-white/70 md:block">{[['Home', '#home'], ['Who We Are', '#who'], ['Products', '#products'], ['Services', '#services'], ['Team', '#team'], ['Contact', '#contact']].map(([l, h]) => <li key={h}><a href={h} className="link-u inline-flex min-h-10 items-center hover:text-cyan">{l}</a></li>)}</ul></nav>
          <div><ul className="space-y-1 text-sm text-white/70"><li><a href={`mailto:${CONTACT.email}`} className="link-u inline-flex min-h-10 items-center break-all hover:text-cyan">{CONTACT.email}</a></li><li><a href={`tel:${CONTACT.tel}`} className="link-u inline-flex min-h-10 items-center hover:text-cyan">{CONTACT.phone}</a></li><li><address className="py-1 not-italic text-white/60">{CONTACT.address}</address></li></ul>
            <div className="mt-4 flex gap-2"><a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="NOVA AI on LinkedIn (opens in a new tab)" className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition duration-200 hover:border-cyan hover:text-cyan"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></a></div></div>
        </div>
        <p className="mt-12 text-xs text-white/60">© {new Date().getFullYear()} NOVA AI. All rights reserved.</p></Reveal>
      </div>
    </footer>
  )
}
