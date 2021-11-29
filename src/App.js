import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { configureStore } from './store';
import Layout from "./components/Layout";
import Characters from "./containers/Characters";
import Planets from "./containers/Planets";
import Starships from "./containers/Starships";

const App = () => (
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<></>} />
          <Route path="characters" element={<Characters />} />
          <Route path="planets" element={<Planets />} />
          <Route path="starships" element={<Starships />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)

export default App;
