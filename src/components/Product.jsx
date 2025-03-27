import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import '../assets/css/Products.css'

const Product = ({ product }) => {
  const token = localStorage.getItem('token')
  let isAdmin = false

  if (token) {
    try {
      const decoded = jwtDecode(token)
      isAdmin = decoded.roles?.includes('ROLE_ADMIN')
    } catch (error) {
      console.error('Errore nella decodifica del token:', error)
    }
  }

  return (
    <Link
      to={isAdmin ? `/edit-product/${product.id}` : `/product/${product.id}`}
      className="text-decoration-none"
    >
      <Card className="bg-transparent border-0 product-card my-3">
        <Card.Body className="d-flex flex-column align-items-center justify-content-between p-3">
          <Card.Title className="text-center text-dark fs-4">
            {product.title}
          </Card.Title>
          <img
            src={product.image}
            alt={product.title}
            className="rounded-3 w-100 mb-1"
          />
        </Card.Body>
      </Card>
    </Link>
  )
}

export default Product
