import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemons } from "../api/pokemon";

import { PokeList } from "../components/PokeList";
import { IPokemons } from "../utils/interfaces";

export const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = React.useState<Array<IPokemons> | []>([]);

  const [nextURL, setNextURL] = React.useState<string | null>(null); //Para añadir mas pokemones
  const [update, setUpdate] = React.useState(false);

  //Traer originalmente los pokemones
  React.useEffect(() => {
    getPokemons("")
      .then((res) => {
        if (res?.pokedex) {
          setPokemons(res.pokedex);
          setNextURL(res.nextURL);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //Lodear mas pokemones
  const loadMore = () => {
    setUpdate(true);
    getPokemons(nextURL)
      .then((res) => {
        if (res?.pokedex) {
          setPokemons([...pokemons, ...res.pokedex]);
          setNextURL(res.nextURL);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setUpdate(false));
  };

  return (
    <SafeAreaView>
      <PokeList
        list={pokemons}
        loadMore={loadMore}
        nextURL={nextURL}
        update={update}
      />
    </SafeAreaView>
  );
};
