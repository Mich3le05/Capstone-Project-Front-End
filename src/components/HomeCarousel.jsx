import { Carousel } from 'react-bootstrap'
import img1 from '../assets/images/biscotti1.webp'
import img2 from '../assets/images/biscotti2.webp'

const HomeCarousel = () => {
  return (
    <Carousel className="titoli-font carousel-fullscreen">
      <Carousel.Item>
        <div className="position-relative">
          <img
            src={img1}
            alt="biscotti duri"
            className="carousel-img"
            style={{ filter: 'blur(1px)' }}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
          <Carousel.Caption className="text-start position-absolute top-0 start-0 p-5 ms-5 mt-3">
            <h1 className="text-white">Biscotti tipici Castrensi</h1>
          </Carousel.Caption>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="position-relative">
          <img
            src={img2}
            alt="biscotti duri"
            className="carousel-img"
            style={{ filter: 'blur(1px)' }}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
          <Carousel.Caption className="text-start position-absolute top-0 start-0 p-5 ms-5 mt-3">
            <h1 className="text-white">Biscotti tipici Castrensi</h1>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
    </Carousel>
  )
}

export default HomeCarousel
