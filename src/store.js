import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunk from "redux-thunk";

const configureStore = initialState => {
  const middlewares = [thunk]

  const staticReducers = {}

  const createReducer = (asyncReducers) =>
    combineReducers({
      ...staticReducers,
      ...asyncReducers
    })

  const composeEnhancers =
    typeof window === 'object' &&
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  store.asyncReducers = {}
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }

  return store
}

export const store = configureStore();
