export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">About Layover</h1>

      <div className="flex flex-col gap-8 text-slate-300 leading-relaxed">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-100">What this is</h2>
          <p>
            Layover generates specific, timed itineraries for travelers who want to leave
            the airport during a stopover. Not a list of tourist tips — a real schedule
            with transit times, costs, and a hard leave-by time at every step.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-100">How itineraries are built</h2>
          <p>
            Each itinerary is researched and written manually. Transit times are based on
            real routes — specific trains, buses, or walking paths — not estimates. Every
            step includes how long you&apos;ll spend there and how long it takes to get there.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-100">The logistics block</h2>
          <p>
            Before the itinerary, we surface the things that can derail a layover: visa
            requirements, bag storage options, and what to expect clearing customs on the
            way back in. This is what makes the recommendation trustworthy.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-100">Coverage status</h2>
          <p>
            Airports are marked <span className="text-emerald-400">Full Coverage</span>,{' '}
            <span className="text-amber-400">Limited Data</span>, or{' '}
            <span className="text-slate-500">Not Supported</span>. Full Coverage means
            we have multiple itineraries across different layover lengths. Limited Data
            means we have some information but it may be incomplete or outdated.
          </p>
        </section>
      </div>
    </div>
  )
}
