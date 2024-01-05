import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFiltredPokemonsListByName,
  resetFiltredPokemonsList,
  resetNotFoundStatus,
  selectSelectedPokemonsTypes,
} from '../../store/reducers/pokemons';
import { fetchPokemonsWithTypes } from '../../store/actions/asyncActions';
import dismiss from '../../img/dismiss.png';
import useDebounce from '../../hooks/useDebounce';

import './Search-panel.css';

export default function SearchPanel() {
  const dispatch = useDispatch();
  const selectedTypes = useSelector(selectSelectedPokemonsTypes);
  const [pokemonName, setPokemonName] = useState('');
  const [debouncedName, isPending] = useDebounce(pokemonName, 500);

  useEffect(() => {
    if (debouncedName) {
      dispatch(setFiltredPokemonsListByName(debouncedName));
    }
  }, [debouncedName]);

  function handleSearchCancelClick() {
    if (selectedTypes.length > 0) {
      setPokemonName('');
      dispatch(fetchPokemonsWithTypes(selectedTypes));
      dispatch(resetNotFoundStatus());
    } else {
      setPokemonName('');
      dispatch(resetFiltredPokemonsList());
      dispatch(resetNotFoundStatus());
    }
  }

  useEffect(() => {
    if (pokemonName === '' && !isPending) {
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
