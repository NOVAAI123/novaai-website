import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

export function Reveal({ children, delay = 0, className = '', from = 'up' }: { children: ReactNode; delay?: number; className?: string; from?: 'up' | 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${from === 'left' ? 'reveal-left' : from === 'right' ? 'reveal-right' : ''} ${className}`} style={{ ['--d' as string]: `${delay}ms` }}>{children}</div>
}

export function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`tag flex items-center gap-2 ${dark ? 'text-white/70' : 'text-slate'}`}><span aria-hidden className="size-1.5 bg-cyan" />{children}</p>
}

export function Pill({ href, children, variant = 'white', type, onClick, disabled, className = '' }: { className?: string; href?: string; children: ReactNode; variant?: 'white' | 'cyan' | 'dark'; type?: 'submit' | 'button'; onClick?: () => void; disabled?: boolean }) {
  const v = { white: 'bg-white text-obsidian hover:bg-cyan', cyan: 'bg-cyan text-obsidian hover:bg-white', dark: 'bg-obsidian text-white hover:bg-sky' }[variant]
  const cls = `group inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-6 text-sm font-semibold transition duration-300 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-60 ${v} ${className}`
  const inner = <>{children}<ArrowUpRight size={15} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></>
  return href ? <a href={href} className={cls}>{inner}</a> : <button type={type ?? 'button'} onClick={onClick} disabled={disabled} className={cls}>{inner}</button>
}

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img src="/nova-mark.png" alt="" width={50} height={28} className="h-7 w-auto" />
      <span className={`font-display text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>NOVA AI</span>
    </span>
  )
}

/** Ambient starfield + faint cyan constellation lines; fills its relatively-positioned parent. */
export function Stars({ count = 60 }: { count?: number }) {
  const stars = useMemo(() => Array.from({ length: count }, (_, i) => {
    const r = (n: number) => ((Math.sin(i * 999 + n) * 10000) % 1 + 1) % 1
    return { x: r(1) * 100, y: r(2) * 100, s: 1 + r(3) * 1.3, t: 3 + r(4) * 5, d: r(5) * 5 }
  }), [count])
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g stroke="#22d3ee" strokeOpacity=".12" strokeWidth=".12" fill="none" vectorEffect="non-scaling-stroke">
          <polyline points="6,22 16,34 28,28 38,44" /><polyline points="62,10 74,20 88,14 95,30" /><polyline points="60,86 72,76 84,82 94,70" />
        </g>
      </svg>
      {stars.map((s, i) => <span key={i} className="star absolute rounded-full bg-white" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, ['--t' as string]: `${s.t}s`, ['--dl' as string]: `${s.d}s` }} />)}
    </div>
  )
}

/** Counts from 0 to `to` the first time it scrolls into view. Final value is always in the DOM for screen readers and reduced-motion users. */
export function CountUp({ to, suffix = '', duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const shown = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current, out = shown.current
    if (!el || !out) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { out.textContent = `${to}${suffix}`; return }
    let raf = 0
    const run = () => {
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration)
        out.textContent = `${Math.round(to * (1 - Math.pow(1 - p, 3)))}${suffix}` // ease-out cubic
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); run() } }, { threshold: 0.6 })
    out.textContent = `0${suffix}`
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to, suffix, duration])
  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      <span className="invisible" aria-hidden>{to}{suffix}</span>
      <span ref={shown} aria-hidden className="absolute inset-0">{to}{suffix}</span>
      <span className="sr-only">{to}{suffix}</span>
    </span>
  )
}
