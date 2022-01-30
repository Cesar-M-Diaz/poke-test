import React from 'react';
import axios from 'axios';
import '../assets/styles/components/Pokemon.scss';

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sprite: '',
      type: '',
      id: '',
    };
  }

  componentDidMount() {
    const { imageLoaded } = this.props;
    axios
      .get(this.props.url)
      .then((res) => {
        this.setState({
          sprite: res.data.sprites.other['official-artwork'].front_default,
          type: res.data.types[0].type.name,
          id: res.data.id,
        });
      })
      .then(() => imageLoaded('state lifted'))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="pokemon__body">
        <h1>{this.props.name}</h1>
        <h3>Pokedex index: {this.state.id}</h3>
        <h4>type: {this.state.type}</h4>
        <img src={this.state.sprite} alt="pokemon sprite" />
      </div>
    );
  }
}

export default Pokemon;
