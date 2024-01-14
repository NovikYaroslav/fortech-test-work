import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import {
  // selectAllPokemonsData,
  selectAllPokemonsAmount,
  selectCurrentPokemonList,
  selectPerPageAmount,
  selectActivePage,
  selectFiltredPokemonsList,
  setPerPageAmount,
  setActivePage,
  setFiltredPokemonsData,
  setLoaded,
  setLoading,
} from '../../store/reducers/pokemons';
import { calculateNewActivePage } from '../../utils/preparation-functions';
import amountToShow from '../../utils/const';
import './Pagination.css';

// ugly code. eslint errors. hosting of functions ignored.

export default function Pagination() {
  const dispatch = useDispatch();
  const amountPerPage = useSelector(selectPerPageAmount);
  const activePage = useSelector(selectActivePage);
  const currentPokemons = useSelector(selectCurrentPokemonList);
  const filtredPokemons = useSelector(selectFiltredPokemonsList);
  // const allPokemons = useSelector(selectAllPokemonsData);
  const pokemonsAmount = useSelector(selectAllPokemonsAmount);
  const pageCount = Math.ceil(pokemonsAmount / amountPerPage);

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

  function handlePokemonList(newActivePage, newAmountPerPage) {
    const startIndex = newActivePage * newAmountPerPage;
    const endIndex = startIndex + newAmountPerPage;
    const paginatedPokemons = currentPokemons.slice(startIndex, endIndex);
    dispatch(setLoading());
    fetchPaginatedPokemons(paginatedPokemons);
  }

  function handlePageClick(event) {
    const newActivePage = event.selected;
    dispatch(setLoading());
    dispatch(setActivePage(newActivePage));
    handlePokemonList(newActivePage, amountPerPage);
  }

  function handleAmountButtonClick(amount) {
    const totalItems = filtredPokemons.length > 0 ? filtredPokemons.length : pokemonsAmount;
    const newActivePage = calculateNewActivePage(activePage, amount, totalItems, amountPerPage);
    dispatch(setActivePage(newActivePage));
    dispatch(setPerPageAmount(amount));
    handlePokemonList(newActivePage, amount);
  }

  useEffect(() => {
    if (currentPokemons) {
      handlePokemonList(activePage, amountPerPage);
    }
  }, [currentPokemons]);

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
