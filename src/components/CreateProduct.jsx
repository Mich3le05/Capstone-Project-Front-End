import { useState, useEffect } from 'react'
import { Form, Button, Alert, Row, Col, Container } from 'react-bootstrap'
import { getAuthHeader, isTokenValid } from '../utils/auth'
import Loading from './Loading'

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
  const [fileInputKey, setFileInputKey] = useState(Date.now())
  const [imageUploaded, setImageUploaded] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://fiscal-ianthe-mich3le-051d8cd5.koyeb.app/api/categories/',
          {
            method: 'GET',
            headers: getAuthHeader(),
          }
        )

        if (!response.ok) {
          if (response.status === 401 && !isTokenValid()) {
            setErrorMessage('Sessione scaduta. Effettua nuovamente il login.')
            localStorage.removeItem('token')
            setTimeout(() => window.location.reload(), 1500)
            return
          }
          throw new Error('Errore nel caricamento delle categorie.')
        }

        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Errore:', error.message)
        setErrorMessage('Errore nel caricamento delle categorie.')
      }
    }

    fetchCategories()
  }, [])

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const uploadData = new FormData()
    uploadData.append('file', file)

    try {
      setIsLoading(true)
      setErrorMessage('')
      setSuccessMessage('')

      const response = await fetch(
        'https://fiscal-ianthe-mich3le-051d8cd5.koyeb.app/api/images/uploadme',
        {
          method: 'POST',
          body: uploadData,
          headers: getAuthHeader(),
        }
      )

      if (!response.ok) {
        throw new Error("Errore durante il caricamento dell'immagine.")
      }

      const data = await response.json()
      setFormData((prev) => ({ ...prev, image: data.imageUrl }))
      setImageUploaded(true)
      setSuccessMessage('Immagine caricata con successo!')
    } catch (error) {
      console.log('Errore:', error.message)
      setErrorMessage("Errore nel caricamento dell'immagine.")
      setImageUploaded(false)
    } finally {
      setIsLoading(false)
    }
  }

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
      // Validazione
      if (
        !formData.title ||
        !formData.description ||
        !formData.image ||
        !formData.categoryId
      ) {
        throw new Error('Tutti i campi contrassegnati con * sono obbligatori.')
      }

      if (formData.price <= 0) {
        throw new Error('Il prezzo deve essere maggiore di 0.')
      }

      if (formData.stock < 0) {
        throw new Error('Lo stock non può essere negativo.')
      }

      const productData = {
        title: formData.title,
        image: formData.image,
        price: formData.price,
        description: formData.description,
        categoryId: parseInt(formData.categoryId),
        stock: formData.stock,
      }

      console.log('Invio dati:', productData)

      const response = await fetch(
        'https://fiscal-ianthe-mich3le-051d8cd5.koyeb.app/api/products',
        {
          method: 'POST',
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            ...getAuthHeader(),
          },
          body: JSON.stringify(productData),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Dettagli errore:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
        })

        if (response.status === 401 && !isTokenValid()) {
          throw new Error('Sessione scaduta. Effettua nuovamente il login.')
        }

        throw new Error(
          errorData.message ||
            errorData.error ||
            `Errore nella creazione del prodotto (status ${response.status})`
        )
      }

      const data = await response.json()
      console.log('Risposta creazione:', data)

      setSuccessMessage(
        `Prodotto "${data.title}" creato con successo! ID: ${data.id}`
      )

      // Resetta il form
      setFormData({
        title: '',
        description: '',
        price: 0,
        image: '',
        categoryId: '',
        stock: 0,
      })
      setImageUploaded(false)
      setFileInputKey(Date.now())
    } catch (error) {
      console.error('Errore completo:', error)
      setErrorMessage(
        error.message ||
          'Si è verificato un errore durante la creazione del prodotto.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container className="p-5 text-color font">
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
            <Form.Label>Carica Immagine *</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              key={fileInputKey}
              required={!imageUploaded}
            />
            {!imageUploaded && formData.image && (
              <Form.Text className="text-danger">
                Clicca su "Carica Immagine" per confermare l'upload
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        {formData.image && (
          <div className="mb-3">
            <p>Anteprima immagine:</p>
            <img
              src={formData.image}
              alt="Anteprima"
              style={{ maxWidth: '200px', height: 'auto' }}
            />
            {imageUploaded && (
              <Form.Text className="text-success">
                Immagine caricata con successo!
              </Form.Text>
            )}
          </div>
        )}

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPrice">
            <Form.Label>Prezzo (€) *</Form.Label>
            <Form.Control
              type="number"
              name="price"
              min="0.01"
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
              min="1"
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

        <Button
          variant="warning"
          type="submit"
          disabled={isLoading || !imageUploaded}
        >
          {isLoading ? 'Creazione in corso...' : 'Crea Prodotto'}
        </Button>
      </Form>
    </Container>
  )
}

export default CreateProduct
