import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setError(null)
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        })

        setLoading(false)

        if (error) {
        setError('That didn’t work. Try again 💛')
        } else {
        navigate('/menu')
        }
    }

return (
    <div className="login-wrapper">
        <div className="login-content">
            <button
            className="login-back"
            onClick={() => navigate('/')}
            >
            ← Back
            </button>

        <h2 className="login-title">Welcome 💛</h2>

        <p className="login-subtitle">
        </p>

        <div className="login-form">
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button
            onClick={handleLogin}
            disabled={loading}
            className="login-button"
            >
            {loading ? 'Checking…' : 'Login'}
            </button>
        </div>

        {error && (
            <p className="login-error">{error}</p>
        )}
        </div>
    </div>
)

}

export default Login
