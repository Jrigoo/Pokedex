import AsyncStorage from "@react-native-async-storage/async-storage";

const USER = {
  username: "Juan",
  password: "12345",
};

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface IResponse {
  error: string;
  body: null | IUser;
}

export const validateUser = (
  username: string,
  password: string
): Promise<IResponse> => {
  if (USER.username !== username)
    return Promise.reject({ error: "Invalid Information", body: null });
  if (USER.password !== password)
    return Promise.reject({ error: "Invalid Information", body: null });

  return Promise.resolve({
    error: "",
    body: {
      username: username,
      firstName: "Juan",
      lastName: "Riquelme",
      email: "pk.juanr@gmail.com",
    },
  });
};

export const storeUserData = async (username: string, password: string) => {
  //Normalmente se guardaría el token, no tanto el username y el password asi a lo mili
  try {
    await AsyncStorage.setItem(
      "USER",
      JSON.stringify({ username: username, password: password })
    );
  } catch (e) {
    throw e;
  }
};

export const getUserData = async (): Promise<IUser | undefined> => {
  try {
    const u = await AsyncStorage.getItem("USER");
    if (u) {
      const { username, password } = JSON.parse(u);
      const res = await validateUser(username, password);
      if (res.body) return res.body;
    }
  } catch (e) {
    throw e;
  }
};
export const logoutUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("USER");
    await AsyncStorage.removeItem("PokeFavs");
    return;
  } catch (e) {
    throw e;
  }
};
