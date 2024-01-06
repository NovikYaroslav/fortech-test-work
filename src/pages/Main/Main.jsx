import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ActionsPanel from '../../components/Actions-panel/Actitions-panel';
import Pagination from '../../components/Pagination/Pagination';
import List from '../../components/List/List';
import NotFound from '../../components/Not-found/Not-found';
import {
  selectNotFoundStatus,
  // selectAllPokemonsData,
  // setPokemonsListByName,
  // setFiltredPokemonsListByName,
  setActivePage,
  setPerPageAmount,
  // setSelectedTypes,
} from '../../store/reducers/pokemons';
import './Main.css';

export default function Main() {
  const dispatch = useDispatch();
  // const allPokemons = useSelector(selectAllPokemonsData);
  const pokemonsNotFound = useSelector(selectNotFoundStatus);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // const types = searchParams.getAll('types');
    const page = Number(searchParams.get('currentPage'));
    const item = Number(searchParams.get('itemsPerPage'));

    // Good to write like this
    // page && dispatch(setActivePage(page - 1));
    // item && dispatch(setPerPageAmount(item));
    // But Eslint no-unused-expressions error

    if (page) {
      dispatch(setActivePage(page - 1));
    }
    if (item) {
      dispatch(setPerPageAmount(item));
    }
    // const search = searchParams.get('searchValue') || '';

    // if (types.length) {
    //   dispatch(setSelectedTypes(types.join('').split(',')));
    //   dispatch(setActivePage(page));
    //   dispatch(setPerPageAmount(item));
    //   // dispatch(setPokemonsListByName(search));
    // } else {
    // page ? dispatch(setActivePage(page - 1)) : null;
    // item ? dispatch(setPerPageAmount(item)) : null;
    // dispatch(setFiltredPokemonsListByName(search));
    // }
  }, []);

  return (
    <main className="main">
      <ActionsPanel />
      {pokemonsNotFound
        ? <NotFound />
        : (
          <>
            <Pagination />
            <List />
          </>
        )}

    </main>
  );
}
