import type { Logistics } from '@/lib/api'
import { nullStr } from '@/lib/api'

export default function LogisticsBlock({ logistics }: { logistics: Logistics }) {
  const sections = [
    { label: 'Visa & Entry', text: nullStr(logistics.visa_notes) },
    { label: 'Bag Storage', text: nullStr(logistics.bag_storage_notes) },
    { label: 'Re-entry', text: nullStr(logistics.reentry_notes) },
  ].filter((s) => s.text)

  if (sections.length === 0) return null

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-amber-400">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-amber-400">Before you go</h2>
      </div>
      <div className="flex flex-col gap-4">
        {sections.map((s) => (
          <div key={s.label}>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-500">{s.label}</p>
            <p className="text-sm leading-relaxed text-slate-200">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
