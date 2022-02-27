import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks";
import { useIsFocused } from "@react-navigation/native";
import { Profile } from "../components/Profile";

import type { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../navigation/AccountNav";
type Props = StackScreenProps<StackParamList, "AccountMain">;

import React from "react";

export const Account: React.FC<Props> = ({ navigation }) => {
  const { isAuth, user } = useAuth();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isAuth) return navigation.navigate("Login");
    navigation.setOptions({
      title: user.username,
    });
  }, [isAuth, isFocused]);

  return (
    <SafeAreaView>
      {isAuth ? (
        <Profile user={user} />
      ) : (
        <ActivityIndicator size="large" color="#ea6561" />
      )}
    </SafeAreaView>
  );
};
