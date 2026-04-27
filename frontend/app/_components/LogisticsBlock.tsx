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
    <div className="rounded-xl border border-amber-800/50 bg-amber-900/10 p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-400">
        Before you go
      </h2>
      <div className="flex flex-col gap-4">
        {sections.map((s) => (
          <div key={s.label}>
            <p className="mb-1 text-xs font-semibold text-amber-500">{s.label}</p>
            <p className="text-sm leading-relaxed text-slate-300">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
