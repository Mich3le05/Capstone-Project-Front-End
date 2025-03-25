import { Col, Container, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Lavorazione from '../assets/images/Lavorazione.webp'
import '../assets/css/Products.css'
import { useState, useEffect, useRef } from 'react'
import { getAuthHeader } from '../utils/auth'
import Loading from '../components/Loading'
import Error from '../components/Error'

const Products = () => {
  const [categories, setCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const productsRef = useRef(null)

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:8080/api/categories/', {
          method: 'GET',
          headers: getAuthHeader(),
        })

        if (!response.ok) {
          throw new Error('Errore nella richiesta delle categorie')
        }

        const data = await response.json()
        setCategories(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Errore nel fetch delle categorie:', error)
        setErrorMessage('Impossibile recuperare le categorie.')
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const fetchProducts = async (categoryId = null) => {
    setIsLoading(true)
    try {
      let url = 'http://localhost:8080/api/products'
      if (categoryId !== null) {
        url = `http://localhost:8080/api/products/category/${categoryId}`
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeader(),
      })

      if (!response.ok) {
        throw new Error('Errore nella richiesta dei prodotti')
      }

      const data = await response.json()
      console.log('Prodotti ricevuti:', data)

      setFilteredProducts(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Errore nel fetch dei prodotti:', error)
      setErrorMessage('Impossibile recuperare i prodotti.')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId)
    fetchProducts(categoryId)
    if (productsRef.current) {
      productsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      setTimeout(() => {
        window.scrollBy(0, -200)
      }, 500) //delay
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (errorMessage) {
    return <Error message={errorMessage} />
  }

  return (
    <>
      <img src={Lavorazione} alt="lavoro" className="fade-bottom hero-img" />
      <Container fluid className="p-5">
        <Row className="justify-content-center mt-3">
          <Col xs={12}>
            <h1 className="text-center text-danger mb-4 titoli-font">
              I nostri prodotti
            </h1>

            <div className="d-flex flex-row justify-content-around text-color center font ps-2 pt-4 fs-5">
              {categories.map((category) => (
                <p
                  key={category.id}
                  className={`category-link ps-3 ${
                    selectedCategoryId === category.id
                      ? 'selected-category'
                      : ''
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </p>
              ))}
              <p
                className={`ps-3 category-link ${
                  selectedCategoryId === null ? 'selected-category' : ''
                }`} //
                onClick={() => handleCategoryClick(null)}
                i
              >
                Visualizza tutti
              </p>
            </div>

            <hr className="border-2 border-black w-100 mb-5 mt-1" />
            <Row ref={productsRef}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Col key={product.id} xs={12} md={4} lg={3}>
                    <Product product={product} />
                  </Col>
                ))
              ) : (
                <p className="text-center">Nessun prodotto disponibile.</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Products
