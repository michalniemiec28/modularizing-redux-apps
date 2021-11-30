import { connect } from "react-redux";
import Characters from './Characters';
import charactersReducer, { getCharacters, getCharacter } from './Characters.module'
import { store } from '../../store'

store.injectReducer('characters', charactersReducer)

const mapStateToProps = state => ({
    characters: state.characters.characters,
    character: state.characters.character,
    error: state.characters.error,
    fetchingCharacters: state.characters.fetchingCharacters
  });
  
const mapDispatchToProps = {
    getCharacters,
    getCharacter,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Characters);
