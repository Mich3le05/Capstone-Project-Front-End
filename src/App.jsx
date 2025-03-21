import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/assets/css/App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import Home from './pages/Home'
import About from './pages/About'
import Account from './pages/Account'
import Shopping from './pages/Shopping'
import Products from './pages/Products'
import NotFound from './components/NotFound'
import MyNav from './components/MyNav'
import MyFooter from './components/MyFooter'
import ProductDetail from './components/ProductDetail'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute' // Importa ProtectedRoute

function App() {
  return (
    <BrowserRouter>
      <header>
        <MyNav />
      </header>
      <main className="bg-color body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/shopping" element={<Shopping />} />

          {/* Proteggi la route dei prodotti */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          {/* Proteggi la route del dettaglio prodotto */}
          <Route
            path="/productdetail"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />

          {/* Route per il 404 */}
          <Route
            path="*"
            element={
              <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                  <NotFound />
                </Col>
              </Row>
            }
          />
        </Routes>
      </main>
      <footer>
        <MyFooter />
      </footer>
    </BrowserRouter>
  )
}

export default App
