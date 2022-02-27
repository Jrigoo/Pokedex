import { View, Text, Image, StyleSheet } from "react-native";
import { IPokemon } from "../utils/interfaces";
import { capitalize } from "../utils/functions";
import { SafeAreaView } from "react-native-safe-area-context";

import React from "react";

interface Props {
  pokemon: IPokemon;
  color: string;
}

export const PokeHeader: React.FC<Props> = ({ pokemon, color }) => {
  return (
    <>
      <View style={[styles.bg, { backgroundColor: color }]} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
          <Text style={styles.order}>
            #{`${pokemon.order}`.padStart(3, "0")}
          </Text>
        </View>
        <View style={styles.contentImg}>
          <Image source={{ uri: pokemon.image }} style={styles.image} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 400,
    position: "absolute",
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    transform: [{ scaleX: 2 }],
  },
  content: {
    marginHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 26,
  },
  order: {
    color: "white",
    fontWeight: "bold",
  },
  contentImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 300,
    resizeMode: "contain",
  },
  loader: {
    margin: 20,
  },
});
