import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaShoppingBasket } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setUsernameAction } from '../redux/actions'

const CartIndicator = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')

  const cartArray = useSelector((reduxState) => reduxState.cart.content)
  const username = useSelector((reduxState) => reduxState.user.name)

  return (
    <div className="d-flex justify-content-end my-4 align-items-center">
      {username !== '' ? (
        <>
          <span className="me-2">Benvenuto, {username}!</span>
          <Button
            onClick={() => navigate('/cart')}
            className="d-flex align-items-center"
          >
            <FaShoppingBasket />
            <span className="ms-2">{cartArray.length}</span>
          </Button>
        </>
      ) : (
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            dispatch(setUsernameAction(inputValue))
          }}
        >
          <Form.Group>
            <Form.Control
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Inserisci il tuo nome"
            />
          </Form.Group>
        </Form>
      )}
    </div>
  )
}

export default CartIndicator
