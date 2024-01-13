import React from 'react';
import { useSelector } from 'react-redux';
// import { useSearchParams } from 'react-router-dom';
import ActionsPanel from '../../components/Actions-panel/Actitions-panel';
import Pagination from '../../components/Pagination/Pagination';
import List from '../../components/List/List';
import NotFound from '../../components/Not-found/Not-found';
import {
  // selectAllPokemonsData,
  // selectFiltredPokemonsList,
  selectNotFoundStatus,
  // setPokemonsListByName,
  // setActivePage,
  // setPerPageAmount,
  // setSelectedTypes,
  // selectActivePage,
  // selectPerPageAmount,
  // selectSelectedPokemonsTypes,
  // selectSearchName,
} from '../../store/reducers/pokemons';
import './Main.css';
import UrlHandler from '../../components/Url-Handler/Url-Hander';

export default function Main() {
  // const dispatch = useDispatch();
  const pokemonsNotFound = useSelector(selectNotFoundStatus);
  // const allPokemons = useSelector(selectAllPokemonsData);
  // const selectedTypes = useSelector(selectSelectedPokemonsTypes);
  // const activePage = useSelector(selectActivePage);
  // const amountPerPage = useSelector(selectPerPageAmount);
  // const searchName = useSelector(selectSearchName);
  // // const filtredPokemons = useSelector(selectFiltredPokemonsList);
  // const [searchParams, setSearchParams] = useSearchParams();

  // console.log('render');

  // useEffect(() => {
  //   const types = searchParams.getAll('types');
  //   const page = Number(searchParams.get('currentPage'));
  //   const item = Number(searchParams.get('itemsPerPage'));
  //   const search = searchParams.get('search');
  //   // Good to write like this
  //   // page && dispatch(setActivePage(page - 1));
  //   // item && dispatch(setPerPageAmount(item));
  //   // etc
  //   // But Eslint no-unused-expressions error
  //   if (page) {
  //     dispatch(setActivePage(page - 1));
  //   }
  //   if (item) {
  //     dispatch(setPerPageAmount(item));
  //   }
  //   if (types.length) {
  //     console.log('выставляю типы из url на главной');
  //     types.join('').split(',').forEach((type) => {
  //       dispatch(setSelectedTypes(type));
  //     });
  //   }
  //   if (search && allPokemons) {
  //     dispatch(setPokemonsListByName(search));
  //   }
  // }, [allPokemons]);

  // // Работает, но вызывает рендер всей страницы. нужно перенести.
  // useEffect(() => {
  //   searchParams.set('currentPage', activePage + 1);
  //   searchParams.set('itemsPerPage', amountPerPage);
  //   if (selectedTypes.length) {
  //     searchParams.set('types', [...new Set(selectedTypes)]);
  //   }
  //   if (!selectedTypes.length) {
  //     searchParams.delete('types');
  //   }
  //   if (!searchName) {
  //     searchParams.delete('search');
  //   }
  //   if (searchName) {
  //     searchParams.set('search', searchName);
  //   }
  //   setSearchParams(searchParams);
  // }, [activePage, amountPerPage, selectedTypes, searchName]);

  return (
    <main className="main">
      <UrlHandler />
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
