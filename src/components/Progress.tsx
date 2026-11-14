import { useEffect, useRef } from 'react'

/** Thin reading-progress line. Updates a single transform via rAF; no React re-renders. */
export default function Progress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.current?.style.setProperty('transform', `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`)
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update) }
    update(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  return <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-0.5"><div ref={bar} className="h-full origin-left scale-x-0 bg-cyan will-change-transform" /></div>
}
