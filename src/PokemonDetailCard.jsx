import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PokemonDetailCard = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await response.json();
        setPokemons(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-red-600 mb-6 animate-bounce">Pokémon List</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border-2 border-red-400 rounded-lg mb-6 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredPokemons.map((pokemon, index) => (
          <motion.div 
            key={index} 
            className="cursor-pointer  border border-red-600 p-6 rounded-xl shadow-xl text-center bg-white  hover:shadow-2xl hover:bg-red-100 transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`}
              alt={pokemon.name}
              className="w-24 h-24 mx-auto drop-shadow-lg"
            />
            <h2 className="md:text-2xl font-semibold mt-3 capitalize text-gray-700 text-md">{pokemon.name}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PokemonDetailCard;
