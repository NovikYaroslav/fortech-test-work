import React from 'react';
import ActionsPanel from '../../components/Actions-panel/Actitions-panel';
import Pagination from '../../components/Pagination/Pagination';
import List from '../../components/List/List';
import './Main.css';

export default function Main() {
  return (
    <main className="main">
      <ActionsPanel />
      <Pagination />
      <List />
    </main>
  );
}
