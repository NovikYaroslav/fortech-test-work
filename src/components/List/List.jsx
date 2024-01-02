import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import {
  selectAllPokemonsData,
  selectAllPokemonsAmount,
  selectCurrentPokemonsData,
  selectCurrentPokemonsList,
  setCurrentPokemonsData,
  setLoaded,
  setLoading,
  selectLoadingStatus,
} from '../../store/reducers/pokemons';
import prepareTypes from '../../utils/preparation-functions';
import amountToShow from '../../utils/const';
import './List.css';

// ugly code. eslint errors. hosting of functions ignored.

export default function List() {
  const [currentAmount, setCurrentAmount] = useState(10);
  const [nextAmount, setNextAmount] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const dispatch = useDispatch();
  const filtredPokemons = useSelector(selectCurrentPokemonsList);
  const allPokemons = useSelector(selectAllPokemonsData);
  const pokemonsAmount = useSelector(selectAllPokemonsAmount);
  const pokemonsData = useSelector(selectCurrentPokemonsData);
  const pageCount = Math.ceil(filtredPokemons.length > 0
    ? filtredPokemons.length / currentAmount
    : pokemonsAmount / currentAmount);
  const loading = useSelector(selectLoadingStatus);

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
      dispatch(setCurrentPokemonsData([]));
      dispatch(setLoaded());
      return;
    }

    Promise.all(
      paginatedPokemons.map((el) => fetch(`https://pokeapi.co/api/v2/pokemon/${el.name}`).then((response) => response.json())),
    )
      .then((data) => dispatch(setCurrentPokemonsData(data)))
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
    const newActivePage = Math.floor((nextAmount + currentAmount - 1) / currentAmount);
    setActivePage(newActivePage);
  }, [nextAmount, currentAmount]);

  useEffect(() => {
    handlePokemonList();
  }, [currentAmount, nextAmount]);

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
      setCurrentAmount(10);
      setNextAmount(0);
    }
  }, [activePage, pageCount]);

  return (
    <div className="list">

      <div className="list_count">
        {amountToShow.map((amount) => (
          <button
            className={`list_count-amount ${
              currentAmount === amount ? 'list_count-amount_current' : null
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
        containerClassName="list-pagination"
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        pageLinkClassName="list-pagination-page"
        activeLinkClassName="list-pagination-active-page"
        previousLinkClassName="list-pagination-previous-page"
        nextLinkClassName="list-pagination-next-page"
      />

      {/* Need to be refactored */}
      {loading ? (
        <Loader />
      ) : (
        <ul className="list_content">
          {pokemonsData?.map((pokemon) => (
            <Card
              id={pokemon.id}
              name={pokemon.name}
              avatar={pokemon.sprites.front_default}
              type={prepareTypes(pokemon.types)}
              hp={pokemon.stats.find((el) => el.stat.name === 'hp').base_stat}
              attack={pokemon.stats.find((el) => el.stat.name === 'attack').base_stat}
              defense={pokemon.stats.find((el) => el.stat.name === 'defense').base_stat}
              key={pokemon.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
