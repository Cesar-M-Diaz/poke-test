import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/components/Pokemon.scss';

function Pokemon({ name, url }) {
  const [sprite, setSprite] = useState({});
  const [type, settype] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setSprite(res.data.sprites.other['official-artwork'].front_default);
        settype(res.data.types[0].type.name);
        setId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  return (
    <div className="pokemon__body">
      <h1>{name}</h1>
      <h3>Pokedex index: {id}</h3>
      <h4>type: {type}</h4>
      <img src={sprite} alt="pokemon sprite" />
    </div>
  );
}

export default Pokemon;
