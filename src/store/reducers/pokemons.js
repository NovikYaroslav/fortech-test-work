// Check later
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPokemonsData, fetchAllPokemonsTypes, fetchPokemonsWithTypes,
} from '../actions/asyncActions';

const pokemonsInitialState = {
  allPokemonsData: undefined,
  allPokemonsTypesList: undefined,
  allPokemonsAmount: undefined,

  currentPokemonsList: [],
  currentPokemonsData: [],
  currentPokemonTypes: [],

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
        .filter((pokemon) => pokemon.name.includes(action.payload.toLowerCase()));
    },
    resetCurrentPokemonsList: (state) => {
      state.currentPokemonsList = [];
    },

    setLoading: (state) => {
      state.loading = true;
    },
    setLoaded: (state) => {
      state.loading = false;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPokemonsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPokemonsData.fulfilled, (state, action) => {
      state.allPokemonsData = action.payload.results;
      state.allPokemonsAmount = action.payload.count;
    });
    builder.addCase(fetchAllPokemonsTypes.fulfilled, (state, action) => {
      state.allPokemonsTypesList = action.payload.results;
    });
    builder.addCase(fetchPokemonsWithTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemonsWithTypes.fulfilled, (state, action) => {
      const { selectedType, response } = action.payload;
      if (state.currentPokemonTypes.includes(selectedType)) {
        state.currentPokemonTypes = state.currentPokemonTypes
          .filter((type) => type !== selectedType);
        state.currentPokemonsList = state.currentPokemonsList.filter(
          (pokemon) => !response.pokemon.some((p) => p.pokemon.name === pokemon.name),
        );
      } else {
        state.currentPokemonTypes.push(selectedType);
        state.currentPokemonsList = [
          ...state.currentPokemonsList,
          ...response.pokemon.map((pokemon) => pokemon.pokemon),
        ];
      }
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
  resetCurrentPokemonsList,
  addChoosenTypes,
  setLoading,
  setLoaded,
} = PokemonsSlice.actions;
