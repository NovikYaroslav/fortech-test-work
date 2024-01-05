// Check later
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPokemonsData, fetchAllPokemonsTypes, fetchPokemonsWithTypes, fetchSelectedPokemon,
} from '../actions/asyncActions';

const pokemonsInitialState = {
  allPokemonsData: undefined,
  allPokemonsTypesList: undefined,
  allPokemonsAmount: undefined,

  perPageAmount: 10,
  activePage: 0,

  filtredPokemonsList: [],
  filtredPokemonsData: [],
  selectedPokemonsTypes: [],

  selectedPokemon: undefined,

  loading: false,
  notFound: false,
};

export const PokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: pokemonsInitialState,
  reducers: {

    setFiltredPokemonsList: (state, action) => {
      state.filtredPokemonsList = action.payload;
    },
    setFiltredPokemonsData: (state, action) => {
      state.filtredPokemonsData = action.payload;
    },

    setPerPageAmount: (state, action) => {
      state.perPageAmount = action.payload;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },

    setFiltredPokemonsListByName: (state, action) => {
      if (state.selectedPokemonsTypes.length !== 0) {
        const foundedInFiltredPoks = state.filtredPokemonsList
          .filter((pokemon) => pokemon.name.includes(action.payload.toLowerCase()));
        state.filtredPokemonsList = foundedInFiltredPoks.length !== 0
          ? (state.notFound = false, foundedInFiltredPoks)
          : (state.notFound = true, []);
      } else {
        const foundedInAllPoks = state.allPokemonsData
          .filter((pokemon) => pokemon.name.includes(action.payload.toLowerCase()));
        state.filtredPokemonsList = foundedInAllPoks.length !== 0
          ? (state.notFound = false, foundedInAllPoks)
          : (state.notFound = true, []);
      }
    },
    resetFiltredPokemonsList: (state) => {
      state.filtredPokemonsList = [];
    },

    resetNotFoundStatus: (state) => {
      state.notFound = false;
    },

    setSelectedTypes: (state, action) => {
      state.selectedPokemonsTypes = action.payload;
    },
    removeSelectedTypes: (state, action) => {
      state.selectedPokemonsTypes = state.selectedPokemonsTypes
        .filter((type) => type !== action.payload);
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
      // Looks like API bug. Unknown type returns nothing.
      state.allPokemonsTypesList = action.payload.results.filter((type) => type.name !== 'unknown');
    });
    builder.addCase(fetchPokemonsWithTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemonsWithTypes.fulfilled, (state, action) => {
      state.filtredPokemonsList = action.payload;
    });
    builder.addCase(fetchSelectedPokemon.fulfilled, (state, action) => {
      state.selectedPokemon = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSelectedPokemon.pending, (state) => {
      state.loading = true;
    });
  },
});

// Selectors
const selectAllPokemonsData = (state) => state.pokemons.allPokemonsData;
const selectAllPokemonsTypesList = (state) => state.pokemons.allPokemonsTypesList;
const selectAllPokemonsAmount = (state) => state.pokemons.allPokemonsAmount;

const selectPerPageAmount = (state) => state.pokemons.perPageAmount;
const selectActivePage = (state) => state.pokemons.activePage;

const selectFiltredPokemonsList = (state) => state.pokemons.filtredPokemonsList;
const selectFiltredPokemonsData = (state) => state.pokemons.filtredPokemonsData;
const selectSelectedPokemonsTypes = (state) => state.pokemons.selectedPokemonsTypes;

const selectSelectedPokemon = (state) => state.pokemons.selectedPokemon;

const selectLoadingStatus = (state) => state.pokemons.loading;
const selectNotFoundStatus = (state) => state.pokemons.notFound;

export {
  selectAllPokemonsData,
  selectAllPokemonsTypesList,
  selectAllPokemonsAmount,

  selectPerPageAmount,
  selectActivePage,

  selectFiltredPokemonsList,
  selectFiltredPokemonsData,
  selectSelectedPokemonsTypes,

  selectSelectedPokemon,

  selectLoadingStatus,
  selectNotFoundStatus,
};

export const {
  setAllPokemonsData,
  setAllPokemonsTypesList,
  setPerPageAmount,
  setActivePage,
  setFiltredPokemonsList,
  setFiltredPokemonsData,
  setFiltredPokemonsListByName,
  setSelectedTypes,
  removeSelectedTypes,
  resetFiltredPokemonsList,
  resetNotFoundStatus,
  addChoosenTypes,
  setLoading,
  setLoaded,
} = PokemonsSlice.actions;
