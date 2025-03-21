import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Toast, ToastContainer } from 'react-bootstrap'

const LogoutButton = () => {
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    // Rimuovi il token da localStorage
    localStorage.removeItem('token')

    // Mostra il toast di successo
    setShowToast(true)

    // Reindirizza al login dopo 2 secondi
    setTimeout(() => {
      navigate('/login')
    }, 2000) // Attendi 2 secondi prima del redirect
  }

  return (
    <>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>

      {/* Toast per mostrare il messaggio di successo */}
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
