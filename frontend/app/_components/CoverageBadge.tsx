import type { Airport } from '@/lib/api'

const labels = {
  full: 'Full Coverage',
  limited: 'Limited Data',
  unsupported: 'Not Supported',
}

const styles = {
  full: 'bg-emerald-900/50 text-emerald-400 border-emerald-800',
  limited: 'bg-amber-900/50 text-amber-400 border-amber-800',
  unsupported: 'bg-slate-800 text-slate-500 border-slate-700',
}

export default function CoverageBadge({ status }: { status: Airport['coverage_status'] }) {
  return (
    <span className={`inline-block rounded-full border px-3 py-0.5 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
