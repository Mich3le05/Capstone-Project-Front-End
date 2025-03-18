import React from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import App from './App'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import myReduxStore, { myPersistStore } from './redux/store'

createRoot(document.getElementById('root')).render(
  <Provider store={myReduxStore}>
    <PersistGate loading={null} persistor={myPersistStore}>
      <App />
    </PersistGate>
  </Provider>
)
