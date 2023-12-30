// Check later
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPokemonsData, fetchCurrentPokemonsList, fetchAllPokemonsTypes, fetchPokemonsWithTypes,
} from '../actions/asyncActions';

// добавляем стейт и селетор для кол-во отображаемых покемонов.

const pokemonsInitialState = {
  allPokemonsData: undefined,
  allPokemonsTypesList: undefined,
  allPokemonsAmount: undefined,

  currentPokemonsList: undefined,
  currentPokemonsData: undefined,

  choosenTypes: [],

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

    // addChoosenTypes: (state, action) => {
    // const pokemonsByType = state.allPokemonsAmount.filter((pokemon))
    // state.activeTypes = [...state.activeTypes, action.payload];
    // },
    // removeChoosenTypes: (state, action) => {
    //   state.activeTypes = state.activeTypes.filter
    // }

    // setDefaultCurrentPokemonsList: (state, action) => {
    //   state.currentPokemonsData = action.payload;
    // },

    // setPokemonsAmount: (state, action) => {
    //   state.pokemonsAmount = action.payload;
    // },
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
      console.log(action.payload);
      state.currentPokemonsList = action.payload;
    });
  },
});

// Selectors
const selectAllPokemonsData = (state) => state.pokemons.allPokemonsData;
const selectAllPokemonsTypesList = (state) => state.pokemons.allPokemonsTypesList;
const selectAllPokemonsAmount = (state) => state.pokemons.allPokemonsAmount;

const selectCurrentPokemonsList = (state) => state.pokemons.currentPokemonsList;
const selectCurrentPokemonsData = (state) => state.pokemons.currentPokemonsData;

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
