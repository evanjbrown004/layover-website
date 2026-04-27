import type { Airport } from '@/lib/api'

const labels = {
  full: 'Full Coverage',
  limited: 'Limited Data',
  unsupported: 'Not Supported',
}

const styles = {
  full: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  limited: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  unsupported: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
}

export default function CoverageBadge({ status }: { status: Airport['coverage_status'] }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap ${styles[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === 'full' ? 'bg-emerald-400' : status === 'limited' ? 'bg-amber-400' : 'bg-slate-400'}`} />
      {labels[status]}
    </span>
  )
}
