import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import '../assets/css/Products.css'
import Loading from './Loading'
import ErrorComponent from './Error'

const DeleteProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    console.log('ID prodotto da eliminare:', id) // Debug ID prodotto

    fetch(`http://localhost:8080/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Prodotto non trovato')
        }
        return response.json()
      })
      .then((data) => {
        setProduct(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Errore nel recupero prodotto:', error)
        setErrorMessage(error.message || 'Impossibile recuperare il prodotto.')
        setIsLoading(false)
      })
  }, [id])

  const handleDeleteProduct = () => {
    if (!window.confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      return
    }

    fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`, // Se serve autenticazione
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nell'eliminazione del prodotto")
        }
        return response.text() // Per evitare errori nel parsing della risposta
      })
      .then(() => {
        alert('Prodotto eliminato con successo!')
        navigate('/') // Torna alla home dopo l'eliminazione
      })
      .catch((error) => {
        console.error('Errore nella cancellazione del prodotto:', error)
        setErrorMessage(error.message || 'Impossibile eliminare il prodotto.')
      })
  }

  if (isLoading) {
    return <Loading />
  }

  if (errorMessage) {
    return <ErrorComponent message={errorMessage} />
  }

  if (!product) {
    return <p>Prodotto non trovato</p>
  }

  return (
    <div className="container py-5 text-color font">
      <div className="row g-4 align-items-center">
        <div className="col-md-6">
          <div className="d-flex justify-content-center">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded-4 shadow-sm"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="ps-md-4">
            <h1 className="mb-3 fw-bold">{product.title}</h1>
            <p className="text-muted mb-4 fs-5">{product.description}</p>
            <h3 className="mb-4">€ {product.price}</h3>

            <div
              className="d-flex flex-column gap-3"
              style={{ maxWidth: '250px' }}
            >
              <Button
                variant="outline-warning"
                onClick={handleDeleteProduct}
                className="rounded-5 fw-semibold fs-5 border border-2 border-warning"
              >
                Elimina prodotto
              </Button>
              <Button
                variant="outline-warning"
                onClick={() => navigate(-1)}
                className="rounded-5 text-color w-75 fw-semibold fs-5 border border-2 border-warning"
              >
                Torna indietro
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteProduct
