import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPokemonsTypesList, resetCurrentPokemonsList } from '../../store/reducers/pokemons';
import { fetchPokemonsWithTypes } from '../../store/actions/asyncActions';
import { typesColors } from '../../utils/data';
import './types-filter.css';

export default function TypesFilter() {
  const dispatch = useDispatch();
  const pokemonsTypes = useSelector(selectAllPokemonsTypesList);
  const [activeTags, setActiveTags] = useState([]);

  function onTagClick(typeName) {
    if (!activeTags.includes(typeName)) {
      setActiveTags((prevActiveTags) => [...prevActiveTags, typeName]);
      dispatch(fetchPokemonsWithTypes(typeName));
    } else {
      setActiveTags((prevActiveTags) => prevActiveTags.filter((tag) => tag !== typeName));
      dispatch(fetchPokemonsWithTypes(typeName));
    }
  }

  function onClearClick() {
    dispatch(resetCurrentPokemonsList());
    setActiveTags([]);
  }

  return (
    <div className="types-filter">
      {pokemonsTypes?.map((type) => (
        <button
          className={`types-filter__types-tag ${activeTags.includes(type.name) ? 'active' : ''}`}
          key={type.name}
          style={{
            backgroundColor: activeTags.includes(type.name) ? typesColors[type.name] : '',
          }}
          onClick={() => onTagClick(type.name)}
          type="button"
        >
          {type.name}
        </button>
      ))}
      <button className="types-filter__types-tag" type="button" onClick={onClearClick}>Clear all</button>
    </div>
  );
}
