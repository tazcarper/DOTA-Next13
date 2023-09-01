"use client";

export default function IncrementCounter({ children, store }) {
  return <button onClick={handleClick}>{children}</button>;
}
