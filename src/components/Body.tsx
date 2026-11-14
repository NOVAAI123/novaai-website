import { useState, type KeyboardEvent, type ReactNode } from 'react'
import { siApple, siAndroid } from 'simple-icons'
import { Gem, Lightbulb, Target, GraduationCap, Gamepad2, ChevronDown, Rocket, PenTool, Code2, Bug, BookOpen, Sparkles, Wrench } from 'lucide-react'
import { CountUp, Label, Reveal, Stars } from './ui'

const wrap = 'mx-auto max-w-7xl px-5 sm:px-8'
const Sec = ({ id, bg = 'bg-white', children }: { id?: string; bg?: string; children: ReactNode }) => <section id={id} className={`overflow-x-clip ${bg} ${bg === 'bg-mist' ? 'bg-gradient-to-b from-white via-mist to-mist' : ''} py-20 sm:py-24 lg:py-[120px]`}><div className={wrap}>{children}</div></section>

/* ---------- Photography (Unsplash), graded to the brand palette ---------- */
const photo = (id: string, w = 720, h = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`

/** Official Apple and Android logo marks (Simple Icons paths), drawn in currentColor. */
const brand = (path: string, label: string) => ({ size = 24 }: { size?: number; strokeWidth?: number; className?: string; 'aria-hidden'?: boolean }) => (
  <svg role="img" aria-label={label} viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className="text-sky"><path d={path} /></svg>
)
const AppleLogo = brand(siApple.path, 'Apple')
const AndroidLogo = brand(siAndroid.path, 'Android')
function Shot({ id, alt }: { id: string; alt: string }) {
  return (
    <div className="relative h-full overflow-hidden bg-obsidian">
      <img src={photo(id)} alt={alt} loading="lazy" decoding="async" width={720} height={900} className="h-full w-full object-cover text-transparent opacity-90 saturate-[.75] transition duration-700 ease-out group-hover:scale-[1.04]" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-indigo/10 to-sky/10 mix-blend-multiply" />
    </div>
  )
}

/* ---------- Who we are ---------- */
const METRICS: { to: number; suffix: string; label: string; desc: string }[] = [
  { to: 100, suffix: '%', label: 'Quality-first engineering', desc: 'Zero-compromise builds for stability, speed, and great ratings.' },
  { to: 100, suffix: '+', label: 'Apps & games shipped', desc: 'Original games and apps delivered for Android and iOS.' },
]
export function Who() {
  const shows = [
    ['Mobile App UI', <Shot id="1723609275983-9496fa96e8fd" alt="Close-up of a smartphone on a table" />],
    ['Game Experience', <Shot id="1612287230202-1ff1d85d1bdf" alt="Game controller lit by cyan light" />],
    ['Mentorship Collaboration', <Shot id="1522071820081-009f0129c71c" alt="A small team gathered around a laptop" />],
    ['Store Analytics', <Shot id="1551288049-bebda4e38f71" alt="Performance analytics charts on a laptop screen" />],
  ] as const
  return (
    <Sec id="who">
      <Reveal><Label>Who we are</Label>
        <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="max-w-4xl text-3xl sm:text-5xl xl:text-6xl">We build search-first apps and games to help visionary brands <span className="em text-slate">lead their categories.</span></h2>
          <p className="max-w-xs text-slate">NOVA AI is a mobile app and game studio: AI-assisted engineering with a mentor’s eye for what is worth building.</p>
        </div></Reveal>
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 md:grid-cols-4">
        {shows.map(([t, v], i) => <li key={t}><Reveal delay={i * 80}><figure className="group"><div className="aspect-[4/5] overflow-hidden rounded-[20px]">{v}</div><figcaption className="tag mt-4 flex justify-between text-slate"><span>{t}</span><span>0{i + 1}</span></figcaption></figure></Reveal></li>)}
      </ul>
      <div className="mt-16 sm:mt-24"><div className="flex justify-center"><Label>By the numbers</Label></div>
        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-5 gap-y-10 text-center sm:gap-x-12">
          {METRICS.map((m) => (
            <li key={m.label}>
              <p className="font-display text-5xl font-semibold tracking-tight sm:text-6xl xl:text-7xl"><CountUp to={m.to} suffix={m.suffix} /></p>
              <div className="mx-auto mt-5 max-w-xs border-t border-dashed border-slate/40 pt-4"><p className="text-sm font-medium">{m.label}</p><p className="mt-1 text-xs text-slate">{m.desc}</p></div></li>
          ))}
        </ul></div>
    </Sec>
  )
}

/* ---------- Values + apprentices ---------- */
function ValueCard({ icon: I, t, d }: { icon: typeof Gem; t: string; d: string }) {
  return <article className="group flex h-full min-h-48 flex-col sm:min-h-56 justify-between rounded-[20px] border border-slate/15 bg-white p-7 transition duration-300 ease-out hover:-translate-y-1.5 hover:border-cyan hover:shadow-[0_24px_48px_-32px_rgba(15,23,42,.35)]">
    <I size={24} strokeWidth={1.5} className="text-sky" aria-hidden />
    <div><h3 className="text-lg">{t}</h3><p className="mt-2 text-sm text-slate">{d}</p></div></article>
}
export function Values() {
  const L = [{ icon: Gem, t: 'Quality First', d: 'Zero-compromise engineering built for stability, speed, and 5-star ratings.' }, { icon: Lightbulb, t: 'Creative Thinking', d: 'Imaginative mechanics, bold visual storytelling, and fresh problem-solving.' }]
  const R = [{ icon: Target, t: 'Product Focused', d: 'Every feature is designed around retention, engagement, and market fit, with frictionless UX throughout.' }]
  const pillars = [[BookOpen, 'Knowledge', 'Deep expertise in mobile architecture, game engines, and modern AI workflows.'], [Sparkles, 'Creativity', 'A studio culture that rewards experimentation, original IP, and artistic excellence.'], [Wrench, 'Skills', 'Versatile, full-stack technical mastery tailored to complex product challenges.']] as const
  return (
    <Sec id="values" bg="bg-mist">
      <Reveal><div className="mx-auto max-w-3xl text-center"><div className="flex justify-center"><Label>Core values</Label></div>
        <h2 className="mt-6 text-3xl sm:text-5xl">Empowering Talent & Products Through <span className="em">The Mentor’s Mind</span></h2>
        <p className="mt-5 text-slate">At NOVA AI, engineers, designers, and strategists ship mobile apps and games that captivate users, through continuous research, AI-assisted workflows, and rigorous development.</p></div></Reveal>
      <div className="mt-16 grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
        <div className="grid gap-4">{L.map((c, i) => <Reveal key={c.t} delay={i * 100} className="h-full"><ValueCard {...c} /></Reveal>)}</div>
        <Reveal delay={150} className="h-full"><div className="group relative flex h-full min-h-72 sm:min-h-80 flex-col justify-end overflow-hidden rounded-[20px] border border-transparent bg-obsidian p-8 text-white transition duration-300 hover:-translate-y-1.5 hover:border-cyan">
          <img src="/nova-mark.png" alt="NOVA AI ribbon N logo mark" width={396} height={225} loading="lazy" className="absolute left-1/2 top-[16%] w-3/5 -translate-x-1/2" />
          <p className="tag relative text-cyan">The Mentor’s Mind</p><p className="relative mt-2 text-xl font-semibold leading-snug">Great products come from empowered creators.</p></div></Reveal>
        <div className="grid gap-4">
          <Reveal delay={100} className="h-full"><ValueCard {...R[0]} /></Reveal><Reveal delay={200} className="h-full"><ValueCard icon={GraduationCap} t="Empowering Apprentices" d="Hands-on apprenticeship that turns emerging talent into industry-ready innovators." /></Reveal></div>
      </div>
      <div className="mt-16 sm:mt-24"><h3 className="max-w-2xl text-2xl sm:text-4xl">Empowering Talent Through Technology & Mentorship</h3>
        <p className="mt-4 max-w-2xl text-slate">We bridge proven engineering methodologies with hands-on apprenticeship, resting on three pillars.</p>
        <ul className="mt-10 grid gap-8 border-t border-slate/20 pt-8 md:grid-cols-3">
          {pillars.map(([I, t, d], i) => <li key={t}><Reveal delay={i * 100}><I size={24} strokeWidth={1.5} className="text-sky" aria-hidden /><h4 className="mt-5 font-display text-lg font-semibold">{t}</h4><p className="mt-2 text-sm text-slate">{d}</p></Reveal></li>)}
        </ul></div>
    </Sec>
  )
}

/* ---------- Pipeline ---------- */
const STEPS = [
  { n: '01', t: 'Generate Idea', d: 'Validating the core concept, market opportunity, and user hook.', i: Lightbulb, img: '1580934174026-8142803ebb5b', alt: 'Sticky notes on a wall during an ideation session', chips: ['Concept', 'Market', 'User hook'] },
  { n: '02', t: 'Design', d: 'Crafting wireframes, visual identity, and interactive UI/UX prototypes.', i: PenTool, img: '1522542550221-31fd19575a2d', alt: 'Hand-drawn website wireframe sketches', chips: ['Wireframes', 'Identity', 'Prototype'] },
  { n: '03', t: 'Develop', d: 'Writing clean, scalable, cross-platform code for apps and games.', i: Code2, img: '1515879218367-8466d910aaa4', alt: 'Source code on a computer screen', chips: ['Android', 'iOS', 'Game engine'] },
  { n: '04', t: 'Debug', d: 'Rigorous multi-device QA testing to eliminate crashes and optimize frame rates.', i: Bug, img: '1426024084828-5da21e13f5dc', alt: 'A laptop, tablet and phone side by side for device testing', chips: ['Functional', 'Compatibility', 'Performance'] },
  { n: '05', t: 'Deploy', d: 'Strategic rollout, App Store Optimization (ASO), and post-launch growth scaling.', i: Rocket, img: '1517976487492-5750f3195933', alt: 'A rocket lifting off at launch', chips: ['Rollout', 'ASO', 'Growth'] },
]
export function Pipeline() {
  return (
    <Sec id="pipeline">
      <Reveal><div className="max-w-3xl"><Label>How we work</Label><h2 className="mt-6 text-3xl sm:text-5xl">From Spark to Storefront: Our 5-Step Product Pipeline</h2>
        <p className="mt-5 text-slate">A streamlined, transparent execution framework that takes your mobile app or game from concept to global launch.</p></div></Reveal>
      <ol className="mt-14 space-y-16 sm:space-y-20 lg:space-y-32">
        {STEPS.map((s, i) => (
          <li key={s.n} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
            <Reveal from={i % 2 ? 'right' : 'left'} className={i % 2 ? 'lg:order-2' : ''}>
              <div className="flex items-center gap-4"><span className="font-display text-7xl font-medium tracking-tighter text-ink sm:text-8xl">{s.n}</span><span aria-hidden className="h-px flex-1 bg-slate/25" /></div>
              <p className="tag mt-6 text-slate">Step {s.n} / 05</p>
              <h3 className="mt-2 text-3xl sm:text-4xl">{s.t}</h3><p className="mt-4 max-w-md text-lg text-slate">{s.d}</p></Reveal>
            <Reveal from={i % 2 ? 'left' : 'right'} delay={100} className={i % 2 ? 'lg:order-1' : ''}>
              <div className="group relative flex aspect-[16/9] flex-col justify-between overflow-hidden rounded-[28px] bg-obsidian p-6 text-white transition duration-300 hover:-translate-y-1 sm:aspect-[16/10] sm:p-7">
                <img src={photo(s.img, 1000, 625)} alt={s.alt} loading="lazy" decoding="async" width={1000} height={625} className="absolute inset-0 h-full w-full object-cover text-transparent opacity-80 saturate-[.75] transition duration-700 ease-out group-hover:scale-[1.04]" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-indigo/30" />
                <span className="relative inline-flex size-12 items-center justify-center rounded-full border border-white/25 bg-obsidian/60 backdrop-blur-sm"><s.i size={22} strokeWidth={1.5} className="text-cyan" aria-hidden /></span>
                <ul className="relative flex flex-wrap gap-2">{s.chips.map((c) => <li key={c} className="tag rounded-full border border-white/25 bg-obsidian/50 px-3 py-1.5 text-white/90 backdrop-blur-sm">{c}</li>)}</ul>
              </div></Reveal>
          </li>
        ))}
      </ol>
    </Sec>
  )
}

/* ---------- Products ---------- */
export function Products() {
  const P = [[Gamepad2, 'Game Development', 'Transforming imaginative concepts into addictive, high-retention mobile games.'], [AppleLogo, 'iOS Applications', 'Polished, native-feel iOS products engineered for fluid performance and Apple ecosystem standards.'], [AndroidLogo, 'Android Applications', 'Scalable, lightweight, user-friendly Android applications built for global reach.']] as const
  return (
    <Sec id="products" bg="bg-mist">
      <Reveal><div className="max-w-3xl"><Label>Products</Label><h2 className="mt-6 text-3xl sm:text-5xl">Apps, Games & Interactive Digital Experiences</h2>
        <p className="mt-5 text-slate">Competing at the forefront of the Google Play Store and Apple App Store with original mobile games and high-utility consumer applications.</p></div></Reveal>
      <ul className="mt-14 grid gap-4 md:grid-cols-3">
        {P.map(([I, t, d], i) => <li key={t}><Reveal delay={i * 80} className="h-full"><article className="group h-full rounded-[20px] border border-slate/15 bg-white p-8 transition duration-300 ease-out hover:-translate-y-1.5 hover:border-cyan hover:shadow-[0_24px_48px_-32px_rgba(15,23,42,.35)]"><div className="flex items-center justify-between"><I size={28} strokeWidth={1.5} className="text-sky" aria-hidden /><span className="tag text-slate">0{i + 1}</span></div><h3 className="mt-10 text-2xl sm:mt-16">{t}</h3><p className="mt-3 text-slate">{d}</p></article></Reveal></li>)}
      </ul>
    </Sec>
  )
}

/* ---------- Services (dark accordion) ---------- */
const SERVICES = [
  ['Graphic Design & Game Art', 'Original character design, world-building assets, and expressive visual illustrations crafted with artistic maturity.'],
  ['Industry Level Design', 'Industry-standard design with balanced, engaging progression and challenge curves engineered to maximize user retention.'],
  ['Cross-Platform Game Programming', 'Clean, high-FPS game architecture built for seamless performance across Android and iOS devices.'],
  ['Mobile & Game QA', 'Comprehensive functional, compatibility, and performance testing to guarantee crash-free releases.'],
  ['Game & App UI/UX', 'Eye-catching HUDs, intuitive navigation flows, and conversion-focused mobile interfaces.'],
  ['Marketing & ASO', 'Data-driven keyword optimization, A/B-tested store creatives, and launch campaigns that drive organic installs.'],
]
export function Services() {
  const [open, setOpen] = useState(0)
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = SERVICES.length
    const to = e.key === 'ArrowDown' ? (i + 1) % n : e.key === 'ArrowUp' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1
    if (to < 0) return
    e.preventDefault()
    document.getElementById(`svc-btn-${to}`)?.focus()
  }
  return (
    <section id="services" data-dark className="relative m-3 overflow-hidden rounded-[28px] bg-obsidian py-20 text-white sm:m-4 sm:py-24 lg:py-[120px]"><Stars count={28} />
      <div className={`${wrap} relative`}>
        <Reveal><div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-10 md:flex-row md:items-end">
          <div><Label dark>Services</Label><h2 className="mt-6 text-4xl sm:text-6xl">Our Services</h2></div>
          <p className="max-w-sm text-white/65">End-to-end mobile app and game studio services, from first sketch to store-ready release.</p></div></Reveal>
        <ul>
          {SERVICES.map(([t, d], i) => {
            const on = open === i
            return (
              <li key={t} className="border-b border-white/15">
                <h3 className="!text-base !tracking-normal">
                  <button id={`svc-btn-${i}`} onKeyDown={(e) => onKey(e, i)} aria-expanded={on} aria-controls={`svc-${i}`} onClick={() => setOpen(on ? -1 : i)} className="group -mx-3 flex min-h-20 w-[calc(100%+1.5rem)] items-center gap-4 rounded-xl px-3 py-5 text-left transition-colors duration-200 hover:bg-cyan/[0.06] sm:gap-8">
                    <span className="tag w-8 text-white/50">0{i + 1}</span>
                    <span className={`flex-1 font-display text-xl font-semibold tracking-tight transition-colors sm:text-3xl ${on ? 'text-cyan' : 'text-white group-hover:text-cyan'}`}>{t}</span>
                    <span className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition duration-300 ${on ? 'border-cyan bg-cyan/10 text-cyan' : 'border-white/20 text-white/70 group-hover:border-cyan/60 group-hover:text-cyan'}`}><ChevronDown size={20} aria-hidden className={`transition-transform duration-300 ease-out ${on ? 'rotate-180' : ''}`} /></span>
                  </button>
                </h3>
                <div id={`svc-${i}`} role="region" aria-labelledby={`svc-btn-${i}`} inert={!on} className={`grid transition-all duration-500 ease-out ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden"><p className="max-w-xl pb-8 pl-12 text-white/70 sm:pl-16">{d}</p></div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ---------- Team ---------- */
export function Team() {
  const T = [
    ['Mubashir Tufail', 'Founder', 'Product Vision & Innovation', 'Driving architectural excellence, R&D, and creative execution across every release.'],
    ['Mudassir Tufail', 'Senior Developer', 'Engineering & Architecture', 'Leading engineering and code quality across Android, iOS, and game builds.'],
    ['Mohsin Ali', 'Creative Lead', 'Creative Direction & Ideation', 'Pioneering original game mechanics, imaginative concepts, and user-first experiences.'],
  ]
  return (
    <Sec id="team">
      <Reveal><div className="max-w-3xl"><Label>Team</Label><h2 className="mt-6 text-3xl sm:text-5xl">The Minds Behind NOVA AI</h2>
        <p className="mt-5 text-slate">Led by builders, strategists, and creative mentors dedicated to digital excellence.</p></div></Reveal>
      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {T.map(([n, r, f, d], i) => (
          <li key={n}><Reveal delay={i * 100} className="h-full"><article className="group h-full rounded-[20px] border border-slate/15 bg-white p-8 transition duration-300 ease-out hover:-translate-y-1.5 hover:border-cyan hover:shadow-[0_24px_48px_-32px_rgba(15,23,42,.35)]">
            <span aria-hidden className="inline-flex size-20 items-center justify-center rounded-full bg-obsidian font-display text-2xl font-semibold tracking-tight text-cyan">{n.split(' ').map((w) => w[0]).join('')}</span>
            <h3 className="mt-6 text-xl">{n}</h3><p className="mt-1 font-medium text-ink">{r}</p><p className="tag mt-2" style={{ color: '#0369a1' }}>{f}</p><p className="mt-4 text-sm leading-relaxed text-slate">{d}</p></article></Reveal></li>
        ))}
      </ul>
    </Sec>
  )
}
