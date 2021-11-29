import React from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: black;
  color: yellow;

  a, a:visited {
    color: yellow;
    text-decoration: none;
    font-size: 20px;
    line-height: 30px;
  }
`

const Container = styled.div`
  background-color: yellow;
  font-size: 20px;
  line-height: 30px;
  width: 100%;
  padding: 30px;
`

const Layout = () => (
  <Wrapper>
    <Nav>
      <Link to="/characters">Characters</Link>
      <Link to="/planets">Planets</Link>
      <Link to="/starships">Starships</Link>
    </Nav>
    <Container>
      <Outlet />
    </Container>
  </Wrapper>
);

export default Layout;
