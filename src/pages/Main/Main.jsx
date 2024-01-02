import React from 'react';
import ActionsPanel from '../../components/Actions-panel/Actitions-panel';
import List from '../../components/List/List';
import './Main.css';

export default function Main() {
  return (
    <main className="main">
      <ActionsPanel />
      <List />
    </main>
  );
}
