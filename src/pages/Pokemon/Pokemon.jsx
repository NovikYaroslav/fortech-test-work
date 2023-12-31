import React from 'react';
import './Pokemon.css';
import pokemon from '../../mocks/mock-pokemon';

export default function Pokemon() {
  return (
    <div className="pokemon">
      <div className="pokemon__data">

        <div className="pokemon__name">
          <p>Dizzy</p>
          <p>#0014</p>
        </div>
        <div className="pokemon__photos">
          <img className="pokemon__photo" src={pokemon.sprites.front_default} alt="front-view" />
          <img className="pokemon__photo" src={pokemon.sprites.other['official-artwork'].front_default} alt="hd-sprite-front" />
          <img className="pokemon__photo" src={pokemon.sprites.back_default} alt="back-view" />

        </div>
        <div className="pokemon__info">
          <div className="pokemon__type">
            <h3>Type:</h3>
            <p>Poison</p>
            <p>Poison</p>
          </div>
          <div className="pokemon__weeknesses">
            <h3>Weekness:</h3>
            <p>Poison</p>
            <p>Poison</p>
          </div>
          <div className="pokemon__abilities">
            <h3>Abilities:</h3>
            {pokemon.abilities.map((el) => (
              <p key={el.name}>
                {el.ability.name.charAt(0).toUpperCase() + el.ability.name.slice(1)}
              </p>
            ))}
          </div>
        </div>
        <h3>Stats:</h3>
        <div className="pokemon__stats">

          {pokemon.stats.map((el) => (
            <p key={el.name}>{`${el.stat.name.toLocaleUpperCase()}: ${el.base_stat}`}</p>
          ))}
        </div>

      </div>
      <div className="pokemon__discription" />
    </div>
  );
}
