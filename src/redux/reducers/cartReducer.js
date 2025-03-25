// cartReducer.js
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types'

const initialState = {
  content: [], // All'inizio il carrello è vuoto
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        content: [...state.content, { ...action.payload, cartId: Date.now() }],
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        content: state.content.filter((product, i) => i !== action.payload),
      }

    default:
      return state
  }
}

export default cartReducer
