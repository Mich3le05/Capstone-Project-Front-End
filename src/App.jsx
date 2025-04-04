import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/assets/css/App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import Home from './pages/Home'
import About from './pages/About'
import Account from './pages/Account'
import Products from './pages/Products'
import NotFound from './components/NotFound'
import MyNav from './components/MyNav'
import MyFooter from './components/MyFooter'
import ProductDetail from './components/ProductDetail'
import CreateProduct from './components/CreateProduct'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import EditProduct from './components/EditProduct'
import Checkout from './pages/Checkout'
import PaymentSuccess from './components/PaymentSuccess'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <header>
        <MyNav />
      </header>
      <main className="bg-color body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/shopping" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          <Route
            path="/edit-product/:id"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create-product"
            element={
              <ProtectedRoute adminOnly={true}>
                <CreateProduct />
              </ProtectedRoute>
            }
          />

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
