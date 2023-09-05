"use client";
import { useContext } from "react";
import { ClientDotaProfileDataProviderContext } from "@/providers/DotaClientProvider";

export default function GuildName() {
  const { state } = useContext(ClientDotaProfileDataProviderContext);
  const { name, memberCount } = state?.player?.guildMember?.guild;
  return (
    <h2 className="text-2xl mt-10 text-success">
      <span className="text-4xl font-bold">{name}</span> - {memberCount} members
    </h2>
  );
}
