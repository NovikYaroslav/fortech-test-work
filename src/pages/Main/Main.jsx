import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ActionsPanel from '../../components/Actions-panel/Actitions-panel';
import Pagination from '../../components/Pagination/Pagination';
import List from '../../components/List/List';
import NotFound from '../../components/Not-found/Not-found';
import {
  selectNotFoundStatus,
  selectAllPokemonsData,
  selectSelectedPokemonsTypes,
  setActivePage,
  setPerPageAmount,
  setSelectedTypes,
  setSearchName,
} from '../../store/reducers/pokemons';
import './Main.css';

export default function Main() {
  const pokemonsNotFound = useSelector(selectNotFoundStatus);
  const dispatch = useDispatch();
  const allPokemons = useSelector(selectAllPokemonsData);
  const selectedTypes = useSelector(selectSelectedPokemonsTypes);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const types = searchParams.getAll('types');
    const page = Number(searchParams.get('currentPage'));
    const item = Number(searchParams.get('itemsPerPage'));
    const search = searchParams.get('search');
    // Good to write like this
    // page && dispatch(setActivePage(page - 1));
    // item && dispatch(setPerPageAmount(item));
    // etc
    // But Eslint no-unused-expressions error
    if (types.length && !selectedTypes.length) {
      types
        .join('')
        .split(',')
        .forEach((type) => {
          dispatch(setSelectedTypes(type));
        });
    }
    if (page) {
      dispatch(setActivePage(page - 1));
    }
    if (item) {
      dispatch(setPerPageAmount(item));
    }
    if (search) {
      dispatch(setSearchName(search));
    }
  }, [allPokemons]);

  return (
    <main className="main">
      <ActionsPanel />
      {pokemonsNotFound ? (
        <NotFound />
      ) : (
        <>
          <Pagination />
          <List />
        </>
      )}
    </main>
  );
}
