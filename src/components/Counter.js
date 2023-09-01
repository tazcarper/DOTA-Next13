import usePokemonStore from "@/store/PokemonStore";
import IncreaseLikes from "@/components/IncreaseLikes";
export default function Counter() {
  const { counter, pokemon } = usePokemonStore.getState();
  return (
    <div>
      <div>How much do you love pokemon? </div>
      {Array.from({ length: counter }).map((item) => {
        return <p style={{ display: "inline" }}>&hearts;</p>;
      })}
      <IncreaseLikes>Increase Likes</IncreaseLikes>
      {pokemon.results.map((thing) => {
        return <p>{thing.name}</p>;
      })}
    </div>
  );
}
