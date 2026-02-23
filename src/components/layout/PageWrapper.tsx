import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type PageWrapperProps = {
  children: ReactNode
  backTo?: string
}

function PageWrapper({ children, backTo }: PageWrapperProps) {
  const navigate = useNavigate()

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '4rem auto',
        padding: '0 1rem',
      }}
    >
      <div className="card">
        {backTo && (
          <button
            onClick={() => navigate(backTo)}
            style={{
              marginBottom: '1.5rem',
              background: 'transparent',
              color: 'var(--accent)',
              padding: 0,
              cursor: 'pointer'
            }}
          >
            ← Back
          </button>
        )}

        {children}
      </div>
    </div>
  )
}

export default PageWrapper
