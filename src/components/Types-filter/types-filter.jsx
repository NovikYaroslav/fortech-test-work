import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  selectAllPokemonsTypesList,
  selectSelectedPokemonsTypes,
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
  const selectedTypes = useSelector(selectSelectedPokemonsTypes);

  function onTagClick(typeName) {
    dispatch(setSelectedTypes(typeName));
  }

  function onClearClick() {
    dispatch(resetFiltredPokemonsList());
    dispatch(setActivePage(0));
    selectedTypes.forEach((tag) => dispatch(removeSelectedTypes(tag)));
    console.log('удаляю типы из url на фильтрах');
    searchParams.delete('types', selectedTypes);
    setSearchParams(searchParams);
  }

  useEffect(() => {
    if (selectedTypes.length === 1) {
      dispatch(setActivePage(0));
    }
  }, [selectedTypes]);

  useEffect(() => {
    if (selectedTypes.length > 0) {
      dispatch(fetchPokemonsWithTypes(selectedTypes));
      console.log('выставляю типы из url на в фильтрах');
      console.log(selectedTypes);
      console.log(searchParams.getAll('types'));
      searchParams.set('types', selectedTypes);
      setSearchParams(searchParams);
    } else {
      dispatch(resetFiltredPokemonsList());
      selectedTypes.forEach((tag) => dispatch(removeSelectedTypes(tag)));
      // console.log('удаляю типы из url на фильтрах');
      // searchParams.delete('types', selectedTypes);
      // setSearchParams(searchParams);
    }
  }, [selectedTypes]);

  useEffect(() => {
    searchParams.set('types', selectedTypes);
    setSearchParams(searchParams);
  }, [selectedTypes]);

  return (
    <div className="types-filter">
      {pokemonsTypes?.map((type) => (
        <button
          className={`types-filter__types-tag ${selectedTypes.includes(type.name) ? 'active' : ''}`}
          key={type.name}
          style={{
            backgroundColor: selectedTypes.includes(type.name) ? typesColors[type.name] : '',
          }}
          onClick={() => onTagClick(type.name)}
          type="button"
        >
          {type.name}
        </button>
      ))}
      {selectedTypes.length > 0 ? <button className="types-filter__types-tag" type="button" style={{ backgroundColor: 'red' }} onClick={onClearClick}>Clear all</button> : null}

    </div>
  );
}
