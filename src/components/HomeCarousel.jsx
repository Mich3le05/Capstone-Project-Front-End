import { Carousel } from 'react-bootstrap'
import img1 from '../assets/images/1.webp'
import img2 from '../assets/images/2.webp'

const HomeCarousel = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img src={img1} alt="biscotti duri" className="img-fluid" />
          <Carousel.Caption>
            <h3>Biscotto Castriciano</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={img2} alt="biscotti duri" className="img-fluid" />
          <Carousel.Caption>
            <h3>Biscotto Castriciano</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default HomeCarousel
