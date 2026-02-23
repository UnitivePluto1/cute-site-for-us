import { useNavigate } from 'react-router-dom'

function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="welcome-wrapper">
      <div className="welcome-content">
        <h1 className="welcome-title">
          Made for us and only us &lt;3
        </h1>

        <button
          className="enter-button"
          onClick={() => navigate('/login')}
        >
          Enter
        </button>
      </div>
    </div>
  )
}

export default Welcome
