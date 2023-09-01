export default function InputSteamId({ handleSubmit }) {
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="steamIdInput"
          className="border border-indigo-600 border-solid"
        ></input>
      </form>
    </>
  );
}
