import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import question from '../../img/no-image.png';
import './Pokemon.css';
import statsColors from '../../utils/data';
import { selectSelectedPokemon, selectLoadingStatus } from '../../store/reducers/pokemons';

export default function Pokemon() {
  const loaded = useSelector(selectLoadingStatus);
  const pokemon = useSelector(selectSelectedPokemon);

  console.log(loaded);

  // сделать классы для изображений и подписей

  return (
    !loaded

      ? (
        <div className="pokemon">
          <button type="button">Back</button>
          <div className="pokemon__data">

            <div className="pokemon__name">
              <h3 className="pokemon__header-name">{pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}</h3>
              <h3 className="pokemon__header-name">
                #
                {pokemon?.id}
              </h3>
            </div>
            <div className="pokemon__photos">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img className="pokemon__photo" src={pokemon?.sprites.front_default === null ? question : pokemon?.sprites.front_default} alt="front-view" />
                <p style={{ color: 'aliceblue' }}>Front pixel view</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img className="pokemon__photo" src={pokemon?.sprites.other['official-artwork'].front_default === null ? question : pokemon?.sprites.other['official-artwork'].front_default} alt="hd-sprite-front" />
                <p style={{ color: 'aliceblue' }}>Front HD view</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img className="pokemon__photo" src={pokemon?.sprites.back_default === null ? question : pokemon?.sprites.back_default} alt="back-view" />
                <p style={{ color: 'aliceblue' }}>Back pixel view</p>
              </div>

            </div>
            <div className="pokemon__info">
              <div className="pokemon__info-block">
                <h4 className="pokemon__header">Type:</h4>
                {pokemon?.types.map((type) => (
                  <p key={type.slot} className="pokemon__text">
                    {type.type.name.charAt(0).toUpperCase()
                + type.type.name.slice(1)}
                  </p>
                ))}

              </div>
              <div className="pokemon__info-block">
                <h4 className="pokemon__header">Dimensions:</h4>
                <p className="pokemon__text">
                  Height:&nbsp;
                  {pokemon?.height}
                </p>
                <p className="pokemon__text">
                  Weight:&nbsp;
                  {pokemon?.weight}
                </p>
              </div>
              <div className="pokemon__info-block">
                <h4 className="pokemon__header">Abilities:</h4>
                {pokemon?.abilities.map((el) => (
                  <p key={el.name} className="pokemon__text">
                    {el.ability.name.charAt(0).toUpperCase() + el.ability.name.slice(1)}
                  </p>
                ))}
              </div>
            </div>
            <h4 className="pokemon__header">Stats:</h4>
            <div className="pokemon__stats">

              {pokemon?.stats.map((el) => (
                <React.Fragment key={el.name}>
                  <p className="pokemon__text">{`${el.stat.name.toLocaleUpperCase()}: ${el.base_stat}`}</p>
                  <div className="pokemon__stats-line">
                    <div style={{
                      height: '50%',
                      width: `${el.base_stat}%`,
                      backgroundColor: `${statsColors[el.stat.name]}`,
                      margin: '0 2px 0 2px',
                      borderRadius: '15px',
                    }}
                    />
                  </div>
                </React.Fragment>

              ))}
            </div>

          </div>
          <div className="pokemon__discription" />
        </div>
      ) : <Loader />

  );
}
