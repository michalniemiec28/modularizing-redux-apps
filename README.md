# Modularyzacja aplikacji reduxowych

Opowiadanie o zmniejszaniu ilości warstw systemu

## "A co to redux?" - problem warstw abstrakcji jako powszechny błąd w tutorialach.

<img src="https://raw.githubusercontent.com/michalniemiec28/modularizing-redux-apps/master/readme/redux-flow.gif" width="500" />

[https://redux.js.org/tutorials/essentials/part-1-overview-concepts]

Kiedy uczysz się o reduxie i roli akcji i reducerów, zaczynasz od bardzo prostych przykładów. Większość dostępnych tutoriali nie wchodzi na wyższy poziom. Ale jeśli budujesz coś z Reduxem, co jest bardziej skomplikowane niż lista rzeczy do zrobienia, będziesz potrzebował mądrzejszego sposobu na skalowanie swojego zewnętrznego stanu komponentów.

W tutorialach przygoda zazwyczaj zaczyna się od utworzenia osobnych katalogów dla akcji, reducerów oraz typów akcji. Jest to podejście `function-first` - katalogi najwyższego poziomu są nazwane zgodnie z przeznaczeniem plików znajdujących się w środku. Masz więc: kontenery, komponenty, akcje, reducery, itd.

Każdy katalog jest osobną warstwą abstrakcji twojej aplikacji.

Musisz wiedzieć, że to się w ogóle nie skaluje. Gdy Twoja aplikacja się rozrasta i dodajesz więcej funkcji, dodajesz pliki do tych samych folderów. Więc kończysz z koniecznością przewijania wewnątrz jednego folderu, aby znaleźć swój plik.

Problem polega również na sprzężeniu folderów razem. Pojedynczy przepływ przez twoją aplikację prawdopodobnie będzie wymagał plików z wszystkich folderów.

## Architektura Ducks. Współdzielone abstrakcje.

Ktoś kiedyś powiedział, że nazywanie rzeczy jest jedną z najtrudniejszych prac w informatyce. Nie mógłbym się z tym nie zgodzić ale strukturyzowanie folderów i organizowanie plików jest na drugim miejscu.

Istnieją dwa podejścia do strukturyzacji aplikacji: function-first i feature-first.

### Podejście typu function-first:

<img src="https://raw.githubusercontent.com/michalniemiec28/modularizing-redux-apps/master/readme/function-first.png" />

Redux sam w sobie tworzy parę warstw abstrakcyjnych:
- akcje (i action-type'y)
- reducery
- store
- middleware'y

Dodając do tego warstwę komponentów i kontenerów lub route'ów wychodzi nam całkiem skomplikowana struktura, w której można bardzo łatwo zaburzyć porządek. Wystarczy pomieszać użycie ze sobą kolejnych warstw albo np utworzyć akcje, które nie będą miały odzwierciedlenia w warstwie reducerów.

### Podejście typu feature-first:

<img src="https://raw.githubusercontent.com/michalniemiec28/modularizing-redux-apps/master/readme/feature-first.png" />

Feature-first oznacza, że katalogi najwyższego poziomu są nazwane po głównych funkcjach aplikacji: produkt, koszyk, sesja. Takie podejście skaluje się znacznie lepiej.

Każda nowa funkcjonalność wiąże się z nowym katalogiem, który jednocześnie zawiera logikę aplikacji podzieloną według swojego przeznaczenia.
Plusów tego rozwiązania jest bardzo dużo, największy plus moim zdaniem to bardzo mało kodu w tak zwanym folderze `shared`, gdyż logika aplikacji jest pocięta względem komponentów.

Ogólnie im mniejszy poziom abstrakcji tym lepsza czytelność, dlatego powinno się dążyć do jak najmniejszej ilości warstw. Patrząc na akcje i reducer, można stwierdzić że "zmieszczą się" w jednym pliku. Ten plik to właśnie duck - kaczka, czyli moduł.

<img src="https://raw.githubusercontent.com/michalniemiec28/modularizing-redux-apps/master/readme/ducks.jpeg" width="300" />

[https://github.com/erikras/ducks-modular-redux]

## Code splitting, asynchroniczne reducery.

W dużych aplikacjach internetowych, często pożądane jest podzielenie kodu aplikacji na wiele pakietów JS, które mogą być ładowane na żądanie. Ta strategia, zwana "dzieleniem kodu", pomaga zwiększyć wydajność aplikacji poprzez zmniejszenie rozmiaru początkowego ładunku JS, który musi zostać pobrany.

Świetnym featurem jest ładowanie komponentów za pomocą funkcji `lazy`. Pozwala ona na asynchroniczne pobieranie kawałków wygenerowanego kodu przez webpacka. Daje nam to możliwość zmniejszenia rozmiaru aplikacji, którą trzeba pobrać na początku.

```js
// App.js

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

Jeszcze lepiej aplikacja skaluje się jak zadeklarujemy ładowanie kontenerów w pliku `src/containers/index.js`

```js
// containers/index.js

import { lazy } from "react"

export const Characters = lazy(() => import("./Characters"))
export const Planets = lazy(() => import("./Planets"))
export const Starships = lazy(() => import("./Starships"))
```

Należy wtedy pamiętać o poprawnym ładowaniu takich komponentów, muszą być one owrapowane komponentem `Suspense`. Im mniej warstw między `Suspense` a importowanym komponentem, tym lepiej.

```js
// App.js

import { Characters, Planets, Starships } from './containers'

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
```

Takie rozwiązanie pozwala nie tylko zmniejszyć rozmiar aplikacji potrzebny do załadowania "na starcie" ale również na asynchoniczne wpinanie do redux'a modułów, których potrzebujemy.

### Funkcja `replaceReducer`

Aby podzielić kod, chcemy mieć możliwość dynamicznego dodawania reducerów do store'a. Główny reducer jest generowany przez wywołanie `combineReducers()`. Aby dynamicznie dodawać kolejne reducery, musimy ponownie wywołać tę funkcję, aby zastąpić reducer główny. Do tego służy funkcja `replaceReduce()`. Wywołanie jej spowoduje zamianę referencji do wewnętrznej funkcji reducera oraz wysłanie akcji, która pomoże nowo dodanym reducerom w inicjalizacji:

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
// store.js

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

```js
// containers/Characters/index.js

import Characters from './Characters';
import charactersReducer from './Characters.module'
import { store } from '../../store'

// injecting charactersReducer when a file has been lazy loaded
store.injectReducer('characters', charactersReducer)

export default Characters
```

Asynchronicznie ładowane moduły reduxowe zmniejszają początkową złożoność głównego reducera dzięki czemu aplikacja uruchamia się i działa szybciej.

Spójrzmy teraz na to co się dzieje w komponentach.

```js
// containers/Characters/Characters.js

class Characters extends React.Component {
  componentDidMount() {
    const { characters, getCharacters } = this.props;

    if (!characters.length) {
      getCharacters();
    }
  }

  render() {
    const { fetchingCharacters, characters, character, getCharacter } = this.props;
  
    if (fetchingCharacters) {
      <h2>Fetching star wars characters...</h2>;
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
}

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
```

Część logiki, która łączy się ze storem może zostać wyniesiona, gdyż "wrappuje" cały komponent, wynieśmy to więc do pliku index.js

```js
// containers/Characters/index.js

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
```

Taka struktura tworzy nam kontener, który łączy się z reduxem, wpinając reducer i mapując do propsów potrzebne akcje i podzielonego state'a.
Trzeba w tym momencie wspomnieć o tym, że dla każdego komponentu taka struktura będzie dodatkową warstwą "połączeniową". Wraz z dodaniem hooków do biblioteki react, dodano również do react-redux hooki które pozwalają się połączyć ze storem bezpośrednio w komponencie, redukując, tym samym, warstwę połączeniową.

```js
export const useCharacters = () => {
  const dispatch = useDispatch();
  const props = useSelector((state) => ({
    characters: state.characters.characters,
    character: state.characters.character,
    error: state.characters.error,
    fetchingCharacters: state.characters.fetchingCharacters
  }))

  return {
    ...props,
    getCharacters: () => dispatch(getCharacters()),
    getCharacter: (url) => dispatch(getCharacter(url)),
  }
}
```

Jest to warstwa abstrakcji, którą śmiało możemy dołączyć do modułu w komponencie.

Żeby jej użyć musimy przepisać komponent klasowy na funkcyjny.

```js
const Characters = () => {
  const {
    fetchingCharacters, characters, character, getCharacter,
  } = useCharacters();

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
```

## Middlewary na ratunek.

Jestem dumny z takiego zmodularyzowania aplikacji ale pojawia się jeden problem.
Co jeśli będzie potrzeba skorzystania z części store'a, który się jeszcze nie załadował?

Ogólnie możemy asynchronicznie wczytać moduł który jest nam potrzebny w każdym miejscu. Na pomoc może również przydać się utworzenie middlewara, który będzie tym zarządzał.
Potrzebna będzie wtedy lista wszystkich reducerów zdefiniowana w pliku konfiguracyjnym. Jeśli zostanie wywołana akcja, która pochodzi z niewpiętego modułu, middleware załaduje ten moduł przed wywołaniem akcji.

## Context API vs redux.

Jest bardzo dużo opinii na ten temat. Właściwie co developer to inne zdanie. Słyszałem również poniekąd, że "redux jest stary i teraz mamy context API więc jest to niepotrzebna abstrakcja". Porównajmy więc oba rozwiązania.

### Złożoność

Context API (z uwagi na hooki) jest w mojej opinii bardziej "naturalnym dla reacta" rozwiązaniem, które można zastosować do utworzenia zewnętrznego stanu komponentów.
Taki stan jest prosty i nie zmusza developerów do zapoznawania się z nowym narzędziem w postaci osobnej biblioteki. Nie wprowadza nowych warstw abstrakcji, jedynie tworzy możliwość "zdalnego" przekazywania propsów do komponentów.

Redux jest dość skomplikowanym rozwiązaniem, które, użyte w projekcie, wymaga od nowych osób wdrożenia się w nową technologię, zapoznania się z nowymi bibliotekami. Nieodpowiednio użyty pogarsza czytelność kodu i może doprowadzić do ślepej uliczki.
Potrzeba też napisać więcej kodu aby obsłużyć daną potrzebę biznesową.

### Struktura

Context API jest prostym rozwiązaniem, które daje niewiele możliwości. Oczywiście może być zastosowany jako zewnętrzny stan ale zawsze musi się znajdować w drzewie komponentów. Ciężko tutaj o płaską strukturę wielu kontekstów. Często zachodzi potrzeba skorzystania z wewnętrznego kontekstu na zewnątrz. Prowadzi to do komplikacji.

Redux pod tym względem według mnie wygrywa, gdyż jest kompletnie zewnętrznym stanem do którego podpinamy się z komponentami. Możemy w nim utworzyć strukturę stanów, które mogą reagować między sobą na swoje zmiany. Daje to potężne możliwości.

### Devtools

Context API jest dostępne dla developera w react-devtools, w zakładce Components. Przeklikując się po drzewie komponentów widzimy możliwość podejrzenia stanu kontekstu, podobnie jak stanu komponentów. Właściwie to wszystko.

W reduxie mamy dostępne redux-devtools. W rozszerzeniu tym mamy szereg możliwości, które z pewnością przysłużą się w debugowaniu kodu. Możemy zobrazować sobie strukturę danych w store, automatycznie wygenerować testy, cofnąć się do porządanej akcji. Przeniesienie stanu komponentu do reduxa pozwala "obrać właściwą ścieżkę" pozbywając się niepotrzebnych akcji. Jest to bardzo wdzięczne narzędzie, z pewnością ułatwiające utrzymanie aplikacji.

### Memoizacja

React pozwala na memoizowanie swojego stanu poprzez używanie hooków. Jest to sprawdzone API, które jest bardzo czytelne.

W redux'ie za memoizację odpowiedzialne są selektory. Są to dużo bardziej rozbudowane funkcje, które moim zdaniem dają więcej możliwości, choć czasami mogą wydawać się trochę za bardzo rozbudowane.