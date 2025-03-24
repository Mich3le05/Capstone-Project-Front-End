import { Col, Container, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Lavorazione from '../assets/images/Lavorazione.webp'
import '../assets/css/Products.css'
import { useState, useEffect } from 'react'
import { getAuthHeader } from '../utils/auth'
import Loading from '../components/Loading'
import Error from '../components/Error'

const Products = () => {
  const [categories, setCategories] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
            <div className="d-flex flex-row justify-content-around text-color center font ps-2 pt-4">
              {categories.map((category, index) => (
                <p key={index} className="ps-3">
                  {category.name}
                </p>
              ))}
              <p className="ps-3">Visualizza tutti</p>
            </div>
            <hr className="border-2 border-black w-100 mb-5" />
            <Product />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Products
