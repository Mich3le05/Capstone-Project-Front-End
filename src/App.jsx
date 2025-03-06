import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/assets/css/App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

import Home from './pages/Home'
import NotFound from './components/NotFound'
import MyNav from './components/MyNav'
import MyFooter from './components/MyFooter'

function App() {
  return (
    <BrowserRouter>
      <header>
        <MyNav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="*"
            element={
              <Row className="justify-content-center mt-3">
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
