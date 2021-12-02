import charactersReducer from './Characters.module'
import { store } from '../../store'

store.injectReducer('characters', charactersReducer)

export { default } from './Characters';
