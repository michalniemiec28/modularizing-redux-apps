import React, { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`

const Item = styled.div`
  margin-left: 100px;
`

const Characters = ({ fetchingCharacters, characters, getCharacters, character, getCharacter }) => {
  useEffect(() => {
    if (!characters.length) {
      getCharacters();
    }
  }, [])
  
  if (fetchingCharacters) {
    return <h2>Fetching star wars characters...</h2>;
  }
    
  return (
    <Wrapper>
      <div>
        {characters.map(({ name, url }) => (
          <div key={name} onClick={() => getCharacter(url)}>{name}</div>
        ))}
      </div>
      {character && (
        <Item>
          <div>Name: {character.name}</div>
          <div>Gender: {character.gender}</div>
          <div>Height: {character.height}</div>
          <div>Birth Year: {character.birth_year}</div>
        </Item>
      )}
    </Wrapper>
  );
}

export default Characters
