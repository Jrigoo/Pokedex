import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { IUser } from "../utils/userDB";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFavorites } from "../utils/pokeDB";

interface Props {
  user: IUser;
}

export const Profile: React.FC<Props> = ({ user }) => {
  const [favs, setFavs] = React.useState(0);
  React.useEffect(() => {
    getFavorites()
      .then((f) => setFavs(f.length))
      .catch((e) => console.error(e));
  }, []);
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.welcome}>Welcome back! {user.username}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>First Name: </Text>
        <Text style={styles.values}>{user.firstName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Last Name: </Text>
        <Text style={styles.values}>{user.lastName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Email: </Text>
        <Text style={styles.values}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Favorites: </Text>
        <Text style={styles.values}>{favs}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
  },
  welcome: {
    color: "#323e44",
    fontWeight: "700",
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 20,
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  title: {
    color: "#323e44",
    fontWeight: "700",
    fontSize: 18,
  },
  values: {
    color: "#323e44",
    fontSize: 18,
  },
});
