import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { IPokemons } from "../utils/interfaces";
import { capitalize } from "../utils/functions";
import { getPokemonColor, PokeTypes } from "../utils/colors";

interface Props {
  pokemon: IPokemons;
}

export const PokeCard: React.FC<Props> = ({ pokemon }) => {
  const navigation = useNavigation();

  const goToPokemon = () => {
    navigation.navigate(
      "Pokemon" as never,
      {
        id: pokemon.id,
        color: getPokemonColor(pokemon.type as unknown as PokeTypes),
      } as never
    );
  };

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: getPokemonColor(
              pokemon.type as unknown as PokeTypes
            ),
          },
        ]}
      >
        <Image source={{ uri: pokemon.image }} style={styles.image} />
        <View style={[styles.textBox]}>
          <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
          <Text style={styles.number}>
            #{`${pokemon.order}`.padStart(3, "0")}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 15,
    marginHorizontal: 10,
    padding: 6,
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
  },
  textBox: {
    width: "100%",
    padding: 5,
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  number: {
    color: "#fff",
    fontSize: 11,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  image: {
    width: 90,
    height: 90,
  },
});
