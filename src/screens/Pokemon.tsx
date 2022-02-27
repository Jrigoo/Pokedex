import React from "react";
import { useAuth } from "../hooks";

import { StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PokeHeader } from "../components/PokeHeader";
import { Stats } from "../components/Stats";
import { Types } from "../components/Types";
import { FavoriteIcon } from "../components/FavoriteIcon";

import { getPokemon } from "../api/pokemon";

import type { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../navigation/PokeNav";
import { IPokemon } from "../utils/interfaces";

import { getFavorites } from "../utils/pokeDB";

type Props = StackScreenProps<StackParamList, "Pokemon">;

export const Pokemon = ({ route, navigation }: Props) => {
  const [pokemon, setPokemon] = React.useState<IPokemon>();
  const [heart, setHeart] = React.useState(false);
  const { isAuth } = useAuth();

  const { id, color } = route.params;

  React.useEffect(() => {
    getFavorites().then((favs) => {
      if (favs.includes(id)) setHeart(true);
    });
    getPokemon(id)
      .then((res) => {
        if (res) {
          setPokemon(res);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isAuth ? (
          <FavoriteIcon heart={heart} setHeart={setHeart} id={id} />
        ) : null,
    });
  }, [heart]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {pokemon ? (
        <SafeAreaView style={styles.main}>
          <PokeHeader pokemon={pokemon} color={color} />
          <Types types={pokemon.types} color={color} />
          <Stats stats={pokemon.stats} color={color} />
        </SafeAreaView>
      ) : (
        <ActivityIndicator size="large" color={color} style={styles.loader} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingTop: 30,
  },
  loader: {
    margin: 100,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  arrow: {
    zIndex: 10,
  },
});
