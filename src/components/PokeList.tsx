import React from "react";
import { FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { PokeCard } from "./PokeCard";
import { IPokemons } from "../utils/interfaces";

interface Props {
  list: Array<IPokemons>;
  loadMore?: () => void;
  nextURL?: string | null;
  update?: Boolean;
}

export const PokeList: React.FC<Props> = ({
  list,
  loadMore,
  nextURL,
  update,
}) => {
  return (
    <FlatList
      data={list}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(pokemon) => String(pokemon.id)}
      renderItem={({ item }) => <PokeCard pokemon={item} />}
      contentContainerStyle={style.list}
      onEndReached={nextURL ? loadMore : () => {}}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        nextURL && update ? (
          <ActivityIndicator
            size="large"
            color="#ea6561"
            style={style.loader}
          />
        ) : (
          <></>
        )
      }
      ListEmptyComponent={
        <ActivityIndicator size="large" color="#ea6561" style={style.loader} />
      }
    />
  );
};

const style = StyleSheet.create({
  list: {
    paddingTop: 5,
    paddingBottom: 35,
    marginBottom: 20,
  },
  loader: {
    margin: 5,
  },
});
