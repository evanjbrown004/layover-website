export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-white">About Layover</h1>
      <p className="mb-10 text-slate-400">How it works and what to expect.</p>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-base font-semibold text-sky-400">What this is</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Layover generates specific, timed itineraries for travelers who want to leave
            the airport during a stopover. Not a list of tourist tips — a real schedule
            with transit times, costs, and a hard leave-by time at every step.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-base font-semibold text-sky-400">How itineraries are built</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Each itinerary is researched and written manually. Transit times are based on
            real routes — specific trains, buses, or walking paths — not estimates. Every
            step includes how long you&apos;ll spend there and how long it takes to get there.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-base font-semibold text-sky-400">The logistics block</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Before the itinerary, we surface the things that can derail a layover: visa
            requirements, bag storage options, and what to expect clearing customs on the
            way back in. This is what makes the recommendation trustworthy.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="mb-3 text-base font-semibold text-sky-400">Coverage status</h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-300">
            Airports are labeled based on how complete our data is:
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Full Coverage
              </span>
              <p className="text-sm text-slate-300">Multiple itineraries across different layover lengths, fully researched.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Limited Data
              </span>
              <p className="text-sm text-slate-300">Some information available but may be incomplete or outdated.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex items-center gap-1.5 rounded-full border border-slate-500/30 bg-slate-500/10 px-3 py-1 text-xs font-medium text-slate-400 whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                Not Supported
              </span>
              <p className="text-sm text-slate-300">No itineraries available — layovers here are short or the airport is remote.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
