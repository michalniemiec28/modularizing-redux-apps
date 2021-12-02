import starshipsReducer from './Starships.module'
import { store } from '../../store'

store.injectReducer('starships', starshipsReducer)

export { default } from './Starships'
