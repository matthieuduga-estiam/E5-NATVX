import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { AppInput } from "../../../components/AppInput";
import { AppButton } from "../../../components/AppButton";
import { useForm } from "react-hook-form";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import { createToken } from "../../../services/NotificationServices";
import { useState, useEffect } from "react";

export const Login = ({ navigation }) => {
  const margins = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      paddingTop: 10,
      paddingBottom: margins.bottom,
      paddingLeft: margins.left,
      paddingRight: margins.right,
    },
    inputContainer: {
      width: "100%",
      alignItems: "center",
    },
    buttonContainer: {
      width: "100%",
      paddingHorizontal: 20,
    },
  });

  const [expoPushToken, setExpoPushToken] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.expoPushToken = expoPushToken;

    fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        SecureStore.setItemAsync("token", data.jwt);
        navigation.navigate("Connected");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    createToken().then((token) => {
      setExpoPushToken(token);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <AppInput
          control={control}
          name="email"
          placeholder="Email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email",
            },
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <AppInput
          control={control}
          name="password"
          placeholder="Password"
          rules={{ required: "Password is required" }}
          isPassword
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Log in"
          onPress={handleSubmit((data) => onSubmit(data))}
          fill
        />
      </View>
    </View>
  );
};
