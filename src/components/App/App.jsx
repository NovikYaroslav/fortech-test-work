import { React } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import Main from '../../pages/Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import {
//   setPokemons,
//   setPokemonsTypes,
//   setPokemonsData,
//   selectPokemonsFetchParams,
//   selectPokemons,
// } from '../../store/reducers/pokemons';

function App() {
  // const dispatch = useDispatch();
  // const pokemonsFetchParams = useSelector(selectPokemonsFetchParams);
  // const pokemons = useSelector(selectPokemons);

  // useEffect(() => {
  //   fetch('https://pokeapi.co/api/v2/type/')
  //     .then((res) => res.json())
  //     .then((data) => dispatch(setPokemonsTypes(data.results)));
  // }, []);

  // function fetchRequestedPokemons(pokemonArray) {
  //   Promise.all(
  //     pokemonArray.map((el) => fetch(`https://pokeapi.co/api/v2/pokemon/${el.pokemon ? el.pokemon.name : el.name}`).then(
  //       (response) => response.json(),
  //     )),
  //   )
  //     .then((data) => dispatch(setPokemonsData(data)))
  //     .catch((error) => console.error(error));
  // }

  // useEffect(() => {
  //   fetch(`${pokemonsFetchParams}`)
  //     .then((res) => res.json())
  //     .then((data) => dispatch(setPokemons(data)));
  // }, [pokemonsFetchParams]);

  // useEffect(() => {
  //   if (pokemons === undefined) {
  //     return;
  //   }
  //   switch (true) {
  //     case Object.keys(pokemons).includes('weight'):
  //       dispatch(setPokemonsData([pokemons]));
  //       break;
  //     case Object.keys(pokemons).includes('pokemon'):
  //       fetchRequestedPokemons(pokemons.pokemon);
  //       break;
  //     default:
  //       fetchRequestedPokemons(pokemons.results);
  //       break;
  //   }
  // }, [dispatch, pokemons]);

  return (
    <>
      <Header />
      {/* <Pokemon /> */}
      <Main />
      <Footer />
    </>
  );
}

export default App;
