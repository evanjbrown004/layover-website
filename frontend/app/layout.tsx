import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Layover — Make the most of your time',
  description: 'Timed, realistic layover itineraries with logistics warnings built in.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800">
          <nav className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Layover
            </Link>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="/airports" className="hover:text-slate-100 transition-colors">
                Airports
              </Link>
              <Link href="/about" className="hover:text-slate-100 transition-colors">
                About
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
