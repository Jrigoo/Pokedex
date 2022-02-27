import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";
import { addFavorites } from "../utils/pokeDB";

interface Props {
  heart: boolean;
  setHeart: (h: boolean) => void;
  id: number;
}

export const FavoriteIcon: React.FC<Props> = ({ heart, setHeart, id }) => {
  return (
    <Icon
      name="heart"
      color="#fff"
      size={20}
      style={{ marginRight: 20 }}
      solid={heart}
      onPress={() =>
        addFavorites(id)
          .then(() => setHeart(!heart))
          .catch((e) => console.error(e))
      }
    />
  );
};
