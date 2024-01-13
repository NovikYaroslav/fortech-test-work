import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  setPokemonsListByName,
  setFiltredPokemonsListByName,
  resetFiltredPokemonsList,
  resetNotFoundStatus,
  selectSelectedPokemonsTypes,
  selectFiltredPokemonsList,
  selectSearchName,
  setSearchName,
  setActivePage,
  setPerPageAmount,
} from '../../store/reducers/pokemons';
import { fetchPokemonsWithTypes } from '../../store/actions/asyncActions';
import dismiss from '../../img/dismiss.png';
import useDebounce from '../../hooks/useDebounce';

import './Search-panel.css';

export default function SearchPanel() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  // const search = searchParams.get('search');
  const selectedTypes = useSelector(selectSelectedPokemonsTypes);
  const filtredPokemons = useSelector(selectFiltredPokemonsList);
  const searchName = useSelector(selectSearchName);
  const [debouncedName, isPending] = useDebounce(searchName, 500);

  useEffect(() => {
    console.log('отрабатываю');
    if (debouncedName) {
      if (selectedTypes.length > 0) {
        dispatch(setActivePage(0));
        dispatch(setFiltredPokemonsListByName(debouncedName));
      } else {
        dispatch(setActivePage(0));
        dispatch(setPokemonsListByName(debouncedName));
      }
    }
  }, [debouncedName, filtredPokemons.length]);

  function handleSearchCancelClick() {
    if (selectedTypes.length > 0) {
      dispatch(setSearchName(''));
      searchParams.delete('search');
      setSearchParams(searchParams);
      dispatch(setActivePage(0));
      dispatch(setPerPageAmount(10));
      dispatch(fetchPokemonsWithTypes(selectedTypes));
      dispatch(resetNotFoundStatus());
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
      dispatch(setSearchName(''));
      dispatch(setActivePage(0));
      dispatch(setPerPageAmount(10));
      dispatch(resetFiltredPokemonsList());
      dispatch(resetNotFoundStatus());
    }
  }

  function setPokemonName(name) {
    dispatch(setSearchName(name));
  }

  useEffect(() => {
    if (searchName === '' && !isPending && filtredPokemons.length) {
      handleSearchCancelClick();
    }
  }, [searchName, isPending]);

  return (
    <div className="search-panel">

      <form className="search-panel__form">
        <input
          placeholder="Search by name"
          value={searchName}
          onChange={(evt) => setPokemonName(evt.target.value)}
          className="search-panel__input"
        />
      </form>
      {searchName.length > 0 ? (
        <button className="search-panel__button" onClick={handleSearchCancelClick} type="button">
          <img className="search-panel__button-image" src={dismiss} alt="cancel" />
        </button>
      ) : null}
    </div>
  );
}
