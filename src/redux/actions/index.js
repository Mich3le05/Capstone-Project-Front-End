export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const SET_USERNAME = 'SET_USERNAME'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR'

export const addToCartAction = (productSelected) => ({
  type: ADD_TO_CART,
  payload: productSelected,
})

export const removeFromCartAction = (i) => ({
  type: REMOVE_FROM_CART,
  payload: i,
})

export const setUsernameAction = (username) => ({
  type: SET_USERNAME,
  payload: username,
})

export const getProductsAction = () => {
  return async (dispatch) => {
    try {
      const resp = await fetch('https://api.example.com/products')
      if (resp.ok) {
        const fetchedProducts = await resp.json()
        dispatch({ type: GET_PRODUCTS, payload: fetchedProducts })
      } else {
        throw new Error('Errore nel caricamento dei prodotti')
      }
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR, payload: error.message }) // Passo solo il messaggio d'errore
    }
  }
}
