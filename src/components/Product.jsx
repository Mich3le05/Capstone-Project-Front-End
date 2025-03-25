import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../assets/css/Products.css'

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="text-decoration-none">
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
