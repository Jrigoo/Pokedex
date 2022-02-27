import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { Account } from "../screens/Account";
import { useAuth } from "../hooks";
import { logoutUser } from "../utils/userDB";

export type StackParamList = {
  Login: undefined;
  AccountMain: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<StackParamList>();
export const AccountNav = () => {
  const { isAuth, setIsAuth } = useAuth();

  return (
    <Stack.Navigator initialRouteName={isAuth ? "AccountMain" : "Login"}>
      <Stack.Screen
        name="AccountMain"
        component={Account}
        options={{
          headerShown: isAuth,
          title: "",
          headerLeft: () => null,
          headerRight: () => (
            <Text
              style={{ marginRight: 20, color: "red" }}
              onPress={() => {
                logoutUser()
                  .then(() => setIsAuth(false))
                  .catch(() => {});
              }}
            >
              Logout
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
