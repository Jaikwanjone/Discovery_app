"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

function Header() {
  const router = useRouter();
  const [poke, setpoke] = useState<string>("");
  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setpoke(evt.target.value);
  };
  const handleFrom = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    router.push(`/pokeSearch/${poke}`);
  };
  return (
    <header className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[300px] flex justify-center items-center">
      <div className=" text-center">
        <h1 className=" text-white text-5xl font-bold">
          NextJs Test Finder App
        </h1>
        <p className=" text-white text-2xl"> Find your favorite</p>
        <form onSubmit={handleFrom} className="flex mt-2">
          <input
            onChange={handleInput}
            type="text"
            className=" w-full rounded-md border-none  px-3 py-2 text-gray-700 shadow-md hover:outline  hover:outline-pink-500 "
            placeholder="Pokemon name ..."
          />
          <button
            className=" inline-flex mx-2 px-4 py-2 rounded-md bg-green-500 text-white shadow-md"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
