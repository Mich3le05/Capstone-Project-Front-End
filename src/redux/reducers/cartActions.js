import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types'

export const addToCartAction = (productSelected) => {
  return {
    type: ADD_TO_CART,
    payload: productSelected,
  }
}

export const removeFromCartAction = (i) => {
  return {
    type: REMOVE_FROM_CART,
    payload: i, // 0 per il primo prodotto, 1 per il secondo etc.
  }
}
