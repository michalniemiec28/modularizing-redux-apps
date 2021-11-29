import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { store } from './store';
import Layout from "./components/Layout";

const Characters = lazy(() => import("./containers/Characters"))
const Planets = lazy(() => import("./containers/Planets"))
const Starships = lazy(() => import("./containers/Starships"))

const Fallback = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: yellow;
`

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="characters" element={<Characters />} />
            <Route path="planets" element={<Planets />} />
            <Route path="starships" element={<Starships />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
)

export default App;
