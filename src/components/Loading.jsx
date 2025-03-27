import { Spinner } from 'react-bootstrap'

const Loading = () => (
  <div className="m-5 text-center">
    <Spinner animation="border" role="status" />
    <span>Caricamento in corso...</span>
  </div>
)

export default Loading
