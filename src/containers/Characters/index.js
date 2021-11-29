import characters from './Characters.module'
import { store } from '../../store'

store.injectReducer('characters', characters)

export { default } from './Characters';
