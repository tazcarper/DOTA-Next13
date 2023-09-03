export default function InputSteamId({ handleSubmit }) {
  return (
    <div className="my-4 mx-auto flex flex-col w-full justify-center text-center">
      <p className="text-primary mb-2">Enter a friends ID if you know it</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="steamIdInput"
          className="border border-indigo-600 border-solid"
        ></input>
      </form>
    </div>
  );
}
