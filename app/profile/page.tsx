"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";
import { getProfileInfo } from "@/queries/getProfileInfo";

const ProfilePage = () => {
  //realizar GET in render em um client componente usando tanstack ao invés de useEffect
  const { data: infos, isLoading } = useQuery({
    queryFn: getProfileInfo,
    queryKey: ["Profile Infos"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>{infos.data.username}</h2>
        <p>{infos.data.plan}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
