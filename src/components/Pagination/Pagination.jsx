import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import {

  selectAllPokemonsAmount,
  selectCurrentPokemonList,
  selectPerPageAmount,
  selectActivePage,
  setPerPageAmount,
  setActivePage,
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
  const pokemonsAmount = useSelector(selectAllPokemonsAmount);
  const pageCount = Math.ceil(pokemonsAmount / amountPerPage);

  function handlePageClick(event) {
    const newActivePage = event.selected;
    dispatch(setLoading());
    dispatch(setActivePage(newActivePage));
  }

  function handleAmountButtonClick(amount) {
    const totalItems = currentPokemons.length > 0 ? currentPokemons.length : pokemonsAmount;
    const newActivePage = calculateNewActivePage(activePage, amount, totalItems, amountPerPage);
    dispatch(setActivePage(newActivePage));
    dispatch(setPerPageAmount(amount));
  }

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
