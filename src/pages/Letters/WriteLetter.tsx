import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../components/layout/PageWrapper'
import { supabase } from '../../lib/supabase'

function WriteLetter() {
  const navigate = useNavigate()

  const today = new Date().toISOString().split('T')[0]

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [letterDate, setLetterDate] = useState(today)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError('The letter can’t be empty 💛')
      return
    }

    setLoading(true)
    setError(null)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError('You need to be logged in.')
      setLoading(false)
      return
    }

    const email = user.email ?? ''
    const author_role =
      email.includes('anushree') || email.includes('girlfriend')
        ? 'her'
        : 'him'

    const { error } = await supabase.from('letters').insert({
      title: title || null,
      content,
      letter_date: letterDate,
      author_id: user.id,
      author_role,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      navigate('/letters')
    }
  }

  return (
    <PageWrapper backTo='/letters'>
      <h2>Write a letter</h2>

      <label style={{ display: 'block', marginTop: '1rem' }}>
        This letter is for
      </label>

      <input
        type="date"
        value={letterDate}
        onChange={(e) => setLetterDate(e.target.value)}
        style={{ width: '100%', padding: '0.6rem', marginTop: '0.3rem' }}
      />

      <input
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', marginTop: '1rem', padding: '0.6rem' }}
      />

      <textarea
        placeholder="Write from the heart…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
        style={{ width: '100%', marginTop: '1rem', padding: '0.6rem' }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: '1.5rem', cursor: 'pointer' }}
      >
        {loading ? 'Saving…' : 'Save letter'}
      </button>

      {error && <p style={{ marginTop: '1rem', color: '#b00020' }}>{error}</p>}
    </PageWrapper>
  )
}

export default WriteLetter
