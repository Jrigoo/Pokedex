import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Favorite } from "../screens/Favorite";
import { Pokemon } from "../screens/Pokemon";
import Icon from "react-native-vector-icons/FontAwesome5";

import type { StackScreenProps } from "@react-navigation/stack";

export type StackParamList = {
  Pokemon: { id: number; color: string };
  FavoMain: undefined;
};

const Stack = createStackNavigator<StackParamList>();
export const FavoNav: React.FC<StackScreenProps<StackParamList>> = ({
  navigation,
}) => {
  return (
    <Stack.Navigator initialRouteName="FavoMain">
      <Stack.Screen
        name="FavoMain"
        component={Favorite}
        options={{
          title: "Favoritos",
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
                navigation.navigate("FavoMain");
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
