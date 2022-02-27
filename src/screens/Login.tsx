import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../hooks";

import * as Yup from "yup";
import { useFormik } from "formik";

import { validateUser, storeUserData } from "../utils/userDB";

import type { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../navigation/AccountNav";
type Props = StackScreenProps<StackParamList, "Login">;

interface ILogin {
  username: string;
  password: string;
}

export const Login: React.FC<Props> = ({ navigation }) => {
  const { setUser, setIsAuth } = useAuth();
  const [error, setError] = React.useState("");

  function handleSubmit({ username, password }: ILogin) {
    validateUser(username, password)
      .then((res) => {
        if (res.body) setUser(res.body);
        setIsAuth(true);
        storeUserData(username, password);
        navigation.navigate("AccountMain");
      })
      .catch((err) => {
        setError(err.error);
      });
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (data) => handleSubmit(data),
    validationSchema: Yup.object({
      username: Yup.string().required("El usuario es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
  });

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.errors}>{formik.errors.username}</Text>
      <TextInput
        placeholder="Usuario"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => {
          formik.setFieldValue("username", text);
        }}
      />

      <Text style={styles.errors}>{formik.errors.password}</Text>
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => {
          formik.setFieldValue("password", text);
        }}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => formik.handleSubmit()}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      {error ? (
        <Text style={[styles.errors, { textAlign: "center" }]}>{error}</Text>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 30,
    marginTop: 40,
  },
  title: {
    color: "#323e44",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    letterSpacing: 1,
  },
  input: {
    color: "#323e44",
    height: 40,
    marginBottom: 10,
    borderWidth: 0.4,
    borderRadius: 10,
    borderColor: "#323e44",
    paddingHorizontal: 10,
  },

  errors: {
    color: "#ea6561",
    paddingVertical: 3,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ea6561",
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});
