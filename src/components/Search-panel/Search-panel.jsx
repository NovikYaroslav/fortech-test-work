import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  setPokemonsListByName,
  setFiltredPokemonsListByName,
  resetFiltredPokemonsList,
  resetNotFoundStatus,
  selectSelectedPokemonsTypes,
  selectFiltredPokemonsList,
} from '../../store/reducers/pokemons';
import { fetchPokemonsWithTypes } from '../../store/actions/asyncActions';
import dismiss from '../../img/dismiss.png';
import useDebounce from '../../hooks/useDebounce';

import './Search-panel.css';

export default function SearchPanel() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  const selectedTypes = useSelector(selectSelectedPokemonsTypes);
  const filtredPokemons = useSelector(selectFiltredPokemonsList);
  const [pokemonName, setPokemonName] = useState('');
  const [debouncedName, isPending] = useDebounce(pokemonName, 500);

  useEffect(() => {
    if (debouncedName) {
      if (selectedTypes.length > 0) {
        dispatch(setFiltredPokemonsListByName(debouncedName));
      } else {
        dispatch(setPokemonsListByName(debouncedName));
      }
    }
  }, [debouncedName]);

  useEffect(() => {
    if (search) {
      setPokemonName(search);
    }
  }, []);

  useEffect(() => {
    if (!pokemonName) {
      searchParams.delete('search');
      setSearchParams(searchParams);
    } else {
      searchParams.set('search', pokemonName);
      setSearchParams(searchParams);
    }
  }, [pokemonName]);

  function handleSearchCancelClick() {
    if (selectedTypes.length > 0) {
      setPokemonName('');
      searchParams.delete('search');
      setSearchParams(searchParams);
      dispatch(fetchPokemonsWithTypes(selectedTypes));
      dispatch(resetNotFoundStatus());
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
      setPokemonName('');
      dispatch(resetFiltredPokemonsList());
      dispatch(resetNotFoundStatus());
    }
  }
  useEffect(() => {
    if (pokemonName === '' && !isPending && filtredPokemons.length) {
      handleSearchCancelClick();
    }
  }, [pokemonName, isPending]);

  return (
    <div className="search-panel">

      <form className="search-panel__form">
        <input
          placeholder="Search by name"
          value={pokemonName}
          onChange={(evt) => setPokemonName(evt.target.value)}
          className="search-panel__input"
        />
      </form>
      {pokemonName.length > 0 ? (
        <button className="search-panel__button" onClick={handleSearchCancelClick} type="button">
          <img className="search-panel__button-image" src={dismiss} alt="cancel" />
        </button>
      ) : null}
    </div>
  );
}
