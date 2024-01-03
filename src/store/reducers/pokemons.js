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

  currentPokemonsList: [],
  currentPokemonsData: [],
  currentPokemonTypes: [],

  selectedPokemon: undefined,

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
      if (state.currentPokemonTypes.length !== 0) {
        state.currentPokemonsList = state.currentPokemonsList
          .filter((pokemon) => pokemon.name.includes(action.payload.toLowerCase()));
      } else {
        state.currentPokemonsList = state.allPokemonsData
          .filter((pokemon) => pokemon.name.includes(action.payload.toLowerCase()));
      }
    },
    resetCurrentPokemonsList: (state) => {
      state.currentPokemonsList = [];
    },

    setSelectedTypes: (state, action) => {
      state.currentPokemonTypes = action.payload;
    },
    removeSelectedTypes: (state, action) => {
      state.currentPokemonTypes = state.currentPokemonTypes
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
      state.allPokemonsTypesList = action.payload.results;
    });
    builder.addCase(fetchPokemonsWithTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemonsWithTypes.fulfilled, (state, action) => {
      // const { selectedType, response } = action.payload;
      // console.log(selectedType);
      console.log(action.payload);

      // убери логику с чисткой массива
      // if (state.currentPokemonTypes.includes(selectedType)) {
      //   state.currentPokemonTypes = state.currentPokemonTypes
      //     .filter((type) => type !== selectedType);
      //   state.currentPokemonsList = state.currentPokemonsList.filter(
      //     (pokemon) => !response.pokemon.some((p) => p.pokemon.name === pokemon.name),
      //   );
      // } else {
      //   state.currentPokemonTypes.push(selectedType);
      state.currentPokemonsList = action.payload;
      //   const allSelectedByType = [
      //     ...state.currentPokemonsList,
      //     ...response.pokemon.map((pokemon) => pokemon.pokemon),
      //   ];

      //   const uniquePokemonsSet = new Set(allSelectedByType
      //     .map((pokemon) => pokemon.name));
      //   state.currentPokemonsList = Array.from(uniquePokemonsSet).map((pokemonName) => ({
      //     name: pokemonName,
      //   }));
      // }
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

const selectCurrentPokemonsList = (state) => state.pokemons.currentPokemonsList;
const selectCurrentPokemonsData = (state) => state.pokemons.currentPokemonsData;
const selectCurrentPokemonTypes = (state) => state.pokemons.currentPokemonTypes;

const selectSelectedPokemon = (state) => state.pokemons.selectedPokemon;

const selectLoadingStatus = (state) => state.pokemons.loading;

export {
  selectAllPokemonsData,
  selectAllPokemonsTypesList,
  selectAllPokemonsAmount,

  selectCurrentPokemonsList,
  selectCurrentPokemonsData,
  selectCurrentPokemonTypes,

  selectSelectedPokemon,

  selectLoadingStatus,
};

export const {
  setAllPokemonsData,
  setAllPokemonsTypesList,
  setCurrentPokemonsList,
  setCurrentPokemonsData,
  setCurrentPokemonsListByName,
  setSelectedTypes,
  removeSelectedTypes,
  resetCurrentPokemonsList,
  addChoosenTypes,
  setLoading,
  setLoaded,
} = PokemonsSlice.actions;
