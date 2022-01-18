import { useEffect, useState } from 'react';
import axios from 'axios';

function Pokemon({ name, url }) {
  const [sprite, setSprite] = useState({});
  const [types, settypes] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setSprite(res.data.sprites.other['official-artwork'].front_default);
        settypes(res.data.types);
        setId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  return (
    <div>
      <h1>{name}</h1>
      <h3>Pokedex index: {id}</h3>
      <div>
        {types.map((type) => (
          <span key={type.type.name}>{type.type.name}</span>
        ))}
      </div>
      <img src={sprite} alt="" />
    </div>
  );
}

export default Pokemon;
