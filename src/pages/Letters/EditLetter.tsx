import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageWrapper from '../../components/layout/PageWrapper'
import { supabase } from '../../lib/supabase'

function EditLetter() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchLetter = async () => {
        const { data, error } = await supabase
            .from('letters')
            .select('title, content')
            .eq('id', id)
            .single()

        if (error) setError(error.message)
        else {
            setTitle(data.title ?? '')
            setContent(data.content)
        }

        setLoading(false)
        }

        fetchLetter()
    }, [id])

    const handleSave = async () => {
        if (!content.trim()) {
        setError('Letter cannot be empty 💛')
        return
        }

        const { error } = await supabase
        .from('letters')
        .update({ title: title || null, content })
        .eq('id', id)

        if (error) setError(error.message)
        else navigate('/letters')
    }

    if (loading) return <p>Loading…</p>
    if (error) return <p style={{ color: 'red' }}>{error}</p>

    return (
        <PageWrapper backTo='/letters'>
        <h2>Edit letter</h2>

        <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            style={{ width: '100%', marginTop: '1rem', padding: '0.6rem' }}
        />

        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            style={{ width: '100%', marginTop: '1rem', padding: '0.6rem' }}
        />

        <button onClick={handleSave} style={{ marginTop: '1.5rem' }}>
            Save changes
        </button>
        </PageWrapper>
    )
}

export default EditLetter
