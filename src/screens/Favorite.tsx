import { SafeAreaView } from "react-native-safe-area-context";
import { getFavorites } from "../utils/pokeDB";
import { useIsFocused } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../hooks";
import React from "react";

import type { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../navigation/Navigation";
import { getFavPokemons } from "../api/pokemon";

type Props = StackScreenProps<StackParamList, "Favorite">;
import { IPokemons } from "../utils/interfaces";
import { PokeList } from "../components/PokeList";

export const Favorite: React.FC<Props> = (props) => {
  const { isAuth } = useAuth();
  const isFocused = useIsFocused();
  const [favs, setFavs] = React.useState<Array<IPokemons>>([]);

  async function activate() {
    try {
      if (isFocused && isAuth) {
        const ids = await getFavorites();
        const favorites = await getFavPokemons(ids);
        return favorites;
      }
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  React.useEffect(() => {
    activate()
      .then((data) => {
        if (data) setFavs(data);
      })
      .catch(() => {});
  }, [isAuth, isFocused]);

  return isAuth && favs.length > 0 ? (
    <SafeAreaView>
      <PokeList list={favs} />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.logContainer}>
      <Image source={require("../assets/pica.png")} style={styles.logImg} />
      <Text style={styles.logeate}>
        {isAuth ? "Empieza a añadir favoritos" : "¡Ingresa a tu cuenta!"}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (!isAuth) {
            return props.navigation.navigate(
              "Account" as never,
              {
                screen: "Login",
              } as never
            );
          }
          return props.navigation.navigate(
            "Pokedex" as never,
            {
              screen: "PokeMain",
            } as never
          );
        }}
      >
        <Text style={styles.buttonText}>{isAuth ? "Buscar" : "Ingresar"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logContainer: {
    padding: 20,
    alignItems: "center",
  },
  logImg: { width: "100%", height: "60%", resizeMode: "contain", margin: 20 },
  logeate: {
    fontWeight: "700",
    fontSize: 30,
    color: "#323e44",
    textAlign: "center",
  },
  button: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#f8e85d",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "#323e44",
    fontWeight: "600",
    fontSize: 15,
  },
});
