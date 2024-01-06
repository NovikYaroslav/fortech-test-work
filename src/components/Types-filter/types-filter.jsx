import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  selectAllPokemonsTypesList,
  resetFiltredPokemonsList,
  setSelectedTypes,
  removeSelectedTypes,
  setActivePage,
} from '../../store/reducers/pokemons';
import { fetchPokemonsWithTypes } from '../../store/actions/asyncActions';
import { typesColors } from '../../utils/data';
import './types-filter.css';

export default function TypesFilter() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const pokemonsTypes = useSelector(selectAllPokemonsTypesList);
  const [activeTags, setActiveTags] = useState([]);

  function onTagClick(typeName) {
    if (!activeTags.includes(typeName)) {
      setActiveTags((prevActiveTags) => [...prevActiveTags, typeName]);
    } else {
      setActiveTags((prevActiveTags) => prevActiveTags.filter((tag) => tag !== typeName));
      dispatch(removeSelectedTypes(typeName));
      searchParams.delete('types', activeTags);
      setSearchParams(searchParams);
    }
  }

  function onClearClick() {
    dispatch(resetFiltredPokemonsList());
    dispatch(setActivePage(0));
    activeTags.forEach((tag) => dispatch(removeSelectedTypes(tag)));

    searchParams.delete('types', activeTags);
    setSearchParams(searchParams);
    setActiveTags([]);
  }

  useEffect(() => {
    if (activeTags.length === 1) {
      dispatch(setActivePage(0));
    }
  }, [activeTags]);

  useEffect(() => {
    if (activeTags.length > 0) {
      dispatch(setSelectedTypes(activeTags));
      dispatch(fetchPokemonsWithTypes(activeTags));
      searchParams.set('types', activeTags);
      setSearchParams(searchParams);
    } else {
      dispatch(resetFiltredPokemonsList());
      dispatch(setActivePage(0));
      activeTags.forEach((tag) => dispatch(removeSelectedTypes(tag)));
      searchParams.delete('types', activeTags);
      setSearchParams(searchParams);
    }
  }, [activeTags]);

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
      {activeTags.length > 0 ? <button className="types-filter__types-tag" type="button" style={{ backgroundColor: 'red' }} onClick={onClearClick}>Clear all</button> : null}

    </div>
  );
}
