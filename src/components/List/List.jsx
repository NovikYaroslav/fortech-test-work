import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import {
  selectFiltredPokemonsData,
  selectLoadingStatus,
} from '../../store/reducers/pokemons';
import { prepareTypes } from '../../utils/preparation-functions';
import './List.css';

export default function List() {
  const pokemonsData = useSelector(selectFiltredPokemonsData);
  const loading = useSelector(selectLoadingStatus);

  return (
    loading ? (
      <Loader />
    ) : (
      <ul className="list">
        {pokemonsData?.map((pokemon) => (
          <Card
            id={pokemon.id}
            name={pokemon.name}
            avatar={pokemon.sprites.front_default}
            type={prepareTypes(pokemon.types)}
            hp={pokemon.stats.find((el) => el.stat.name === 'hp').base_stat}
            attack={pokemon.stats.find((el) => el.stat.name === 'attack').base_stat}
            defense={pokemon.stats.find((el) => el.stat.name === 'defense').base_stat}
            key={pokemon.id}
          />
        ))}
      </ul>
    )
  );
}
