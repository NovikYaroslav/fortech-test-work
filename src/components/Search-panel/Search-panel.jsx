import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPokemonsListByName, resetCurrentPokemonsList } from '../../store/reducers/pokemons';
import pokeball from '../../img/pokeball.png';
import dismiss from '../../img/dismiss.png';
import './Search-panel.css';

export default function SearchPanel() {
  const dispatch = useDispatch();
  const [pokemonName, setPokemonName] = useState('');

  // Add debounce

  useEffect(() => {
    if (pokemonName === '') {
      dispatch(resetCurrentPokemonsList());
    }
  }, [pokemonName]);

  function handleShowButtonClick(evt) {
    evt.preventDefault();
    dispatch(setCurrentPokemonsListByName(pokemonName));
  }

  function handleSearchCancelClick() {
    setPokemonName('');
    dispatch(resetCurrentPokemonsList());
  }

  return (
    <div className="search-panel">
      {pokemonName.length > 0 ? (
        <button className="action-button" onClick={handleSearchCancelClick} type="button">
          <img className="action-button-image" src={dismiss} alt="cancel" />
        </button>
      ) : null}

      <form className="search-panel__form">
        <input
          placeholder="Search by name"
          value={pokemonName}
          onChange={(evt) => setPokemonName(evt.target.value)}
          className="search-panel__input"
        />
        <button
          className="action-button"
          onClick={(evt) => handleShowButtonClick(evt)}
          type="submit"
          disabled={pokemonName === ''}
        >
          <img className="action-button-image" src={pokeball} alt="pokeball" />
        </button>
      </form>
    </div>
  );
}
