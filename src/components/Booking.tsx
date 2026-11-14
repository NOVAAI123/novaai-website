import { useMemo, useState } from 'react'
import { CalendarClock, Check } from 'lucide-react'
import { Pill } from './ui'

// Editable scheduling rules. All times are Hong Kong Time (UTC+8).
const EMAIL = 'info@novaaimentorsmind.com'
const SLOTS = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00']
const DAYS_AHEAD = 10 // number of weekdays offered

/** Next N weekdays starting tomorrow, based on today's date in Hong Kong. */
function useDates() {
  return useMemo(() => {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Hong_Kong', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).split('-').map(Number)
    const out: { key: string; dow: string; day: string; long: string }[] = []
    const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]))
    while (out.length < DAYS_AHEAD) {
      d.setUTCDate(d.getUTCDate() + 1)
      const wd = d.getUTCDay()
      if (wd === 0 || wd === 6) continue
      const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...o }).format(d)
      out.push({ key: d.toISOString().slice(0, 10), dow: f({ weekday: 'short' }), day: f({ day: 'numeric' }), long: f({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) })
    }
    return out
  }, [])
}

export default function Booking() {
  const dates = useDates()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)
  const chosen = dates.find((d) => d.key === date)

  const request = () => {
    if (!chosen || !time) return
    const subject = `Consultation request: ${chosen.long}, ${time} HKT`
    const body = `Hello NOVA AI,\n\nI would like to book a consultation.\n\nPreferred time: ${chosen.long} at ${time} Hong Kong Time (UTC+8)\nName: ${name || '[your name]'}\n\nWhat I would like to discuss:\n\n`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const chip = (on: boolean) => `min-h-11 rounded-xl border text-sm font-medium transition duration-200 active:scale-[0.97] ${on ? 'border-obsidian bg-obsidian text-white' : 'border-slate/25 bg-white text-ink hover:border-sky hover:text-sky'}`

  return (
    <div className="rounded-[20px] border border-slate/15 bg-white p-7 transition duration-300 hover:border-cyan hover:shadow-[0_24px_48px_-32px_rgba(15,23,42,.35)]">
      <CalendarClock className="text-sky" aria-hidden />
      <h3 className="mt-4 text-xl">Book a consultation</h3>
      <p className="mt-2 text-sm text-slate">Choose a preferred time. We will confirm by email. Times are in Hong Kong Time (UTC+8).</p>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold">1. Pick a day</legend>
        <div className="mt-2 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Preferred day">
          {dates.map((d) => (
            <button key={d.key} type="button" role="radio" aria-checked={date === d.key} aria-label={d.long} onClick={() => { setDate(d.key); setSent(false) }} className={`${chip(date === d.key)} flex flex-col items-center justify-center py-1.5 leading-tight`}>
              <span className="text-[11px] uppercase opacity-70">{d.dow}</span><span>{d.day}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold">2. Pick a time <span className="font-normal text-slate">(HKT)</span></legend>
        <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Preferred time">
          {SLOTS.map((t) => <button key={t} type="button" role="radio" aria-checked={time === t} onClick={() => { setTime(t); setSent(false) }} className={chip(time === t)}>{t}</button>)}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor="b-name" className="text-sm font-semibold">3. Your name <span className="font-normal text-slate">(optional)</span></label>
        <input id="b-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="mt-2 w-full rounded-xl border border-slate/25 bg-mist px-4 py-3 text-base outline-none transition hover:border-sky/50 focus:border-sky focus:bg-white focus:ring-4 focus:ring-sky/15" />
      </div>

      <p className="mt-5 min-h-6 text-sm text-ink" aria-live="polite">
        {chosen && time ? <span className="inline-flex items-center gap-2"><Check size={16} className="text-sky" aria-hidden />{chosen.long}, {time} HKT</span> : <span className="text-slate">Select a day and time to continue.</span>}
      </p>
      <div className="mt-3"><Pill variant="dark" onClick={request} disabled={!chosen || !time} className="w-full sm:w-auto">Request this time</Pill></div>

      {sent && (
        <p role="status" className="mt-4 rounded-xl border border-slate/15 bg-mist p-4 text-sm text-slate">
          Your email app should have opened with the request ready to send. This is a request, not a confirmed booking. If nothing opened, email us at <a href={`mailto:${EMAIL}`} className="font-medium text-ink underline">{EMAIL}</a>.
        </p>
      )}
    </div>
  )
}
