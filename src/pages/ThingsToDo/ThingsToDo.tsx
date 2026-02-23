import { useEffect, useState } from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import { useAuth } from '../../lib/auth/useAuth'
import { supabase } from '../../lib/supabase'

type Todo = {
    id: string
    text: string
    added_by: string
    is_completed: boolean
    completed_at: string | null
}

function ThingsToDo() {
    const { user } = useAuth()
    const [items, setItems] = useState<Todo[]>([])
    const [newItem, setNewItem] = useState('')

    
    useEffect(() => {
        const fetchItems = async () => {
        const { data, error } = await supabase
            .from('things_to_do')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error) {
            setItems(data || [])
        }
        }

        fetchItems()
    }, [])

    const handleAdd = async () => {
        if (!newItem.trim() || !user) return

        const { data, error } = await supabase
        .from('things_to_do')
        .insert({
            text: newItem,
            added_by: user.id,
        })
        .select()
        .single()

        if (!error && data) {
        setItems((prev) => [data, ...prev])
        setNewItem('')
        }
    }

    const toggleComplete = async (item: Todo) => {
        if (!user) return

        const { data, error } = await supabase
        .from('things_to_do')
        .update({
            is_completed: !item.is_completed,
            completed_at: !item.is_completed
            ? new Date().toISOString()
            : null,
        })
        .eq('id', item.id)
        .select()
        .single()

        if (!error && data) {
        setItems((prev) =>
            prev.map((i) => (i.id === data.id ? data : i))
        )
        }
    }

    const handleDelete = async (item: Todo) => {
    if (!user || item.added_by !== user.id) return

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this? 🥺"
    )

    if (!confirmDelete) return

    const { error } = await supabase
        .from('things_to_do')
        .delete()
        .eq('id', item.id)

    if (!error) {
        setItems((prev) =>
            prev.filter((i) => i.id !== item.id)
        )
    }
}

    return (
        <PageWrapper backTo='/menu'>
        <h2>Things To Do Together 💫</h2>

        <div className="section stack-md">
            <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add something we should do..."
            style={{ width: '100%', padding: '0.6rem' }}
            />
            <button
            onClick={handleAdd}
            style={{
                marginTop: '0.8rem',
                cursor: 'pointer',
                borderRadius: '24px'
            }}
            >
            Add
            </button>
        </div>

        <div className="section stack-md">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="todo-row"
                    onClick={() => toggleComplete(item)}
                    style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                            type="checkbox"
                            checked={item.is_completed}
                            readOnly
                        />
                        <span
                            style={{
                                marginLeft: '0.6rem',
                                textDecoration: item.is_completed
                                    ? 'line-through'
                                    : 'none',
                            }}
                        >
                            {item.text}
                        </span>
                    </div>

                    {item.added_by === user?.id && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation() // prevent row click
                                handleDelete(item)
                            }}
                        >
                            ✕
                        </button>
                    )}
                </div>
            ))}
        </div>
        </PageWrapper>
    )
}

export default ThingsToDo
