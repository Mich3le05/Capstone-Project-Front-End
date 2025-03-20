import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Biscotti from '../assets/images/2.webp'
import '../assets/css/Products.css'

const Product = () => {
  return (
    <Link to="/productdetail" className="text-decoration-none">
      <Card className="bg-transparent border-0 product-card">
        <Card.Body className="d-flex flex-column align-items-center justify-content-between p-3">
          <Card.Title className="text-center text-dark fs-4">
            Biscotti Castriciani
          </Card.Title>
          <img
            src={Biscotti}
            alt="Biscotti Castriciani"
            className="rounded-5 w-100 mb-1"
          />
        </Card.Body>
      </Card>
    </Link>
  )
}

export default Product
