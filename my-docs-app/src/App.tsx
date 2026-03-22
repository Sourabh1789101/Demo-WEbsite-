import { lazy, Suspense, useState } from 'react'

const DOCS = [
  { key: 'claw',       label: 'Claw Ecosystem Guide',   component: lazy(() => import('./docs/claw-ecosystem-guide')) },
  { key: 'nexaflow',   label: 'NexaFlow User Manual',    component: lazy(() => import('./docs/nexaflow-user-manual')) },
  { key: 'nemoclaw',   label: 'NemoClaw Guide',          component: lazy(() => import('./docs/nemoclaw-guide')) },
  { key: 'claw2026',   label: 'Claw Ecosystem 2026',     component: lazy(() => import('./docs/claw-ecosystem-2026')) },
  { key: 'claw2026v2', label: 'Claw Ecosystem 2026 V2',  component: lazy(() => import('./docs/claw-ecosystem-2026-v2')) },
  { key: 'mirofish',   label: 'MiroFish',                component: lazy(() => import('./docs/mirofish-website')) },
] as const

type DocKey = typeof DOCS[number]['key']

function App() {
  const [active, setActive] = useState<DocKey>('claw')
  const ActiveDoc = DOCS.find(d => d.key === active)!.component

  return (
    <div className="flex flex-col h-dvh bg-slate-900">

      {/* ── Mobile header: title + select dropdown ── */}
      <header className="sm:hidden shrink-0 flex items-center gap-3 px-4 py-3 bg-slate-900 border-b border-slate-700">
        <span className="text-slate-200 font-bold text-sm tracking-wide shrink-0">Docs Hub</span>
        <select
          value={active}
          onChange={e => setActive(e.target.value as DocKey)}
          title="Select document"
          aria-label="Select document"
          className="flex-1 min-w-0 bg-slate-800 border border-slate-600 text-slate-200 text-sm font-medium rounded-lg px-3 py-2 cursor-pointer outline-none focus:ring-2 focus:ring-blue-600"
        >
          {DOCS.map(d => (
            <option key={d.key} value={d.key}>{d.label}</option>
          ))}
        </select>
      </header>

      {/* ── Desktop header: scrollable tab bar ── */}
      <header className="hidden sm:flex shrink-0 gap-2 px-4 py-3 bg-slate-900 border-b border-slate-700 overflow-x-auto [scrollbar-width:none]">
        {DOCS.map(d => (
          <button
            key={d.key}
            type="button"
            onClick={() => setActive(d.key)}
            className={`shrink-0 border border-slate-600 rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 whitespace-nowrap cursor-pointer transition-colors ${
              active === d.key ? 'bg-blue-700 border-blue-600' : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            {d.label}
          </button>
        ))}
      </header>

      {/* ── Content ── */}
      <main className="flex-1 overflow-hidden transform-[translateZ(0)]">
        <Suspense
          fallback={
            <div className="h-full flex items-center justify-center text-slate-400 text-sm">
              Loading…
            </div>
          }
        >
          <ActiveDoc />
        </Suspense>
      </main>

    </div>
  )
}

export default App
