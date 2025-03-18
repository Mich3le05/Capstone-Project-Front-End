import { Spinner } from 'react-bootstrap'

const Loading = () => (
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <Spinner animation="border" role="status" />
    <span>Caricamento in corso...</span>
  </div>
)

export default Loading
