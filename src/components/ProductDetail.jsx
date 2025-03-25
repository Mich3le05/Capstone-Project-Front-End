import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addToCartAction } from '../redux/reducers/cartActions'
import '../assets/css/Products.css'
import Loading from './Loading'
import Error from './Error'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
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

  if (isLoading) {
    return <Loading />
  }

  if (errorMessage) {
    return <Error message={errorMessage} />
  }

  if (!product) {
    return <p>Prodotto non trovato</p>
  }

  const addToCart = () => {
    dispatch(addToCartAction(product))
    alert(`${product.title} aggiunto al carrello!`)
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
                onClick={addToCart}
                className="rounded-5 fw-semibold fs-5 border border-2 border-warning"
              >
                Aggiungi al carrello
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

export default ProductDetail
