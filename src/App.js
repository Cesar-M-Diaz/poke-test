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
    setListOffset((prevState) => prevState + 10);
    setSearch('');
  };
  const handleClickPrevious = () => {
    setListOffset((prevState) => prevState - 10);
    setSearch('');
  };

  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const imageLoaded = (data) => {
    console.log(data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.length > 0) {
      setLoading(true);
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${search}`)
        .then((res) => {
          setPokemons([res.data]);
        })
        .catch(() => {
          setLoading(false);
          setPokemons([]);
        });
    } else {
      return;
    }
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
          <form className="App__search" onSubmit={handleSearch}>
            <input type="text" onChange={handleChange} value={search} />
            <button>find Pokemon</button>
          </form>
          <div className="App__navigation">
            <button onClick={handleClickPrevious} disabled={listOffset === 0}>
              previous
            </button>
            <button onClick={handleClickNext}>next</button>
          </div>
        </section>
        <section>
          {loading ? (
            <div className="App__single-container">
              <p>loading...</p>
            </div>
          ) : pokemons.length === 1 ? (
            <div className="App__single-container">
              <Pokemon
                key={pokemons[0].id}
                name={pokemons[0].name}
                url={`https://pokeapi.co/api/v2/pokemon/${pokemons[0].name}`}
                imageLoaded={imageLoaded}
              />
            </div>
          ) : pokemons.length === 0 ? (
            <div className="App__single-container">
              <p>no pokemon found</p>
            </div>
          ) : (
            <div className="App__pokemons-container">
              {pokemons.map((pokemon) => (
                <Pokemon
                  key={pokemon.url}
                  name={pokemon.name}
                  url={pokemon.url}
                  imageLoaded={imageLoaded}
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
