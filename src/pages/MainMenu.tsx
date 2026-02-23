import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/layout/PageWrapper'
import { supabase } from '../lib/supabase'

function MainMenu() {
    const navigate = useNavigate()
    const [greeting, setGreeting] = useState('Welcome')

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
        const email = data.user?.email
        if (!email) return

        if (email.includes('anushree') || email.includes('TheGirlfriend')) {
            setGreeting('Welcome MiLady')
        } else {
            setGreeting('Welcome Sir')
        }
        })
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    return (
        <PageWrapper>

        <div className="menu-top">
            <button className="logout-btn" onClick={handleLogout}>
            ← Log out
            </button>
        </div>

        <h1 className="menu-title">{greeting} 💛</h1>

        <div className="menu-grid">
            <button onClick={() => navigate('/letters')} className="menu-card">
            📁 Letter Archive
            </button>

            <button onClick={() => navigate('/timeline')} className="menu-card">
            📅 Our Timeline
            </button>

            <button onClick={() => navigate('/events')} className="menu-card">
            💘 Something Special?
            </button>

            <button onClick={() => navigate('/things')} className="menu-card">
            💑 Things To Do Together
            </button>
        </div>

        </PageWrapper>

    )
}

export default MainMenu