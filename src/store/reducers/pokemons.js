// Check later
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// добавляем стейт и селетор для кол-во отображаемых покемонов.

const pokemonsInitialState = {
  initialFetchParams: 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0',
  pokemonsAmount: undefined,
  initialPokemonsTypes: undefined,
  initialPokemons: undefined,
  initialPokemonsData: undefined,
  loading: false,
};

export const PokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: pokemonsInitialState,
  reducers: {
    setFetchParams: (state, action) => {
      state.initialFetchParams = action.payload;
    },
    setPokemonsTypes: (state, action) => {
      state.initialPokemonsTypes = action.payload;
    },
    setPokemons: (state, action) => {
      state.loading = true;
      state.initialPokemons = action.payload;
    },
    setPokemonsData: (state, action) => {
      state.loading = false;
      state.initialPokemonsData = action.payload;
    },
    setPokemonsAmount: (state, action) => {
      state.pokemonsAmount = action.payload;
    },
  },
});

// Selectors
const selectPokemons = (state) => state.pokemons.initialPokemons;
const selectPokemonsFetchParams = (state) => state.pokemons.initialFetchParams;
const selectPokemonsData = (state) => state.pokemons.initialPokemonsData;
const selectPokemonsTypes = (state) => state.pokemons.initialPokemonsTypes;
const selectLoadingStatus = (state) => state.pokemons.loading;
const selectPokemonsAmount = (state) => state.pokemons.pokemonsAmount;

export {
  selectPokemons,
  selectPokemonsFetchParams,
  selectPokemonsData,
  selectPokemonsTypes,
  selectLoadingStatus,
  selectPokemonsAmount,
};

export const {
  setPokemons, setFetchParams, setPokemonsData, setPokemonsTypes, setPokemonsAmount,
} = PokemonsSlice.actions;
