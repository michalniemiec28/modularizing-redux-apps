import starships from './Starships.module'
import { store } from '../../store'

store.injectReducer('starships', starships)

export { default } from './Starships'
