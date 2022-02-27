import React from "react";

import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Favorite } from "../screens/Favorite";

import { PokedexNav } from "./PokeNav";
import { AccountNav } from "./AccountNav";
import { FavoNav } from "./FavoNav";

import Icon from "react-native-vector-icons/FontAwesome5";

export type StackParamList = {
  Favorite: undefined;
  Pokedex: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<StackParamList>();

export const Navigation = () => {
  return (
    <Tab.Navigator initialRouteName="Pokedex">
      <Tab.Screen
        name="Favorite"
        component={FavoNav}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
          tabBarLabel: "Favoritos",
          tabBarActiveTintColor: "#ea6561",
          tabBarInactiveTintColor: "gray",
          title: "Favoritos",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Pokedex"
        component={PokedexNav}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../assets/pokeball.png")}
              style={{ width: 60, height: 60, top: -15 }}
            />
          ),
          tabBarLabel: "",
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountNav}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
          tabBarLabel: "Mi cuenta",
          tabBarActiveTintColor: "#ea6561",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
