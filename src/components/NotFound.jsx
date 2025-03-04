import { Container, Alert, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container className="text-center py-5">
      <Alert variant="danger">Pagina non trovata!</Alert>
      <Button
        variant="primary"
        onClick={() => {
          navigate('/')
        }}
      >
        Torna alla home
      </Button>
    </Container>
  )
}

export default NotFound
