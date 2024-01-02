import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router';
import Main from '../../pages/Main/Main';
import Pokemon from '../../pages/Pokemon/Pokemon';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {
} from '../../store/reducers/pokemons';
import { fetchAllPokemonsData, fetchAllPokemonsTypes } from '../../store/actions/asyncActions';

function App() {
  const dispatch = useDispatch();
  // const pokemons = useSelector(selectPokemons);

  useEffect(() => {
    dispatch(fetchAllPokemonsTypes());
    dispatch(fetchAllPokemonsData());
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/pokemon/:name" element={<Pokemon />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
