import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunk from "redux-thunk";
import characters from './reducers/charactersReducer'
import planets from './reducers/planetsReducer'
import starships from './reducers/starshipsReducer'

export const configureStore = initialState => {
  const middlewares = [thunk]

  const createReducer = () =>
    combineReducers({
      characters,
      planets,
      starships
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

  return store
}
