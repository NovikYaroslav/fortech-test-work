// Check later
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPokemonsData, fetchAllPokemonsTypes, fetchPokemonsWithTypes, fetchSelectedPokemon,
} from '../actions/asyncActions';

const pokemonsInitialState = {
  allPokemonsData: [],
  currentPokemonList: [],
  filtredPokemonsList: [],
  resultPokemonsData: [],

  allPokemonsAmount: undefined,
  perPageAmount: 10,
  activePage: 0,
  pageCount: 0,

  allPokemonsTypesList: undefined,
  selectedPokemonsTypes: [],

  searchName: '',

  selectedPokemon: undefined,

  loading: false,
  notFound: false,
};

function calculatePages(totalAmount, perPageAmount) {
  return Math.ceil(totalAmount / perPageAmount);
}

export const PokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: pokemonsInitialState,
  reducers: {

    setCurrentPokemonList: (state) => {
      const initialAmount = state.allPokemonsData.length;
      state.currentPokemonList = state.allPokemonsData;
      state.allPokemonsAmount = initialAmount;
      state.pageCount = calculatePages(initialAmount, state.perPageAmount);
      state.notFound = false;
    },

    setPerPageAmount: (state, action) => {
      state.perPageAmount = action.payload;
      state.pageCount = calculatePages(state.allPokemonsAmount, action.payload);
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setSearchName: (state, action) => {
      state.searchName = action.payload;
    },

    setPokemonsListByName: (state, action) => {
      const searchString = action.payload.toLowerCase();
      if (state.filtredPokemonsList.length) {
        const foundedInFiltredPoks = state.filtredPokemonsList
          .filter((pokemon) => pokemon.name.includes(searchString));
        state.currentPokemonList = foundedInFiltredPoks.length !== 0
          ? foundedInFiltredPoks
          : [];
        state.allPokemonsAmount = foundedInFiltredPoks.length;
        state.pageCount = calculatePages(foundedInFiltredPoks.length, state.perPageAmount);
        state.notFound = state.currentPokemonList.length === 0;
      } else {
        const foundedInAllPoks = state.allPokemonsData
          .filter((pokemon) => pokemon.name.includes(searchString));
        state.currentPokemonList = foundedInAllPoks.length !== 0
          ? foundedInAllPoks
          : [];
        state.allPokemonsAmount = foundedInAllPoks.length;
        state.pageCount = calculatePages(foundedInAllPoks.length, state.perPageAmount);
        state.notFound = state.currentPokemonList.length === 0;
      }
    },

    resetFiltredPokemonsList: (state) => {
      state.filtredPokemonsList = [];
    },

    resetNotFoundStatus: (state) => {
      state.notFound = false;
    },
    resertToInitialFilteredPokemons: (state) => {
      const initialAmount = state.filtredPokemonsList.length;
      state.currentPokemonList = state.filtredPokemonsList;
      state.allPokemonsAmount = initialAmount;
      state.pageCount = calculatePages(initialAmount, state.perPageAmount);
    },

    setSelectedTypes: (state, action) => {
      state.selectedPokemonsTypes.push(action.payload);
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
      state.currentPokemonList = action.payload.results;
      state.pageCount = calculatePages(action.payload.count, state.perPageAmount);
    });
    builder.addCase(fetchAllPokemonsTypes.fulfilled, (state, action) => {
      // Looks like API bug. Unknown type returns nothing.
      state.allPokemonsTypesList = action.payload.results.filter((type) => type.name !== 'unknown');
    });

    builder.addCase(fetchPokemonsWithTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemonsWithTypes.fulfilled, (state, action) => {
      const uniquePoks = action.payload
        .filter((item, index, array) => array.findIndex((obj) => obj.name === item.name) === index);
      state.currentPokemonList = uniquePoks;
      state.filtredPokemonsList = uniquePoks;
      if (uniquePoks.length) {
        state.allPokemonsAmount = uniquePoks.length;
        state.pageCount = calculatePages(uniquePoks.length, state.perPageAmount);
      }
      if (!uniquePoks.length) {
        state.notFound = true;
      }
    });
    builder.addCase(fetchSelectedPokemon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSelectedPokemon.fulfilled, (state, action) => {
      state.selectedPokemon = action.payload;
      state.loading = false;
    });
  },
});

// Selectors
const selectAllPokemonsData = (state) => state.pokemons.allPokemonsData;
const selectAllPokemonsTypesList = (state) => state.pokemons.allPokemonsTypesList;
const selectAllPokemonsAmount = (state) => state.pokemons.allPokemonsAmount;
const selectCurrentPokemonList = (state) => state.pokemons.currentPokemonList;
const selectPerPageAmount = (state) => state.pokemons.perPageAmount;
const selectPageCount = (state) => state.pokemons.pageCount;
const selectActivePage = (state) => state.pokemons.activePage;
const selectSelectedPokemonsTypes = (state) => state.pokemons.selectedPokemonsTypes;
const selectSearchName = (state) => state.pokemons.searchName;
const selectFiltredPokemonsList = (state) => state.pokemons.filtredPokemonsList;
const selectSelectedPokemon = (state) => state.pokemons.selectedPokemon;
const selectLoadingStatus = (state) => state.pokemons.loading;
const selectNotFoundStatus = (state) => state.pokemons.notFound;

export {
  selectAllPokemonsData,
  selectAllPokemonsTypesList,
  selectAllPokemonsAmount,
  selectCurrentPokemonList,
  selectPerPageAmount,
  selectActivePage,
  selectPageCount,
  selectSelectedPokemonsTypes,
  selectSearchName,
  selectFiltredPokemonsList,
  selectSelectedPokemon,
  selectLoadingStatus,
  selectNotFoundStatus,
};

export const {
  setAllPokemonsData,
  setCurrentPokemonList,
  setPerPageAmount,
  setActivePage,
  setSearchName,
  setPokemonsListByName,
  setSelectedTypes,
  setLoading,
  setLoaded,
  removeSelectedTypes,
  resetFiltredPokemonsList,
  resertToInitialFilteredPokemons,
  resetNotFoundStatus,
} = PokemonsSlice.actions;
