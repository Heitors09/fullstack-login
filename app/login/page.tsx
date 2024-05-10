"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

interface User {
  email: string;
  password: string;
  isChecked: boolean;
}

const LoginPage = () => {
  const [user, setUser] = useState<User>(() => {
    //armazenar no meu state inicial o valor do localStorage CASO exista , se não marca um valor padrão
    const savedUser = localStorage.getItem("user");
    return savedUser
      ? JSON.parse(savedUser)
      : { email: "", username: "", isChecked: false };
  });
  const router = useRouter();
  console.log(user.isChecked);

  const handleCheckbox = () => {
    const updatedUser = { ...user, isChecked: !user.isChecked };
    setUser(updatedUser);

    if (updatedUser.isChecked && user.email !== "" && user.password !== "") {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return;
    }

    localStorage.removeItem("user");
  };

  const handleOnSubmitLogin = async (event: FormEvent) => {
    event.preventDefault();

    const { email, password } = user;

    if (email === "" || password === "") {
      return;
    }
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      setUser({
        ...user,
        email: "",
        password: "",
      });
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
    //api connection POST verify information
  };

  return (
    <div className="w-[70%] h-[90vh] mt-8 shadow-2xl bg-white  m-auto  rounded-md flex">
      <aside className="h-full bg-hero rounded-l-md bg-cover w-[50%] flex items-center justify-center">
        <div>
          <h2 className="text-white font-bold text-6xl ">
            WELCOME
            <br />
            BACK !
          </h2>
        </div>
      </aside>
      <div className="h-full  w-[50%] flex justify-center flex-col">
        <h1 className="font-bold text-4xl ml-[62px] mb-[30px]">Login</h1>
        <form
          className="flex flex-col items-center  gap-5 "
          onSubmit={handleOnSubmitLogin}
        >
          <label className=" flex flex-col gap-2">
            <p className="text-zinc-400">Email</p>

            <input
              value={user.email}
              placeholder="email"
              className="ring-1 ring-zinc-400 w-[350px] h-11 p-5 rounded-sm"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </label>
          <label className=" flex flex-col gap-3">
            <p className="text-zinc-400">Password</p>
            <input
              value={user.password}
              placeholder="password"
              type="password"
              className="ring-1 ring-zinc-400 w-[350px] h-11 p-5 rounded-sm"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
          <div className="flex w-[350px] justify-between">
            <label className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={handleCheckbox}
                checked={user.isChecked}
              />
              <p className="text-sm ">Remember me</p>
            </label>
            <p className=" text-sm text-zinc-400">Forgot Password </p>
          </div>
          <Button type="submit" className="w-[350px] h-12 bg-[#8455ca]">
            Login
          </Button>
        </form>
        <div className="flex w-[350px] gap-2 mt-8 ml-[62px]">
          <p>New user?</p>
          <Link href="/signup" className="text-[#8455ca] hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
