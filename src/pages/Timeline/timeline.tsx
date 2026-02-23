import { useEffect, useState } from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import { supabase } from '../../lib/supabase'

type TimelineEntry = {
    id: string
    title: string
    description: string
    event_date: string
}

function Timeline() {
    const [entries, setEntries] = useState<TimelineEntry[]>([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [eventDate, setEventDate] = useState(
        new Date().toISOString().split('T')[0]
    )
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchEntries = async () => {
        const { data, error } = await supabase
            .from('timeline_entries')
            .select('*')
            .order('event_date', { ascending: true })

        if (error) setError(error.message)
        else setEntries(data || [])

        setLoading(false)
        }

        fetchEntries()
    }, [])

    const handleAdd = async () => {
        if (!title.trim() || !description.trim()) return

        const { data, error } = await supabase
        .from('timeline_entries')
        .insert({
            title,
            description,
            event_date: eventDate,
        })
        .select()
        .single()

        if (!error && data) {
            setEntries((prev) =>
                [...prev, data].sort(
                (a, b) =>
                new Date(a.event_date).getTime() -
                new Date(b.event_date).getTime()
            )
        )
        setTitle('')
        setDescription('')
        }
    }

    if (loading) return <p>Loading timeline…</p>
    if (error) return <p style={{ color: 'red' }}>{error}</p>

    return (
        <PageWrapper backTo='/menu'>
        <h2 className='timeline-top'>How things have been so far ;) 🤭</h2>

        {/* Add new entry */}
        <div style={{ marginTop: '2rem' }}>
            <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            style={{ padding: '0.4rem' }}
            />

            <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
                display: 'block',
                width: '100%',
                marginTop: '0.6rem',
                padding: '0.6rem',
            }}
            />

            <textarea
            placeholder="What happened?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{
                display: 'block',
                width: '100%',
                marginTop: '0.6rem',
                padding: '0.6rem',
            }}
            />

            <button
            onClick={handleAdd}
            style={{ marginTop: '0.8rem', cursor: 'pointer' }}
            >
            Add to timeline
            </button>
        </div>

        <div className="timeline-container">
            {entries.map((entry, index) => (
                <div
                key={entry.id}
                className={`timeline-item ${
                    index % 2 === 0 ? 'left' : 'right'
                }`}
                >
                <div className="timeline-content">
                    <h3 className="timeline-title">
                    {entry.title}
                    </h3>

                    <div className="timeline-placard">
                    <p>{entry.description}</p>
                    <small>
                        {new Date(entry.event_date).toDateString()}
                    </small>
                    </div>
                </div>
                </div>
            ))}
        </div>
        </PageWrapper>
    )
}

export default Timeline
