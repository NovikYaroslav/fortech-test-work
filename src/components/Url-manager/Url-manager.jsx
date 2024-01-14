import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  selectAllPokemonsData,
  setActivePage,
  setPerPageAmount,
  setSelectedTypes,
  selectActivePage,
  selectPerPageAmount,
  selectSelectedPokemonsTypes,
  selectSearchName,
  setSearchName,
} from '../../store/reducers/pokemons';

export default function UrlHandler() {
  const dispatch = useDispatch();
  const allPokemons = useSelector(selectAllPokemonsData);
  const selectedTypes = useSelector(selectSelectedPokemonsTypes);
  const activePage = useSelector(selectActivePage);
  const amountPerPage = useSelector(selectPerPageAmount);
  const searchName = useSelector(selectSearchName);
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams);

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
      types.join('').split(',').forEach((type) => {
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

  useEffect(() => {
    searchParams.set('currentPage', activePage + 1);
    searchParams.set('itemsPerPage', amountPerPage);
    if (selectedTypes.length) {
      searchParams.set('types', [...new Set(selectedTypes)]);
    }
    if (!selectedTypes.length) {
      searchParams.delete('types');
    }
    if (!searchName) {
      searchParams.delete('search');
    }
    if (searchName) {
      searchParams.set('search', searchName);
    }
    setSearchParams(searchParams);
  }, [activePage, amountPerPage, selectedTypes, searchName]);

  return null;
}
