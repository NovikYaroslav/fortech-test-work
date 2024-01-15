import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  selectAllPokemonsTypesList,
  selectSelectedPokemonsTypes,
  setSelectedTypes,
  removeSelectedTypes,
  setActivePage,
  setCurrentPokemonList,
  resetFiltredPokemonsList,
  setSearchName,
} from '../../store/reducers/pokemons';
import { fetchPokemonsWithTypes } from '../../store/actions/asyncActions';
import { typesColors } from '../../utils/data';
import './types-filter.css';

export default function TypesFilter() {
  const dispatch = useDispatch();
  const pokemonsTypes = useSelector(selectAllPokemonsTypesList);
  const selectedTypes = useSelector(selectSelectedPokemonsTypes);
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams);

  useEffect(() => {
    console.log('эффект для юрл типов');
    if (selectedTypes.length) {
      console.log('выставляю типы');
      searchParams.set('types', [...new Set(selectedTypes)]);
    }
    if (!selectedTypes.length) {
      searchParams.delete('types');
    }
    setSearchParams(searchParams);
  }, [selectedTypes]);

  useEffect(() => {
    if (!selectedTypes.length) {
      dispatch(setSearchName(''));
      dispatch(resetFiltredPokemonsList());
      dispatch(setCurrentPokemonList());
    }
    if (selectedTypes.length) {
      dispatch(fetchPokemonsWithTypes(selectedTypes));
    }
  }, [selectedTypes]);

  function onTagClick(typeName) {
    if (!selectedTypes.includes(typeName)) {
      dispatch(setSelectedTypes(typeName));
      dispatch(fetchPokemonsWithTypes([...selectedTypes, typeName]));
    } else {
      dispatch(removeSelectedTypes(typeName));
      dispatch(
        fetchPokemonsWithTypes(
          selectedTypes.filter((type) => type !== typeName),
        ),
      );
    }
  }

  function onClearClick() {
    dispatch(setActivePage(0));
    selectedTypes.forEach((tag) => dispatch(removeSelectedTypes(tag)));
  }

  return (
    <div className="types-filter">
      {pokemonsTypes?.map((type) => (
        <button
          className={`types-filter__types-tag ${
            selectedTypes.includes(type.name) ? 'active' : ''
          }`}
          key={type.name}
          style={{
            backgroundColor: selectedTypes.includes(type.name)
              ? typesColors[type.name]
              : '',
          }}
          onClick={() => onTagClick(type.name)}
          type="button"
        >
          {type.name}
        </button>
      ))}
      {selectedTypes.length > 0 ? (
        <button
          className="types-filter__types-tag"
          type="button"
          style={{ backgroundColor: 'red' }}
          onClick={onClearClick}
        >
          Clear all
        </button>
      ) : null}
    </div>
  );
}
