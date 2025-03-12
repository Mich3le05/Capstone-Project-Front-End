import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import Error from './Error'
import Loading from './Loading'

const CardProduct = () => {
  const { id } = useParams() // Recupera l'ID del prodotto dalla URL
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzQxODA4OTQ4LCJleHAiOjE3NDE4MTI1NDh9.kM2Se6Bb4ddnQ7PsuQq9GkzNwxGPdnNf4-XcH7TkzY0`, // Inserisci il token manualmente
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error('Prodotto non trovato')
        }

        const data = await response.json()
        setProduct(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id]) // Effettua la chiamata quando cambia l'ID

  // Gestione stato di caricamento ed errori
  if (loading) return <Loading />
  if (error) return <Error message={error} />

  return (
    <Card>
      {product?.image && (
        <Card.Img
          variant="top"
          src={product.image} // Mostra l'immagine dal backend
          alt={product.title || 'Immagine prodotto'} // Titolo come alt per l'immagine
        />
      )}
      <Card.Body>
        <Card.Title>{product?.title}</Card.Title>{' '}
        {/* Mostra il titolo del prodotto */}
        <Button variant="primary">Dettagli</Button>
      </Card.Body>
    </Card>
  )
}

export default CardProduct
