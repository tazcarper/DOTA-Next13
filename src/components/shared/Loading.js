export default function Loading({ size = "loading-lg" }) {
  return (
    <div className="w-full text-center">
      <span className={`loading loading-spinner ${size}`}></span>
    </div>
  );
}
