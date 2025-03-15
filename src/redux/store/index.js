import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartReducer from '../reducers/cartReducer'
import userReducer from '../reducers/userReducer'
import productReducer from '../reducers/productReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const mainReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  store: productReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, mainReducer)

const myReduxStore = configureStore({
  reducer: persistedReducer,
})

export const myPersistStore = persistStore(myReduxStore)

export default myReduxStore
