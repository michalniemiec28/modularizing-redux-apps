import planetsReducer from "./Planets.module";
import { store } from '../../store'

store.injectReducer('planets', planetsReducer)

export { default } from './Planets'
  