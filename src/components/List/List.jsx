import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import {
  selectActivePage,
  selectCurrentPokemonList,
  selectFiltredPokemonsData,
  selectLoadingStatus,
  selectPerPageAmount,
  setFiltredPokemonsData,
  setLoaded,
  setLoading,
} from '../../store/reducers/pokemons';
import { prepareTypes } from '../../utils/preparation-functions';
import './List.css';

export default function List() {
  const dispatch = useDispatch();
  const pokemonsData = useSelector(selectFiltredPokemonsData);
  const activePage = useSelector(selectActivePage);
  const amountPerPage = useSelector(selectPerPageAmount);
  const currentPokemons = useSelector(selectCurrentPokemonList);
  const loading = useSelector(selectLoadingStatus);

  useEffect(() => {
    console.log('запрашиваю');
    const startIndex = activePage * amountPerPage;
    const endIndex = startIndex + amountPerPage;
    const paginatedPokemons = currentPokemons.slice(startIndex, endIndex);
    dispatch(setLoading());
    Promise.all(
      paginatedPokemons.map((el) => fetch(`https://pokeapi.co/api/v2/pokemon/${el.name}`).then((response) => response.json())),
    )
      .then((data) => {
        dispatch(setFiltredPokemonsData(data));
        dispatch(setLoaded());
      })
      .catch((error) => {
        console.error(error);
        dispatch(setLoaded());
      });
  }, [activePage, amountPerPage, currentPokemons]);

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
