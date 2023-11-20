import React, { useEffect, useState } from 'react';
import './List.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPokemons,
  selectPokemonsData,
  setFetchParams,
  selectLoadingStatus,
} from '../../store/reducers/pokemons';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import ReactPaginate from 'react-paginate';
import { prepareTypes } from '../../utils/preparation-functions';

export default function List() {
  const [currentAmount, setCurrentAmount] = useState(10);
  const [nextAmount, setNextAmount] = useState(0);
  const dispatch = useDispatch();
  const pokemons = useSelector(selectPokemons);
  const pokemonsData = useSelector(selectPokemonsData);
  const pageCount = Math.ceil(pokemons?.count / currentAmount);
  const loading = useSelector(selectLoadingStatus);

  useEffect(() => {
    dispatch(
      setFetchParams(
        `https://pokeapi.co/api/v2/pokemon/?limit=${currentAmount}&offset=${nextAmount}`,
      ),
    );
  }, [nextAmount, currentAmount]);

  function handleAmountButtonClick(amount) {
    setCurrentAmount(amount);
    dispatch(setFetchParams(`https://pokeapi.co/api/v2/pokemon/?limit=${amount}&offset=0`));
  }

  const handlePageClick = (event) => {
    setNextAmount((event.selected * currentAmount) % pokemons?.count);
  };

  return (
    <div className='list'>
      {pokemonsData?.length !== 1 ? (
        <>
          <div className='list_count'>
            <button
              className={`list_count-amount ${
                currentAmount === 10 ? 'list_count-amount_current' : null
              }`}
              onClick={() => handleAmountButtonClick(10)}>
              10
            </button>
            <button
              className={`list_count-amount ${
                currentAmount === 20 ? 'list_count-amount_current' : null
              }`}
              onClick={() => handleAmountButtonClick(20)}>
              20
            </button>
            <button
              className={`list_count-amount ${
                currentAmount === 50 ? 'list_count-amount_current' : null
              }`}
              onClick={() => handleAmountButtonClick(50)}>
              50
            </button>
          </div>
          <ReactPaginate
            pageCount={pageCount}
            containerClassName='list-pagination'
            breakLabel='...'
            nextLabel='>'
            previousLabel='<'
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            renderOnZeroPageCount={null}
            pageLinkClassName='list-pagination-page'
            activeLinkClassName='list-pagination-active-page'
            previousLinkClassName='list-pagination-previous-page'
            nextLinkClassName='list-pagination-next-page'
          />
        </>
      ) : null}

      {/* Need to be refactored */}
      {loading ? (
        <Loader />
      ) : (
        <ul className='list_content'>
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
