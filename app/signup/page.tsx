"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { email, username, password } = user;

    if (email === "" || username === "" || password === "") {
      return;
    }

    //api connection POST
    fetch("api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    setUser({
      email: "",
      username: "",
      password: "",
    });
    router.push("/login");
  };

  return (
    <div className="w-96 h-80  ring-1 ring-black  m-auto mt-40 rounded-sm flex justify-center">
      <form
        className="flex flex-col items-center justify-center gap-3 "
        onSubmit={handleOnSubmit}
      >
        <h1 className="text-2xl">Register</h1>
        <input
          placeholder="email"
          className="ring-1 ring-black rounded-full w-60 h-8 p-5"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          placeholder="username"
          className="ring-1 ring-black rounded-full w-60 h-8 p-5"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          placeholder="password"
          type="password"
          className="ring-1 ring-black rounded-full w-60 h-8 p-5"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button type="submit" className="w-32 rounded-full">
          Enter
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
