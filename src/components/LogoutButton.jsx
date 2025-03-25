import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Toast, ToastContainer } from 'react-bootstrap'

const LogoutButton = () => {
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')

    setShowToast(true)

    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }

  return (
    <>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Body>Logout eseguito correttamente!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

export default LogoutButton
