import React from 'react';
import { useSelector } from 'react-redux';
import ActionsPanel from '../../components/Actions-panel/Actitions-panel';
import Pagination from '../../components/Pagination/Pagination';
import List from '../../components/List/List';
import NotFound from '../../components/Not-found/Not-found';
import UrlHandler from '../../components/Url-manager/Url-manager';
import { selectNotFoundStatus } from '../../store/reducers/pokemons';
import './Main.css';

export default function Main() {
  const pokemonsNotFound = useSelector(selectNotFoundStatus);

  return (
    <main className="main">
      <ActionsPanel />
      <UrlHandler />
      {pokemonsNotFound ? (
        <NotFound />
      ) : (
        <>
          <Pagination />
          <List />
        </>
      )}
    </main>
  );
}
