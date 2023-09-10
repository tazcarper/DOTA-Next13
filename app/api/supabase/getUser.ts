import supabase from "@/lib/supabaseClient";
import getUserInformation from "@/data/supabase/getUserInformation";

export default async function getUser(userId: string) {
  if (!userId) return null;
  return ({ data, error } = await getUserInformation(userId));
}
