"use client";
import { ClientDotaProfileDataProviderContext } from "@/providers/DotaClientProvider";
import { useContext } from "react";

export default function UserInfo({ initialState }) {
  const { state, dispatch } = useContext(ClientDotaProfileDataProviderContext);
  return (
    <img
      className="rounded-full w-10"
      src={
        state?.player?.steamAccount?.avatar ||
        initialState?.player?.steamAccount?.avatar
      }
    />
  );
}
