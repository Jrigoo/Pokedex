import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ITypes } from "../utils/interfaces";
import { capitalize } from "../utils/functions";
import { getPokemonColor, PokeTypes } from "../utils/colors";
interface Props {
  types: Array<ITypes>;
  color: string;
}

export const Types: React.FC<Props> = ({ types, color }) => {
  return (
    <View style={styles.content}>
      {types.map((item) => (
        <View
          key={item.type.name}
          style={{
            backgroundColor: getPokemonColor(item.type.name as PokeTypes),
            ...styles.pill,
          }}
        >
          <Text style={styles.type}>{capitalize(item.type.name)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pill: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  type: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
