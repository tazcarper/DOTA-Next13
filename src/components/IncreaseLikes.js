"use client";
import usePokemonStore from "@/store/PokemonStore";

export default function IncreaseLikes({ children }) {
  const currentState = usePokemonStore.getState();
  console.log(currentState);
  const handleClick = () => {
    const curState = usePokemonStore.getState();
    console.log(curState);
    return usePokemonStore.setState((state) => ({
      counter: state.counter + 1,
    }));
  };

  return <button onClick={handleClick}>{children}</button>;
}
