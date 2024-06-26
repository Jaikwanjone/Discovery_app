"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Prop {
  name: string;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
  weight: number;
}
const PokeInfo = () => {
  const param = useParams();

  const [poke, setPoke] = useState<Prop | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  const fetchPoke = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        ` https://pokeapi.co/api/v2/pokemon/${param.id}`
      );
      const data = await response.json();

      setPoke(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPoke();
  }, []);

  if (!poke) return;
  <p>Loading ...</p>;

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
                src={poke.sprites.other.home.front_default}
                width={160}
                height={160}
                alt={poke.sprites.other.home.front_default}
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

export default PokeInfo;
