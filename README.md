# Modularyzacja aplikacji reduxowych

## "A co to redux?" - problem warstw abstrakcji jako powszechny błąd w tutorialach.

Kiedy uczysz się o reduxie i roli akcji i reducerów, zaczynasz od bardzo prostych przykładów. Większość dostępnych tutoriali nie wchodzi na wyższy poziom. Ale jeśli budujesz coś z Reduxem, co jest bardziej skomplikowane niż lista rzeczy do zrobienia, będziesz potrzebował mądrzejszego sposobu na skalowanie swojej bazy danych w czasie.

W tutorialach przygoda zazwyczaj zaczyna się od utworzenia osobnego katalogu dla akcji, reducerów oraz typów akcji. Jest to podejście function-first - katalogi najwyższego poziomu są nazwane zgodnie z przeznaczeniem plików znajdujących się w środku. Masz więc: kontenery, komponenty, akcje, reducery, itd.

Każdy katalog jest osobną warstwą abstrakcji twojej aplikacji.

<img src="data:image/png;base64,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" />

Musisz wiedzieć że to się w ogóle nie skaluje. Gdy Twoja aplikacja się rozrasta i dodajesz więcej funkcji, dodajesz pliki do tych samych folderów. Więc kończysz z koniecznością przewijania wewnątrz jednego folderu, aby znaleźć swój plik.

Problem polega również na sprzężeniu folderów razem. Pojedynczy przepływ przez twoją aplikację prawdopodobnie będzie wymagał plików z wszystkich folderów.

Jedną z zalet tego podejścia jest to, że izoluje ono - w naszym przypadku - Reacta od Reduxa. Więc jeśli chcesz zmienić bibliotekę zarządzania stanem, wiesz, których folderów musisz dotknąć. I na odwrót - jeśli zmienisz bibliotekę widoku, możesz zachować swoje reduxowe foldery nietknięte.

## Architektura Ducks. Współdzielone abstrakcje.

<img src="https://cdn-media-1.freecodecamp.org/images/1*uceu9f-p_A2H2-2xD-6MiQ.jpeg" width="500" />

Ktoś kiedyś powiedział, że nazywanie rzeczy jest jedną z najtrudniejszych prac w informatyce. Nie mógłbym się z tym nie zgodzić ale strukturyzowanie folderów i organizowanie plików jest na drugim miejscu.

Istnieją dwa podejścia do strukturyzacji aplikacji: function-first i feature-first.

Poniżej po lewej stronie widać strukturę folderów typu function-first. Po prawej stronie możesz zobaczyć podejście feature-first.

<img src="https://cdn-media-1.freecodecamp.org/images/1*HM8M2Agd_TBfU4Zm1_lEJA.png" />

Feature-first oznacza, że katalogi najwyższego poziomu są nazwane po głównych funkcjach aplikacji: produkt, koszyk, sesja. Takie podejście skaluje się znacznie lepiej.

Każda nowa funkcjonalność wiąże się z nowym katalogiem, który jednocześnie zawiera logikę aplikacji podzieloną według swojego przeznaczenia.

## Code splitting, asynchroniczne reducery.

W dużych aplikacjach internetowych, często pożądane jest podzielenie kodu aplikacji na wiele pakietów JS, które mogą być ładowane na żądanie. Ta strategia, zwana "dzieleniem kodu", pomaga zwiększyć wydajność aplikacji poprzez zmniejszenie rozmiaru początkowego ładunku JS, który musi zostać pobrany.

### Funkcja `replaceReducer`

Aby podzielić kod, chcemy mieć możliwość dynamicznego dodawania reducerów do store'a. Główny reducer jest generowany przez wywołanie `combineReducers()`. Aby dynamicznie dodawać kolejne reducery, musimy ponownie wywołać tę funkcję, aby zastąpić reducer główny. Do tego służy funkcja replaceReduce. Wywołanie jej spowoduje zamianę referencji do wewnętrznej funkcji reducera oraz wysłanie akcji, która pomoże nowo dodanym reducerom w inicjalizacji:

```javascript
const newRootReducer = combineReducers({
  existingSlice: existingSliceReducer,
  newSlice: newSliceReducer
})

store.replaceReducer(newRootReducer)
```

### Definiowanie funkcji `injectReducer`

Prawdopodobnie będziemy chcieli wywołać funkcję `store.replaceReducer()` z dowolnego miejsca w aplikacji. Z tego powodu, pomocne jest zdefiniowanie generycznej funkcji `injectReducer()`, która przechowuje referencje do wszystkich istniejących podrzędnych reducerów i dołączenie jej do instancji store'a.

```javascript
import { createStore } from 'redux'

export default function configureStore(initialState) {
  // function that combines all reducers
  const createReducer = (asyncReducers) =>
    combineReducers({
      ...staticReducers,
      ...asyncReducers
    })

  // Reducers that will always be present in the application
  const staticReducers = {
    users: usersReducer,
    posts: postsReducer
  }

  const store = createStore(createReducer(), initialState)

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {}

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }

  // Return the modified store
  return store
}
```

Teraz wystarczy wywołać `store.injectReducer`, aby dodać nowy reducer do store'a.

### Asynchronizacja dodawania reducerów

Świetnym featurem jest asynchoniczne ładowanie komponentów przez reacta za pomocą funkcji `lazy`.
Pozawala ona na asynchronizację dodawania reducerów podczas przeklikiwania aplikacji. Daje nam to możliwość minimalnej złożoności całego store'a poprawiając wydajność całej aplikacji.

```javascript
import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from './store';
import Layout from "./components/Layout";

const Characters = lazy(() => import("./containers/Characters"))
const Planets = lazy(() => import("./containers/Planets"))
const Starships = lazy(() => import("./containers/Starships"))

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={null}>
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
```

## Middlewary na ratunek.

## Context API vs redux. Krótka notka na temat memoizacji.
