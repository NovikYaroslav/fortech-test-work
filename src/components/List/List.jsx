import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import {
  selectAllPokemonsAmount,
  selectCurrentPokemonsList,
  selectCurrentPokemonsData,
  setCurrentPokemonsData,
  setLoadingStatus,

  selectLoadingStatus,
} from '../../store/reducers/pokemons';
import prepareTypes from '../../utils/preparation-functions';
import { amountToShow } from '../../utils/const';
import './List.css';
import { fetchCurrentPokemonsList } from '../../store/actions/asyncActions';

// separate functions was made for allPokemons request.
// amount of pokemons taken dispached to store
// pagination acts from amounts saved in store

// ugly code. eslint errors. hosting of functions ignored.

export default function List() {
  const [currentAmount, setCurrentAmount] = useState(10);
  const [nextAmount, setNextAmount] = useState(0);
  const dispatch = useDispatch();
  const pokemonsAmount = useSelector(selectAllPokemonsAmount);
  const pokemons = useSelector(selectCurrentPokemonsList);
  const pokemonsData = useSelector(selectCurrentPokemonsData);
  const pageCount = Math.ceil(pokemonsAmount / currentAmount);
  const loading = useSelector(selectLoadingStatus);

  const handlePageClick = (event) => {
    setNextAmount((event.selected * currentAmount));
  };

  function handlePokemonList() {
    Promise.all(
      pokemons?.map((el) => fetch(`https://pokeapi.co/api/v2/pokemon/${el.pokemon ? el.pokemon.name : el.name}`).then(
        (response) => response.json(),
      )),
    )
      .then((data) => dispatch(setCurrentPokemonsData(data)))
      .then(() => dispatch(setLoadingStatus()))
      .catch((error) => console.error(error));
  }

  function fetchPokemonsList(amount, next) {
    dispatch(fetchCurrentPokemonsList({ amount, next }));
  }

  function handleAmountButtonClick(amount) {
    setCurrentAmount(amount);
    fetchPokemonsList(amount);
  }

  useEffect(() => {
    fetchPokemonsList(currentAmount);
  }, []);

  useEffect(() => {
    fetchPokemonsList(currentAmount, nextAmount);
  }, [nextAmount, currentAmount]);

  useEffect(() => {
    handlePokemonList();
  }, [pokemons]);

  return (
    <div className="list">
      {pokemonsData?.length !== 1 ? (
        <>
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
            pageCount={pageCount}
            containerClassName="list-pagination"
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            renderOnZeroPageCount={null}
            pageLinkClassName="list-pagination-page"
            activeLinkClassName="list-pagination-active-page"
            previousLinkClassName="list-pagination-previous-page"
            nextLinkClassName="list-pagination-next-page"
          />
        </>
      ) : null}
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
