// Check later
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPokemonsData, fetchCurrentPokemonsList, fetchAllPokemonsTypes, fetchPokemonsWithTypes,
} from '../actions/asyncActions';

const pokemonsInitialState = {
  allPokemonsData: undefined,
  allPokemonsTypesList: undefined,
  allPokemonsAmount: undefined,

  currentPokemonsList: undefined,
  currentPokemonsData: undefined,

  typedPokemonsList: undefined,
  typedPokemonsData: undefined,

  loading: false,
};

export const PokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: pokemonsInitialState,
  reducers: {

    setCurrentPokemonsList: (state, action) => {
      state.currentPokemonsList = action.payload;
    },
    setCurrentPokemonsData: (state, action) => {
      state.currentPokemonsData = action.payload;
    },

    setCurrentPokemonsListByName: (state, action) => {
      state.currentPokemonsList = state.allPokemonsData
        .filter((pokemon) => pokemon.name.includes(action.payload));
    },
    setLoadingStatus: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPokemonsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrentPokemonsList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPokemonsData.fulfilled, (state, action) => {
      state.allPokemonsData = action.payload.results;
      state.allPokemonsAmount = action.payload.count;
    });
    builder.addCase(fetchAllPokemonsTypes.fulfilled, (state, action) => {
      state.allPokemonsTypesList = action.payload.results;
    });
    builder.addCase(fetchCurrentPokemonsList.fulfilled, (state, action) => {
      state.currentPokemonsList = action.payload.results;
    });
    builder.addCase(fetchPokemonsWithTypes.fulfilled, (state, action) => {
      const fullTypedPokemonList = state.typedPokemonsList.push(action.payload);
      state.typedPokemonsList = fullTypedPokemonList;
    });
  },
});

// Selectors
const selectAllPokemonsData = (state) => state.pokemons.allPokemonsData;
const selectAllPokemonsTypesList = (state) => state.pokemons.allPokemonsTypesList;
const selectAllPokemonsAmount = (state) => state.pokemons.allPokemonsAmount;

const selectCurrentPokemonsList = (state) => state.pokemons.currentPokemonsList;
const selectCurrentPokemonsData = (state) => state.pokemons.currentPokemonsData;

// const selectTypedPokemonsList = (state) => state.pokemons.typedPokemonsList;

const selectLoadingStatus = (state) => state.pokemons.loading;

export {
  selectAllPokemonsData,
  selectAllPokemonsTypesList,
  selectAllPokemonsAmount,

  selectCurrentPokemonsList,
  selectCurrentPokemonsData,

  selectLoadingStatus,
};

export const {
  setAllPokemonsData,
  setAllPokemonsTypesList,
  setCurrentPokemonsList,
  setCurrentPokemonsData,
  setCurrentPokemonsListByName,
  addChoosenTypes,
  setLoadingStatus,
} = PokemonsSlice.actions;
