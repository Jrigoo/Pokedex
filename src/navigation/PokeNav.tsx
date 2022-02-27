import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Pokedex } from "../screens/Pokedex";
import { Pokemon } from "../screens/Pokemon";
import Icon from "react-native-vector-icons/FontAwesome5";

import type { StackScreenProps } from "@react-navigation/stack";

export type StackParamList = {
  Pokemon: { id: number; color: string };
  PokeMain: undefined;
};

const Stack = createStackNavigator<StackParamList>();
export const PokedexNav: React.FC<StackScreenProps<StackParamList>> = ({
  navigation,
}) => {
  return (
    <Stack.Navigator initialRouteName="PokeMain">
      <Stack.Screen
        name="PokeMain"
        component={Pokedex}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{
          title: "",
          headerTransparent: true,
          headerLeft: () => (
            <Icon
              name="arrow-left"
              color="#fff"
              size={20}
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.navigate("PokeMain");
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
