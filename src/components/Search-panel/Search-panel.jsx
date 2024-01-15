import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  selectSelectedPokemonsTypes,
  selectSearchName,
  setPokemonsListByName,
  setSearchName,
  setCurrentPokemonList,
  resetNotFoundStatus,
  resertToInitialFilteredPokemons,
} from '../../store/reducers/pokemons';
import dismiss from '../../img/dismiss.png';
import useDebounce from '../../hooks/useDebounce';
import './Search-panel.css';

export default function SearchPanel() {
  const dispatch = useDispatch();
  const selectedTypes = useSelector(selectSelectedPokemonsTypes);
  const searchName = useSelector(selectSearchName);
  const [debouncedName, isPending] = useDebounce(searchName, 500);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (debouncedName) {
      dispatch(setPokemonsListByName(debouncedName));
    }
  }, [debouncedName]);

  useEffect(() => {
    if (!searchName) {
      searchParams.delete('search');
    }
    if (searchName) {
      searchParams.set('search', searchName);
    }
    setSearchParams(searchParams);
  }, [searchName]);

  function handleSearchCancelClick() {
    if (selectedTypes.length) {
      dispatch(setSearchName(''));
      dispatch(resertToInitialFilteredPokemons());
      dispatch(resetNotFoundStatus());
    } else {
      dispatch(setSearchName(''));
      dispatch(setCurrentPokemonList());
      dispatch(resetNotFoundStatus());
    }
  }

  function setPokemonName(name) {
    dispatch(setSearchName(name));
  }

  useEffect(() => {
    if (searchName === '' && !isPending) {
      handleSearchCancelClick();
    }
  }, [searchName, isPending]);

  return (
    <div className="search-panel">
      <form
        className="search-panel__form"
        onSubmit={(evt) => {
          evt.preventDefault();
        }}
      >
        <input
          placeholder="Search by name"
          value={searchName}
          onChange={(evt) => setPokemonName(evt.target.value)}
          className="search-panel__input"
        />
      </form>
      {searchName.length > 0 ? (
        <button
          className="search-panel__button"
          onClick={handleSearchCancelClick}
          type="button"
        >
          <img
            className="search-panel__button-image"
            src={dismiss}
            alt="cancel"
          />
        </button>
      ) : null}
    </div>
  );
}
