import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
  Spinner,
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { clearCartAction } from '../redux/actions/types'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const CheckoutForm = ({ total }) => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    const response = await fetch(
      `http://localhost:8080/api/payments/create-payment-intent?amount=${
        total * 100
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: total * 100, email: email }),
      }
    )

    const { clientSecret } = await response.json()

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })

    if (result.error) {
      alert(result.error.message)
    } else {
      const paymentData = {
        paymentId: result.paymentIntent.id,
        email: email,
      }

      await fetch('http://localhost:8080/api/payments/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })

      dispatch(clearCartAction())

      navigate('/payment-success', {
        state: { paymentId: result.paymentIntent.id },
      })
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 font">
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Inserisci la tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <CardElement className="p-2 border rounded" />
      <Button
        type="submit"
        variant="success"
        className="mt-3 w-100"
        disabled={!stripe || loading || !email}
      >
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <>Paga € {total}</>
        )}
      </Button>
    </form>
  )
}

const Checkout = () => {
  const location = useLocation()
  const total = location.state?.total || 0

  return (
    <Container className="py-5 font text-color">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h4 className="mb-3">Pagamento con Carta</h4>
              <Elements stripe={stripePromise}>
                <CheckoutForm total={total} />
              </Elements>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Checkout
