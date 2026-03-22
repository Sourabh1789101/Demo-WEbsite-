import { useMemo, useState } from 'react'
import ClawEcosystemGuide from './docs/claw-ecosystem-guide'
import NexaFlowUserManual from './docs/nexaflow-user-manual'

type ManualKey = 'claw' | 'nexaflow'

function App() {
  const [activeManual, setActiveManual] = useState<ManualKey>('claw')

  const ActiveManual = useMemo(() => {
    return activeManual === 'claw' ? ClawEcosystemGuide : NexaFlowUserManual
  }, [activeManual])

  return (
    <div>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          display: 'flex',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          background: '#0f172a',
          borderBottom: '1px solid #334155',
        }}
      >
        <button
          onClick={() => setActiveManual('claw')}
          style={{
            border: '1px solid #475569',
            background: activeManual === 'claw' ? '#1d4ed8' : '#1e293b',
            color: '#e2e8f0',
            borderRadius: 8,
            padding: '0.5rem 0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Claw Ecosystem Guide
        </button>
        <button
          onClick={() => setActiveManual('nexaflow')}
          style={{
            border: '1px solid #475569',
            background: activeManual === 'nexaflow' ? '#1d4ed8' : '#1e293b',
            color: '#e2e8f0',
            borderRadius: 8,
            padding: '0.5rem 0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          NexaFlow User Manual
        </button>
      </header>

      <ActiveManual />
    </div>
  )
}

export default App
