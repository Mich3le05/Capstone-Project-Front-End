import { Alert, Button, Container } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const paymentId = location.state?.paymentId

  return (
    <Container className="d-flex flex-column align-items-center p-5 text-center font text-color">
      <Alert variant="warning" className="w-50 titoli-font fw-bold fs-3">
        Pagamento riuscito!
      </Alert>
      <p>Il tuo pagamento è stato elaborato con successo.</p>
      {paymentId && <p>ID pagamento: {paymentId}</p>}
      <Button variant="warning" onClick={() => navigate('/')}>
        Torna alla Home
      </Button>
    </Container>
  )
}

export default PaymentSuccess
