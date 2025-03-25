// Cart.js
import { Col, Row, Button, Table, Alert } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
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

  return (
    <Row className="p-4">
      <Col sm={12}>
        <h2 className="mb-4">Il tuo carrello</h2>

        {showAlert && (
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Prodotto rimosso dal carrello!
          </Alert>
        )}

        {cartArray.length === 0 ? (
          <Alert variant="warning">
            Il tuo carrello è vuoto.{' '}
            <Alert.Link onClick={() => navigate('/')}>
              Continua lo shopping
            </Alert.Link>
          </Alert>
        ) : (
          <>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>Prodotto</th>
                  <th>Prezzo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartArray.map((product, i) => (
                  <tr key={i}>
                    <td>
                      <img
                        className="product-image-small"
                        src={product.image}
                        alt={product.title}
                        style={{ width: '50px' }}
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>€ {product.price}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemove(i)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="text-end mt-4">
              <h4>TOTALE: € {calculateTotal()}</h4>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => navigate('/checkout')}
              >
                Procedi all'acquisto
              </Button>
            </div>
          </>
        )}
      </Col>
    </Row>
  )
}

export default Cart
