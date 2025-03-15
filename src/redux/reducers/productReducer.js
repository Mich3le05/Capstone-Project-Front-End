import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
} from '../actions'

const initialState = {
  products: [],
  cart: [],
  error: null,
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload, error: null }
    case GET_PRODUCTS_ERROR:
      return { ...state, error: action.payload }
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((_, index) => index !== action.payload),
      }
    default:
      return state
  }
}

export default productReducer
