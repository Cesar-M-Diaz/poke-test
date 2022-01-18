import './App.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Pokemon from './components/pokemon';

function App() {
  const [listOffset, setListOffset] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${listOffset}&limit=10`)
      .then((res) => {
        setPokemons(res.data.results);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [listOffset]);

  const handleClickNext = () => {
    setListOffset(listOffset + 10);
  };
  const handleClickPrevious = () => {
    if (listOffset > 0) {
      setListOffset(listOffset - 10);
    } else {
      return;
    }
  };

  const handleSearch = () => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${search}`)
      .then((res) => {
        setPokemons([res.data]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setPokemons([]);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
          className="App-logo"
          alt="logo"
        />
      </header>
      <body>
        <section>
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
          <button onClick={handleSearch}>find Pokemon</button>
          <button onClick={handleClickNext}>next</button>
          <button onClick={handleClickPrevious}>back</button>
        </section>
        <section>
          {loading ? (
            <p>loading...</p>
          ) : pokemons.length === 1 ? (
            <div>
              <Pokemon
                key={pokemons[0].id}
                name={pokemons[0].name}
                url={`https://pokeapi.co/api/v2/pokemon/${pokemons[0].name}`}
              />
            </div>
          ) : pokemons.length === 0 ? (
            <p>no pokemon found</p>
          ) : (
            <div>
              {pokemons.map((pokemon) => (
                <Pokemon
                  key={pokemon.url}
                  name={pokemon.name}
                  url={pokemon.url}
                />
              ))}
            </div>
          )}
        </section>
      </body>
    </div>
  );
}

export default App;
