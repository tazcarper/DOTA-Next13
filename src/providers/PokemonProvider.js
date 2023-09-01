import usePokemonStore from "@/store/PokemonStore";

async function getData() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");
  if (!res.ok) {
    throw new Error("Failed to get data");
  }

  return res.json();
}

export default async function PokemonProvider({ children }) {
  const data = await getData();
  usePokemonStore.setState({ pokemon: data });
  return <>{children}</>;
}
