import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllPokemonsData = createAsyncThunk(
  'pokemons/fetchAll',
  async () => {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10000',
    ).then((res) => res.json());
    return response;
  },
);

export const fetchAllPokemonsTypes = createAsyncThunk(
  'pokemons/fetchTypes',
  async () => {
    const response = await fetch('https://pokeapi.co/api/v2/type/').then((res) => res.json());
    return response;
  },
);

export const fetchCurrentPokemonsList = createAsyncThunk(
  'pokemons/fetchCurrent',
  async ({ amount, next }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${amount}&offset=${next}`)
      .then((res) => res.json());
    return response;
  },
);

export const fetchPokemonsWithTypes = createAsyncThunk(
  'pokemonsType/fetchAllByType',
  async (selectedType) => {
    const result = [];
    const response = await fetch(
      `https://pokeapi.co/api/v2/type/${selectedType}`,
    )
      .then((res) => res.json());

    response.pokemon.forEach((pokemon) => result.push(pokemon));

    return result;
  },
);
