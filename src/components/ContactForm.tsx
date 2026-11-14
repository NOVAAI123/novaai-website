import { useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Pill } from './ui'

type F = { name: string; email: string; company: string; service: string; budget: string; message: string }
const EMPTY: F = { name: '', email: '', company: '', service: '', budget: '', message: '' }
const SERVICES = ['Android App Development', 'iOS App Development', 'Mobile Game Development', 'Graphic Design & Game Art', 'Industry Level Design', 'Mobile & Game QA', 'UI/UX Design', 'Marketing & ASO', 'Apprenticeship / Mentorship']
const BUDGETS = ['Under $10k', '$10k – $50k', '$50k – $150k', '$150k+', 'Not sure yet']

function validate(f: F) {
  const e: Partial<Record<keyof F, string>> = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = 'Enter a valid email address.'
  if (!f.company.trim()) e.company = 'Please enter your company.'
  if (!f.service) e.service = 'Select the service you need.'
  if (f.message.trim().length < 20) e.message = 'Please describe your project in at least 20 characters.'
  return e
}

export default function ContactForm() {
  const [f, setF] = useState<F>(EMPTY)
  const [errs, setErrs] = useState<ReturnType<typeof validate>>({})
  const [state, setState] = useState<'idle' | 'valid' | 'error'>('idle')
  const set = (k: keyof F) => (e: { target: { value: string } }) => { setF({ ...f, [k]: e.target.value }); if (errs[k]) setErrs({ ...errs, [k]: undefined }) }
  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate(f); setErrs(e)
    if (Object.keys(e).length) { setState('error'); document.getElementById(`c-${Object.keys(e)[0]}`)?.focus(); return }
    setState('valid') // No submission service is configured, so nothing is sent.
  }
  const base = 'mt-2 w-full rounded-xl border bg-mist px-4 py-3.5 text-base text-ink outline-none transition duration-200 placeholder:text-slate/70 hover:border-sky/50 focus:border-sky focus:bg-white focus:ring-4 focus:ring-sky/15'
  const Err = ({ k }: { k: keyof F }) => errs[k] ? <p id={`e-${k}`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700"><AlertCircle size={14} />{errs[k]}</p> : null
  const blur = (k: keyof F) => () => { if (k !== 'budget') setErrs((prev) => ({ ...prev, [k]: validate(f)[k] })) }
  const REQUIRED: (keyof F)[] = ['name', 'email', 'company', 'service', 'message']
  const p = (k: keyof F) => ({ id: `c-${k}`, value: f[k], onChange: set(k), onBlur: blur(k), 'aria-required': REQUIRED.includes(k) || undefined, 'aria-invalid': !!errs[k], 'aria-describedby': errs[k] ? `e-${k}` : undefined, className: `${base} ${errs[k] ? 'border-red-500 bg-red-50/50 focus:border-red-500 focus:ring-red-500/15' : 'border-slate/25'}` })

  if (state === 'valid') return (
    <div role="status" className="rounded-[20px] border border-slate/10 bg-white p-8">
      <CheckCircle2 className="text-sky" size={28} aria-hidden />
      <h3 className="mt-4 text-2xl">Your details look good.</h3>
      <p className="mt-3 text-slate">This form is not yet connected to a submission service, so <strong className="text-ink">nothing has been sent</strong>. Once a backend or email service is configured, enquiries will reach the NOVA AI team.</p>
      <div className="mt-6"><Pill variant="dark" className="w-full sm:w-auto" onClick={() => { setF(EMPTY); setState('idle') }}>Edit details</Pill></div>
    </div>
  )
  return (
    <form onSubmit={submit} noValidate aria-label="Project enquiry" className="grid gap-6 rounded-[20px] border border-slate/15 bg-white p-6 sm:grid-cols-2 sm:p-10">
      <p className="text-sm text-slate sm:col-span-2">All fields are required except budget.</p>
      {state === 'error' && Object.keys(errs).some((k) => errs[k as keyof F]) && (
        <div role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 sm:col-span-2">
          <p className="flex items-center gap-2 font-semibold"><AlertCircle size={16} />Please fix the following:</p>
          <ul className="mt-2 list-disc space-y-1 pl-9">{(Object.keys(errs) as (keyof F)[]).filter((k) => errs[k]).map((k) => <li key={k}><a href={`#c-${k}`} onClick={(e) => { e.preventDefault(); document.getElementById(`c-${k}`)?.focus() }} className="underline">{errs[k]}</a></li>)}</ul>
        </div>
      )}
      <div><label htmlFor="c-name" className="text-sm font-semibold text-ink">Name</label><input {...p('name')} autoComplete="name" /><Err k="name" /></div>
      <div><label htmlFor="c-email" className="text-sm font-semibold text-ink">Business email</label><input {...p('email')} type="email" autoComplete="email" /><Err k="email" /></div>
      <div><label htmlFor="c-company" className="text-sm font-semibold text-ink">Company</label><input {...p('company')} autoComplete="organization" /><Err k="company" /></div>
      <div><label htmlFor="c-service" className="text-sm font-semibold text-ink">Service required</label><select {...p('service')}><option value="">Select a service</option>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select><Err k="service" /></div>
      <div className="sm:col-span-2"><label htmlFor="c-budget" className="text-sm font-semibold text-ink">Project budget <span className="text-slate">(optional)</span></label><select {...p('budget')}><option value="">Prefer not to say</option>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select></div>
      <div className="sm:col-span-2"><label htmlFor="c-message" className="text-sm font-semibold text-ink">Project description</label><textarea {...p('message')} rows={5} placeholder="What are you building?" /><div className="mt-1.5 flex justify-between text-xs text-slate"><span>At least 20 characters</span><span aria-hidden>{f.message.trim().length}</span></div><Err k="message" /></div>
      <div className="sm:col-span-2"><Pill type="submit" variant="cyan" className="w-full sm:w-auto">Submit enquiry</Pill></div>
    </form>
  )
}
