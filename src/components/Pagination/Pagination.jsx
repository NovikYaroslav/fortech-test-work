import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import {
  selectAllPokemonsData,
  selectAllPokemonsAmount,
  selectFiltredPokemonsList,
  setFiltredPokemonsData,
  setLoaded,
  setLoading,
} from '../../store/reducers/pokemons';
import amountToShow from '../../utils/const';
import './Pagination.css';

// ugly code. eslint errors. hosting of functions ignored.

export default function Pagination() {
  const [currentAmount, setCurrentAmount] = useState(amountToShow[0]);
  const [nextAmount, setNextAmount] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const dispatch = useDispatch();
  const filtredPokemons = useSelector(selectFiltredPokemonsList);
  const allPokemons = useSelector(selectAllPokemonsData);
  const pokemonsAmount = useSelector(selectAllPokemonsAmount);
  const pageCount = Math.ceil(filtredPokemons.length > 0
    ? filtredPokemons.length / currentAmount
    : pokemonsAmount / currentAmount);

  const handlePageClick = (event) => {
    dispatch(setLoading());
    setActivePage(event.selected);
    setNextAmount((event.selected * currentAmount));
  };

  function handlePokemonList() {
    const startIndex = activePage * currentAmount;
    const endIndex = startIndex + currentAmount;
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
      return;
    }

    Promise.all(
      paginatedPokemons.map((el) => fetch(`https://pokeapi.co/api/v2/pokemon/${el.name}`).then((response) => response.json())),
    )
      .then((data) => dispatch(setFiltredPokemonsData(data)))
      .then(() => dispatch(setLoaded()))
      .catch((error) => console.error(error));
  }

  function handleAmountButtonClick(amount) {
    const newActivePage = Math.floor(nextAmount / amount);
    setActivePage(newActivePage);
    setCurrentAmount(amount);
  }

  useEffect(() => {
    handlePokemonList();
  }, [allPokemons, filtredPokemons]);

  useEffect(() => {
    handlePokemonList();
    const newActivePage = Math.floor((nextAmount + currentAmount - 1) / currentAmount);
    setActivePage(newActivePage);
  }, [nextAmount, currentAmount]);

  useEffect(() => {
    if (filtredPokemons.length === 0) {
      setActivePage(0);
      setCurrentAmount(10);
      setNextAmount(0);
    }
  }, [filtredPokemons]);

  useEffect(() => {
    if (activePage > pageCount) {
      setActivePage(0);
      setCurrentAmount(amountToShow[0]);
      setNextAmount(0);
    }
  }, [activePage, pageCount]);

  return (
    <div className="pagination">
      <div className="pagination__count">
        {amountToShow.map((amount) => (
          <button
            className={`pagination__count-amount ${
              currentAmount === amount ? 'pagination__count-amount_current' : null
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
        onPageChange={handlePageClick}
        pageLinkClassName="pagination__list-page"
        activeLinkClassName="pagination__list-active-page"
        previousLinkClassName="pagination__list-previous-page"
        nextLinkClassName="pagination__list-next-page"
      />
    </div>

  );
}
