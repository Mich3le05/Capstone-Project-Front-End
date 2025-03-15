import { Col, Row, Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCartAction } from '../redux/actions'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartArray = useSelector((reduxState) => reduxState.cart.content)
  const username = useSelector((reduxState) => reduxState.user.name)
  const productsInStock = useSelector((reduxState) => reduxState.store.products)

  useEffect(() => {
    if (username === '') {
      navigate('/')
    }
  }, [username, navigate])

  return (
    <Row>
      <Col sm={12}>
        <ul style={{ listStyle: 'none' }}>
          {cartArray.map((product, i) => (
            <li key={i} className="my-4">
              <Button
                variant="danger"
                onClick={() => dispatch(removeFromCartAction(i))}
              >
                <FaTrash />
              </Button>
              <img
                className="product-image-small"
                src={product.imageUrl}
                alt={product.name}
              />
              {product.name} - {product.price}€
            </li>
          ))}
        </ul>
      </Col>
      <Row>
        <Col sm={12} className="fw-bold mb-3 ms-4">
          Totale:{' '}
          {cartArray.reduce(
            (acc, product) => acc + parseFloat(product.price),
            0
          )}
          €
        </Col>
      </Row>
      <Row>
        <Col sm={12} className="fw-bold mb-3 ms-4">
          Nel negozio sono disponibili {productsInStock.length} prodotti!
        </Col>
      </Row>
    </Row>
  )
}

export default Cart
