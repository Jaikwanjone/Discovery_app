"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Prop {
  name: string;
  url: string;
  weight: number;
}
const page = () => {
  const param = useParams();
  const [poke, setPoke] = useState<Prop>({});
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    const newData: Prop = {
      name: "",
      url: "",
      weight: 0,
    };
    const fetchPoke = async () => {
      try {
        const response = await fetch(
          ` https://pokeapi.co/api/v2/pokemon/${param.id}`
        );
        const singlePoke = await response.json();
        newData.name = singlePoke.name;
        newData.url = singlePoke.sprites.other.home.front_default;
        newData.weight = singlePoke.weight;
        setPoke(newData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchPoke();
  }, []);

  if (!poke) return null;
  return (
    <div className=" p-24">
      <Link href="/" className=" bg-blue-500 rounded-md p-3 text-white">
        Go Back
      </Link>
      <div className=" flex items-center justify-center mt-10 text-center  mx-auto">
        <div className="shadow-md p-10 rounded-md bg-slate-600  ">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h3 className="text-3xl font-bold text-orange-700 uppercase">
                {poke.name}
              </h3>
              <Image
                src={poke.url}
                width={160}
                height={160}
                alt={poke.name}
                className=" transition ease-in duration-75 hover:scale-150 translate-x-5"
              />
              <div className="mt-5 z-10">
                <p className=" text-xl text-[#00df9a] flex text-center">
                  Weight :
                  <h1 className=" text-cyan-500  text-xl font-bold rounded-md px-2 bg-yellow-200">
                    {poke.weight}
                  </h1>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
