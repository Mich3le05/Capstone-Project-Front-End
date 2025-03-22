import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { getAuthHeader } from '../utils/auth'
import '../assets/css/Products.css'
import Loading from './Loading'
import Error from './Error'

const ProductDetail = () => {
  const [product, setProduct] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

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
    <div className="d-flex justify-content-center py-5">
      <Card className="product-detail-card p-3">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          className="rounded-4"
        />
        <Card.Body>
          <Card.Title className="text-center fs-3 mb-3">
            {product.title}
          </Card.Title>
          <Card.Text className="mb-3">{product.description}</Card.Text>
          <h5 className="text-primary mb-3">Prezzo: € {product.price}</h5>
          <Button variant="dark" onClick={() => navigate(-1)}>
            Torna indietro
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ProductDetail
