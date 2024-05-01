"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Prop {
  name: string;
  url: string;
}
const PokeData = () => {
  const [poke, setPoke] = useState<Prop[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(" https://pokeapi.co/api/v2/pokemon");
        const PokeData = await response.json();

        setPoke(PokeData.results);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className=" container mx-auto text-center">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="grid grid-cols-4">
          {poke.map((item, index) => (
            <Link
              key={item.name}
              href={"/pokeinfo/[id]"}
              as={`/pokeinfo/${index + 1}`}
            >
              <div
                key={index}
                className=" flex items-center justify-center flex-col shadow-lg m-3 transition  hover:bg-slate-600 bg-white   hover:text-white text-orange-400 rounded-md cursor-pointer hover:scale-110 ease-linear  "
              >
                <h1 className=" font-bold text-xl ">{item.name}</h1>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                    index + 1
                  }.png`}
                  width={150}
                  height={150}
                  alt={item.name}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokeData;
