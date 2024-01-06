import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import NotFound from '../../components/Not-found/Not-found';
import question from '../../img/no-image.png';
import { statsColors, typesColors } from '../../utils/data';
import { selectSelectedPokemon, selectLoadingStatus } from '../../store/reducers/pokemons';
import { fetchSelectedPokemon } from '../../store/actions/asyncActions';
import prepareTypes from '../../utils/preparation-functions';
import './Pokemon.css';

export default function Pokemon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = useParams();
  const pokemonName = String(urlParams.name);
  const loaded = useSelector(selectLoadingStatus);
  const pokemon = useSelector(selectSelectedPokemon);

  useEffect(() => {
    dispatch(fetchSelectedPokemon(pokemonName));
  }, []);

  if (pokemon === undefined) {
    return (
      <div className="pokemon">
        <button className="pokemon__back-button" type="button" onClick={() => navigate(-1)}> </button>
        <NotFound />
      </div>
    );
  }

  return (
    !loaded

      ? (
        <div className="pokemon">
          <Link to="/" className="pokemon__back-button" type="button" />
          <div className="pokemon__data">

            <div className="pokemon__name">
              <h3 className="pokemon__header-name">{pokemon?.name?.charAt(0).toUpperCase() + pokemon?.name?.slice(1)}</h3>
              <h3 className="pokemon__header-name">
                #
                {pokemon?.id}
              </h3>
            </div>
            <div className="pokemon__photos">
              <div className="pokemon__photo-container">
                <img className="pokemon__photo" src={pokemon?.sprites.front_default === null ? question : pokemon?.sprites.front_default} alt="front-view" />
                <p className="pokemon__photo-capture">Front pixel view</p>
              </div>
              <div className="pokemon__photo-container">
                <img className="pokemon__photo" src={pokemon?.sprites.other['official-artwork'].front_default === null ? question : pokemon?.sprites.other['official-artwork'].front_default} alt="hd-sprite-front" />
                <p className="pokemon__photo-capture">HD view</p>
              </div>
              <div className="pokemon__photo-container">
                <img className="pokemon__photo" src={pokemon?.sprites.back_default === null ? question : pokemon?.sprites.back_default} alt="back-view" />
                <p className="pokemon__photo-capture">Back pixel view</p>
              </div>

            </div>
            <div className="pokemon__info">
              <div className="pokemon__info-block">
                <h4 className="pokemon__header">Type:</h4>
                {pokemon ? prepareTypes(pokemon.types).map((type) => (
                  <p key={type} className="pokemon__tag-type" style={{ backgroundColor: `${typesColors[type]}` }}>
                    {type.charAt(0).toUpperCase()
                + type.slice(1)}
                  </p>
                )) : null}

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
            {/* <h4 className="pokemon__header">Stats:</h4> */}
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
