import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import '../assets/css/Products.css'
import Loading from './Loading'
import ErrorComponent from './Error'
import { toast } from 'react-toastify'

const EditProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [stock, setStock] = useState('')
  const [categories, setCategories] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

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
        setTitle(data.title || '')
        setDescription(data.description || '')
        setPrice(data.price || '')
        setImage(data.image || '')
        setCategoryId(data.categoryId || '')
        setStock(data.stock || '')

        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Errore nel recupero prodotto:', error)
        setErrorMessage(error.message || 'Impossibile recuperare il prodotto.')
        setIsLoading(false)
      })

    fetch('http://localhost:8080/api/categories/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nel caricamento delle categorie')
        }
        return response.json()
      })
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => {
        console.error('Errore nel caricamento categorie:', error)
        setErrorMessage(error.message || 'Impossibile caricare le categorie.')
      })
  }, [id])

  const handleUpdateProduct = (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Devi essere autenticato per aggiornare il prodotto.')
      return
    }

    const updatedProduct = {
      title,
      image,
      price,
      description,
      categoryId,
      stock,
    }

    fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nell'aggiornamento del prodotto")
        }
        toast.success('Prodotto aggiornato con successo!')
        navigate(`/products`)
      })
      .catch((error) => {
        console.error("Errore nell'aggiornamento del prodotto:", error)
        toast.error(error.message || 'Impossibile aggiornare il prodotto.')
      })
  }

  const handleDeleteProduct = () => {
    if (!window.confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      return
    }

    setIsLoading(true)
    fetch(
      `https://fiscal-ianthe-mich3le-051d8cd5.koyeb.app/api/products/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nell'eliminazione del prodotto")
        }
        toast.success('Prodotto eliminato con successo!')
        navigate('/products')
      })
      .catch((error) => {
        console.error('Errore nella cancellazione del prodotto:', error)
        toast.error(error.message || 'Impossibile eliminare il prodotto.')
      })
      .finally(() => {
        setIsLoading(false)
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
              src={image}
              alt={title}
              className="img-fluid rounded-4 shadow-sm"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="ps-md-4">
            <h1 className="mb-3 fw-bold">{title}</h1>
            <form onSubmit={handleUpdateProduct}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Titolo
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Descrizione
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Prezzo
                </label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Immagine
                </label>
                <input
                  type="text"
                  id="image"
                  className="form-control"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="categoryId" className="form-label">
                  Categoria
                </label>
                <select
                  id="categoryId"
                  className="form-control"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="stock" className="form-label">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="d-flex flex-column gap-3">
                <Button
                  type="submit"
                  variant="outline-warning"
                  className="rounded-5 fw-semibold fs-5 border border-2 border-warning"
                >
                  Aggiorna prodotto
                </Button>
                <Button
                  variant="outline-warning"
                  onClick={() => navigate(-1)}
                  className="rounded-5 text-color w-75 fw-semibold fs-5 border border-2 border-warning"
                >
                  Torna indietro
                </Button>
              </div>
            </form>
            <Button
              variant="outline-danger"
              onClick={handleDeleteProduct}
              className="rounded-5 fw-semibold fs-5 border border-2 border-danger mt-3"
            >
              Elimina prodotto
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
