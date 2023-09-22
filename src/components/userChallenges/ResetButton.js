"use client";
import { useRouter } from "next/navigation";
export default function ResetButton({ userId }) {
  const router = useRouter();
  const resetActiveChallenges = async () => {
    const reset = await fetch(
      `api/supabase/resetActiveChallenges?userid=${userId}`
    );
    const result = await reset.json();
    router.refresh();
  };

  return (
    <p className="btn" onClick={() => resetActiveChallenges()}>
      Reset all active
    </p>
  );
}
