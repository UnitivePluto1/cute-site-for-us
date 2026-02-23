import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageWrapper from '../../components/layout/PageWrapper'
import { supabase } from '../../lib/supabase'

function LetterDetail() {
  const { id } = useParams()
  // const navigate = useNavigate()

  const [title, setTitle] = useState<string | null>(null)
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLetter = async () => {
      const { data, error } = await supabase
        .from('letters')
        .select('title, content, letter_date')
        .eq('id', id)
        .single()

      if (!error && data) {
        setTitle(data.title)
        setContent(data.content)
        setDate(data.letter_date)
      }

      setLoading(false)
    }

    fetchLetter()
  }, [id])

  if (loading) return <p>Opening letter…</p>

  return (
    <PageWrapper backTo='/letters'>
      <h2 style={{ marginTop: '1.5rem' }}>
        {title || 'Untitled letter'}
      </h2>

      <div style={{ color: '#666', marginBottom: '1.5rem' }}>
        {new Date(date).toDateString()}
      </div>

      <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
    </PageWrapper>
  )
}

export default LetterDetail
