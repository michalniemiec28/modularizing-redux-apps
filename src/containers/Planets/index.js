import planets from './Planets.module'
import { store } from '../../store'

store.injectReducer('planets', planets)

export { default } from './Planets'
