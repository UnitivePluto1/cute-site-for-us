import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../components/layout/PageWrapper'
import { supabase } from '../../lib/supabase'

type Letter = {
  id: string
  title: string | null
  letter_date: string
  author_role: string
}

function Letters() {
  const navigate = useNavigate()
  const [letters, setLetters] = useState<Letter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchLetters = async () => {
      const { data, error } = await supabase
        .from('letters')
        .select('id, title, letter_date, author_role')
        .order('letter_date', { ascending: false })

      if (error) setError(error.message)
      else setLetters(data || [])

      setLoading(false)
    }

    fetchLetters()
  }, [])

  if (loading) return <p>Loading letters…</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this letter? 💔")

  if (!confirmDelete) return

  const { error } = await supabase
    .from('letters')
    .delete()
    .eq('id', id)

  if (!error) {
    setLetters((prev) => prev.filter((letter) => letter.id !== id))
  } else {
    console.error(error.message)
  }
}


return (
  <PageWrapper backTo='/menu'>

    {/* HEADER */}
    <div className="letters-header">
      <h2 className="letters-title">Our own Personal Folder 🫶💌</h2>
    </div>

    {/* ACTION ROW */}
    <div className="letters-actions">
      <button
        className="write-letter-btn"
        onClick={() => navigate('/letters/new')}
      >
        + Write Letter
      </button>
    </div>

    {/* INNER CONTAINER */}
    <div className="letters-container">
      {letters.length === 0 ? (
        <p className="empty-state">
          No letters yet 💛
        </p>
      ) : (
        letters.map((letter) => (
          <div key={letter.id} className="letter-item">
            
            <div
              className="letter-row"
              onClick={() => navigate(`/letters/${letter.id}`)}
            >
              <div className="letter-info">
                <h3>{letter.title || 'Untitled letter'}</h3>
                <p className="letter-from">
                  ~ {letter.author_role === 'him' ? "from him 🤍" : "from her 💌"}
                </p>
                <p className="letter-date">
                  {new Date(letter.letter_date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                  
                </p>
                
              </div>

              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(letter.id)
                }}
              >
                ✕
              </button>

            </div>

          </div>
        ))
      )}
    </div>

  </PageWrapper>
)


}

export default Letters
