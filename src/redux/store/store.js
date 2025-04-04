import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartReducer from '../reducers/cartReducer'

const rootReducer = combineReducers({
  cart: cartReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
