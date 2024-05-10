"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";

const ProfilePage = () => {
  //realizar GET in render em um client componente usando tanstack ao invés de useEffect
  const { data: infos, isLoading } = useQuery({
    queryFn: async () => {
      const response = await fetch("/api/users/profile");
      const data = await response.json();

      return data;
    },
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
