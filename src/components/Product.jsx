import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAuthHeader } from '../utils/auth'
import '../assets/css/Products.css'
import Loading from './Loading'
import Error from './Error'

const Product = () => {
  const [product, setProduct] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:8080/api/products/1', {
      method: 'GET',
      headers: getAuthHeader(),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setProduct(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Errore nel recupero prodotto:', error)
        setErrorMessage('Impossibile recuperare il prodotto.')
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (errorMessage) {
    return <Error message={errorMessage} />
  }

  if (!product) {
    return <p>Prodotto non trovato</p>
  }

  return (
    <Link to="/productdetail" className="text-decoration-none">
      <Card className="bg-transparent border-0 product-card">
        <Card.Body className="d-flex flex-column align-items-center justify-content-between p-3">
          <Card.Title className="text-center text-dark fs-4">
            {product.title}
          </Card.Title>
          <img
            src={product.image}
            alt={product.title}
            className="rounded-5 w-100 mb-1"
          />
        </Card.Body>
      </Card>
    </Link>
  )
}

export default Product
