import React from 'react';
import { useSelector } from 'react-redux';
import ActionsPanel from '../../components/Actions-panel/Actitions-panel';
import Pagination from '../../components/Pagination/Pagination';
import List from '../../components/List/List';
import NotFound from '../../components/Not-found/Not-found';
import { selectNotFoundStatus } from '../../store/reducers/pokemons';
import './Main.css';

export default function Main() {
  const pokemonsNotFound = useSelector(selectNotFoundStatus);

  console.log(pokemonsNotFound);

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
