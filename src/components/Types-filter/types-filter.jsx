import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPokemonsTypesList } from '../../store/reducers/pokemons';
import { fetchPokemonsWithTypes } from '../../store/actions/asyncActions';
import { typesColors } from '../../utils/const';
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
    }
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
      <button className="types-filter__types-tag" type="button">Clear all</button>
    </div>
  );
}
