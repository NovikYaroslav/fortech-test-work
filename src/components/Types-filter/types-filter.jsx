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
  // const [activeTags, setActiveTags] = useState([]);

  console.log(selectedTypes);
  // console.log(activeTags);

  function onTagClick(typeName) {
    // if (!activeTags.includes(typeName)) {
    //   setActiveTags((prevActiveTags) => [...prevActiveTags, typeName]);
    // }
    // else {
    // setActiveTags((prevActiveTags) => prevActiveTags.filter((tag) => tag !== typeName));
    dispatch(setSelectedTypes(typeName));
    // dispatch(removeSelectedTypes(typeName));
    searchParams.delete('types', selectedTypes);
    setSearchParams(searchParams);
    // }
  }

  function onClearClick() {
    dispatch(resetFiltredPokemonsList());
    dispatch(setSelectedTypes([]));
    dispatch(setActivePage(0));
    selectedTypes.forEach((tag) => dispatch(removeSelectedTypes(tag)));
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
      searchParams.set('types', selectedTypes);
      setSearchParams(searchParams);
    } else {
      dispatch(resetFiltredPokemonsList());
      // dispatch(setActivePage(0));
      selectedTypes.forEach((tag) => dispatch(removeSelectedTypes(tag)));
      searchParams.delete('types', selectedTypes);
      setSearchParams(searchParams);
    }
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
