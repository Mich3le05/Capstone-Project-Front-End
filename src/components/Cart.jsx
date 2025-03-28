import { Col, Row, Button, Alert, Card } from 'react-bootstrap'
import { FaTrash, FaArrowLeft, FaCreditCard } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCartAction } from '../redux/reducers/cartActions'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Cart = () => {
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)
  const cartArray = useSelector((state) => state.cart.content)
  const dispatch = useDispatch()

  const handleRemove = (index) => {
    dispatch(removeFromCartAction(index))
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 2000)
  }

  const calculateTotal = () => {
    return cartArray
      .reduce((acc, product) => acc + parseFloat(product.price), 0)
      .toFixed(2)
  }

  const goToProductDetails = (productId) => {
    navigate(`/product/${productId}`)
  }

  return (
    <div className="py-5 text-color font">
      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0 titoli-font">Il tuo carrello</h2>
            <Button
              variant="outline-secondary"
              onClick={() => navigate('/')}
              className="d-flex align-items-center gap-2"
            >
              <FaArrowLeft /> Continua lo shopping
            </Button>
          </div>

          {showAlert && (
            <Alert
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
              className="border-0 shadow-sm"
            >
              Prodotto rimosso dal carrello!
            </Alert>
          )}

          {cartArray.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center py-5">
                <h4 className="text-muted mb-4">Il tuo carrello è vuoto</h4>
                <Button
                  variant="warning"
                  onClick={() => navigate('/')}
                  className="px-4 rounded-pill"
                >
                  Scopri i nostri prodotti
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Row>
              <Col md={8}>
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body className="p-0">
                    {cartArray.map((product, i) => (
                      <div
                        key={i}
                        className="cart-item d-flex align-items-center p-3 border-bottom"
                      >
                        <div
                          className="d-flex align-items-center"
                          style={{ cursor: 'pointer', flexGrow: 1 }}
                          onClick={() => goToProductDetails(product.id)}
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            className="rounded-3 me-4"
                            style={{
                              width: '90px',
                              height: '90px',
                              objectFit: 'contain',
                            }}
                          />
                          <div className="flex-grow-1">
                            <h5 className="mb-1">{product.title}</h5>
                            <span className="text-muted">
                              € {product.price}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemove(i)
                          }}
                          className="border-0"
                        >
                          Rimuovi
                        </Button>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card
                  className="border-0 shadow-sm"
                  style={{
                    maxHeight: '400px',
                    position: 'sticky',
                    top: '20px',
                  }}
                >
                  <Card.Body className="p-4 d-flex flex-column">
                    <div className="mb-4">
                      <h4 className="mb-3">Riepilogo ordine</h4>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Subtotale:</span>
                        <span>€ {calculateTotal()}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Spedizione:</span>
                        <span>Gratuita</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between fw-bold">
                        <span>Totale:</span>
                        <span>€ {calculateTotal()}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="warning"
                        size="lg"
                        onClick={() =>
                          navigate('/checkout', {
                            state: { total: calculateTotal() },
                          })
                        }
                        className="mt-auto w-75 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2"
                      >
                        <FaCreditCard /> Procedi al pagamento
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default Cart
