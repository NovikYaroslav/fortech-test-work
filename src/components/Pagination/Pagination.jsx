import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {
  selectAllPokemonsData,
  selectAllPokemonsAmount,
  selectPerPageAmount,
  selectActivePage,
  selectFiltredPokemonsList,
  setPerPageAmount,
  setActivePage,
  setFiltredPokemonsData,
  setLoaded,
  setLoading,
  selectSelectedPokemonsTypes,
} from '../../store/reducers/pokemons';
import amountToShow from '../../utils/const';
import './Pagination.css';

// ugly code. eslint errors. hosting of functions ignored.

export default function Pagination() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const amountPerPage = useSelector(selectPerPageAmount);
  const activePage = useSelector(selectActivePage);
  const selectedTypes = useSelector(selectSelectedPokemonsTypes);
  const filtredPokemons = useSelector(selectFiltredPokemonsList);
  const allPokemons = useSelector(selectAllPokemonsData);
  const pokemonsAmount = useSelector(selectAllPokemonsAmount);

  const pageCount = Math.ceil(
    filtredPokemons.length > 0
      ? filtredPokemons.length / amountPerPage
      : pokemonsAmount / amountPerPage,
  );

  // function to fetch poks from paginatedPoksList
  function fetchPaginatedPokemons(pokemons) {
    Promise.all(
      pokemons.map((el) => fetch(`https://pokeapi.co/api/v2/pokemon/${el.name}`).then((response) => response.json())),
    )
      .then((data) => {
        dispatch(setFiltredPokemonsData(data));
        dispatch(setLoaded());
      })
      .catch((error) => {
        console.error(error);
        dispatch(setLoaded());
      });
  }

  // function to calculate new Active page if amountPerPage changed
  function calculateNewActivePage(currentActivePage, newAmountPerPage, totalItems) {
    const newActivePage = Math.floor((currentActivePage * amountPerPage) / newAmountPerPage);
    return Math.min(newActivePage, Math.ceil(totalItems / newAmountPerPage) - 1);
  }

  // function to make new paginated list of poks, according to selected amount and page
  function handlePokemonList(newActivePage, newAmountPerPage) {
    const startIndex = newActivePage * newAmountPerPage;
    const endIndex = startIndex + newAmountPerPage;

    let paginatedPokemons;

    if (filtredPokemons && filtredPokemons.length > 0) {
      paginatedPokemons = filtredPokemons.slice(startIndex, endIndex);
    } else if (allPokemons && allPokemons.length > 0) {
      paginatedPokemons = allPokemons.slice(startIndex, endIndex);
    } else {
      paginatedPokemons = [];
    }

    if (paginatedPokemons.length === 0) {
      dispatch(setFiltredPokemonsData([]));
      dispatch(setLoaded());
    } else {
      dispatch(setLoading());
      fetchPaginatedPokemons(paginatedPokemons);
    }
  }

  // function to set new active page
  function handlePageClick(event) {
    const newActivePage = event.selected;
    dispatch(setLoading());
    dispatch(setActivePage(newActivePage));
    handlePokemonList(newActivePage, amountPerPage);
  }

  // function to set new amount
  function handleAmountButtonClick(amount) {
    const totalItems = filtredPokemons.length > 0 ? filtredPokemons.length : pokemonsAmount;
    const newActivePage = calculateNewActivePage(activePage, amount, totalItems);
    dispatch(setActivePage(newActivePage));
    dispatch(setPerPageAmount(amount));
    handlePokemonList(newActivePage, amount);
  }

  // effect to make new paginated poks list according to choosen filters / page / amount
  useEffect(() => {
    handlePokemonList(activePage, amountPerPage);
  }, [allPokemons, filtredPokemons]);

  // effect to set search params according active page and amount
  useEffect(() => {
    searchParams.set('currentPage', activePage + 1);
    searchParams.set('itemsPerPage', amountPerPage);
    searchParams.set('types', selectedTypes);
    setSearchParams(searchParams);
  }, [amountPerPage, activePage, selectedTypes]);

  return (
    <div className="pagination">
      <div className="pagination__count">
        {amountToShow.map((amount) => (
          <button
            className={`pagination__count-amount ${
              amountPerPage === amount ? 'pagination__count-amount_current' : null
            }`}
            onClick={() => handleAmountButtonClick(amount)}
            key={amount}
            type="button"
          >
            {amount}
          </button>
        ))}
      </div>
      <ReactPaginate
        forcePage={activePage}
        pageCount={pageCount}
        containerClassName="pagination__list"
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={(evt) => handlePageClick(evt)}
        pageLinkClassName="pagination__list-page"
        activeLinkClassName="pagination__list-active-page"
        previousLinkClassName="pagination__list-previous-page"
        nextLinkClassName="pagination__list-next-page"
      />
    </div>
  );
}
