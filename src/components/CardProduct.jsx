import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Error from './Error'
import Loading from './Loading'

const CardProduct = () => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://api.example.com/product')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nel recupero dei dati')
        }
        return response.json()
      })
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) return <Loading />
  if (error) return <Error />

  return (
    <Card className="">
      <Card.Img variant="top" src={product.image} alt={product.title} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Button variant="primary">Dettagli</Button>
      </Card.Body>
    </Card>
  )
}

export default CardProduct
