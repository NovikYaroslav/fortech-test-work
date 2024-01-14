// Check later
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPokemonsData, fetchAllPokemonsTypes, fetchPokemonsWithTypes, fetchSelectedPokemon,
} from '../actions/asyncActions';

const pokemonsInitialState = {
  allPokemonsData: [],
  allPokemonsTypesList: undefined,
  allPokemonsAmount: undefined,

  currentPokemonList: [],

  perPageAmount: 10,
  activePage: 0,
  selectedPokemonsTypes: [],
  searchName: '',

  filtredPokemonsList: [],
  filtredPokemonsData: [],

  selectedPokemon: undefined,

  loading: false,
  notFound: false,
};

// 1. мы получили список всех покемонов (стейт)
// 2. мы получили спискок всех типов (стейт)
// 3. выставили кол-во покемонов для пагинации (стейт)
// 4. запихнул в (стейт)текущих покемонов
// 5. отрезали часть покемонов для запроса данных по каждому
// 6. отрезанное кол-во отправили на запрос.
// 7. результат запроса запихнули в в (стейт) и отдали на рендер

// 8. нажимаю тип, отправляю его в (стейт)
// 9. выставил кол-во покемонов для пагинации (стейт)
// 10 изменил (стейт) текущих покемонов
// 11. отрезали часть покемонов для запроса данных по каждому
// 12. отрезанное кол-во отправили на запрос.
// 13. результат запроса запихнули в в (стейт) и отдали на рендер

// 14. ввел имя и отправил его в (стейт)
// 15. отфильтровал стейт текущих покемонов
// 16. отрезали часть покемонов для запроса данных по каждому
// 17. отрезанное кол-во отправили на запрос.
// 18. результат запроса запихнули в в (стейт) и отдали на рендер

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

    setCurrentPokemonList: (state) => {
      const initialAmount = state.allPokemonsData.length;
      state.currentPokemonList = state.allPokemonsData;
      state.allPokemonsAmount = initialAmount;
      state.activePage = 0;
    },

    setPerPageAmount: (state, action) => {
      state.perPageAmount = action.payload;
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
        console.log('ищу в фильтрах');
        const foundedInFiltredPoks = state.filtredPokemonsList
          .filter((pokemon) => pokemon.name.includes(searchString));
        state.currentPokemonList = foundedInFiltredPoks.length !== 0
          ? foundedInFiltredPoks
          : [];
        state.allPokemonsAmount = foundedInFiltredPoks.length;
        state.notFound = state.currentPokemonList.length === 0;
      } else {
        const foundedInAllPoks = state.allPokemonsData
          .filter((pokemon) => pokemon.name.includes(searchString));
        state.currentPokemonList = foundedInAllPoks.length !== 0
          ? foundedInAllPoks
          : [];
        state.allPokemonsAmount = foundedInAllPoks.length;
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
      state.currentPokemonList = state.filtredPokemonsList;
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
    // 1. мы получили список всех покемонов (стейт)
    // 3. выставили кол-во покемонов для пагинации (стейт)
    // 4. запихнул в (стейт)текущих покемонов
    builder.addCase(fetchAllPokemonsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPokemonsData.fulfilled, (state, action) => {
      state.allPokemonsData = action.payload.results;
      state.allPokemonsAmount = action.payload.count;
      state.currentPokemonList = action.payload.results;
    });

    // 2. мы получили спискок всех типов (стейт)
    builder.addCase(fetchAllPokemonsTypes.fulfilled, (state, action) => {
      // Looks like API bug. Unknown type returns nothing.
      state.allPokemonsTypesList = action.payload.results.filter((type) => type.name !== 'unknown');
    });

    builder.addCase(fetchPokemonsWithTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemonsWithTypes.fulfilled, (state, action) => {
      state.currentPokemonList = action.payload;
      state.filtredPokemonsList = action.payload;
      if (action.payload.length) {
        state.allPokemonsAmount = action.payload.length;
      }
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

const selectCurrentPokemonList = (state) => state.pokemons.currentPokemonList;

const selectPerPageAmount = (state) => state.pokemons.perPageAmount;
const selectActivePage = (state) => state.pokemons.activePage;
const selectSelectedPokemonsTypes = (state) => state.pokemons.selectedPokemonsTypes;
const selectSearchName = (state) => state.pokemons.searchName;

const selectFiltredPokemonsList = (state) => state.pokemons.filtredPokemonsList;
const selectFiltredPokemonsData = (state) => state.pokemons.filtredPokemonsData;

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
  selectSelectedPokemonsTypes,
  selectSearchName,

  selectFiltredPokemonsList,
  selectFiltredPokemonsData,

  selectSelectedPokemon,

  selectLoadingStatus,
  selectNotFoundStatus,
};

export const {
  setAllPokemonsData,
  setCurrentPokemonList,
  setAllPokemonsTypesList,
  setPerPageAmount,
  setActivePage,
  setSearchName,
  setFiltredPokemonsList,
  setFiltredPokemonsData,
  setPokemonsListByName,
  setFiltredPokemonsListByName,
  setSelectedTypes,
  removeSelectedTypes,
  resetFiltredPokemonsList,
  resertToInitialFilteredPokemons,
  resetNotFoundStatus,
  addChoosenTypes,
  setLoading,
  setLoaded,
} = PokemonsSlice.actions;
