import { Card, Button } from 'react-bootstrap'
import Biscotti from '../assets/images/2.webp'

const Product = () => {
  return (
    <Card className="border-0" style={{ width: '15rem', height: '20rem' }}>
      <Card.Img variant="top" src={Biscotti} className=" object-fit-cover" />
      <Card.Body className="p-2 text-center">
        <Card.Title className="fs-3">Biscotti Castriciani</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default Product
