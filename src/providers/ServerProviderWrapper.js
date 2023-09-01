import PokemonProvider from "@/providers/PokemonProvider";

export default async function ServerProviderWrapper({ children }) {
  return <PokemonProvider>{children}</PokemonProvider>;
}
