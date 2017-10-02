import { createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      console.log(nextRootReducer);
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
