import { useState, useEffect } from 'react'
import { Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { getAuthHeader } from '../utils/auth'
import Loading from './Loading'
import Error from './Error'

const CreateProduct = () => {
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    image: '',
    categoryId: '',
    stock: 0,
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setErrorMessage('Token non trovato. Effettua il login.')
          return
        }

        const response = await fetch('http://localhost:8080/api/categories', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            setErrorMessage('Sessione scaduta. Effettua nuovamente il login.')
            localStorage.removeItem('token')
            setTimeout(() => window.location.reload(), 1500)
            return
          }
          throw new Error(`Errore: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Errore:', error.message)
        setErrorMessage('Errore nel caricamento delle categorie')
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      if (
        !formData.title ||
        !formData.description ||
        !formData.image ||
        !formData.categoryId
      ) {
        throw new Error('Tutti i campi sono obbligatori')
      }

      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          title: formData.title,
          image: formData.image,
          price: formData.price,
          description: formData.description,
          categoryId: parseInt(formData.categoryId),
          stock: formData.stock,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 401) {
          setErrorMessage('Sessione scaduta. Effettua nuovamente il login.')
          localStorage.removeItem('token') // Rimuovi il token
          setTimeout(() => window.location.reload(), 1500)
          return
        }
        throw new Error(
          errorData.message || 'Errore nella creazione del prodotto'
        )
      }

      const data = await response.json()
      setSuccessMessage(
        `Prodotto "${data.title}" creato con successo! ID: ${data.id}`
      )
      setFormData({
        title: '',
        description: '',
        price: 0,
        image: '',
        categoryId: '',
        stock: 0,
      })
    } catch (error) {
      console.error('Errore:', error)
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="p-4">
      <h2>Crea Nuovo Prodotto</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formTitle">
            <Form.Label>Titolo *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formImage">
            <Form.Label>URL Immagine *</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPrice">
            <Form.Label>Prezzo (€) *</Form.Label>
            <Form.Control
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formStock">
            <Form.Label>Quantità in Stock *</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Descrizione *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Categoria *</Form.Label>
          <Form.Select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Seleziona una categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Creazione in corso...' : 'Crea Prodotto'}
        </Button>
      </Form>
    </div>
  )
}

export default CreateProduct
