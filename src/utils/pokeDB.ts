import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFavorites = async (): Promise<Array<number>> => {
  const data = await AsyncStorage.getItem("PokeFavs");
  if (data) return JSON.parse(data || "[]");
  return [];
};

export const addFavorites = async (id: number): Promise<void> => {
  try {
    const favorites = await getFavorites();
    if (!favorites.includes(id)) {
      favorites.push(id);
      await AsyncStorage.setItem("PokeFavs", JSON.stringify(favorites));
    } else {
      await AsyncStorage.setItem(
        "PokeFavs",
        JSON.stringify(favorites.filter((v) => v !== id))
      );
    }
  } catch (err) {
    throw err;
  }
};
