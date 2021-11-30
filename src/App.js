import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { store } from './store';
import Layout from "./components/Layout";
import { Characters, Planets, Starships } from './containers'

const Fallback = styled.div`
  width: 100%;
  height: 100vh;
  background-color: yellow;
`

const wrapSuspense = (Component) => (
  <Suspense fallback={<Fallback />}>
    <Component />
  </Suspense>
)

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="characters" element={wrapSuspense(Characters)} />
          <Route path="planets" element={wrapSuspense(Planets)} />
          <Route path="starships" element={wrapSuspense(Starships)} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)

export default App;
