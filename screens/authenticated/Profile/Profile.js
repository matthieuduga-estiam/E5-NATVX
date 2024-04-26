import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { AppButton } from "../../../components/AppButton";
import { useForm } from "react-hook-form";
import { AppInput } from "../../../components/AppInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Profile = () => {
  const margins = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      marginTop: margins.top,
      marginBottom: margins.bottom,
      marginLeft: margins.left,
      marginRight: margins.right,
    },
    infoContainer: {
      width: "80%",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getUser = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const saveUser = async (data) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          Alert.alert("Success", "User updated successfully");
        })
        .catch((error) => {
          console.error("Error:", error);
          Alert.alert("Error", "An error occurred");
        });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUser();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", }}>
      <Text style={styles.title}>Profile</Text>
      {user && (
        <View style={styles.infoContainer}>
          <AppInput
            control={control}
            name="username"
            placeholder="Username"
            defaultValue={user.username}
          />

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
            defaultValue={user.email}
          />

          <AppInput
            control={control}
            name="firstName"
            placeholder="First name"
            defaultValue={user.firstName}
          />

          <AppInput
            control={control}
            name="lastName"
            placeholder="Last name"
            defaultValue={user.lastName}
          />

          <AppInput
            control={control}
            name="phone"
            placeholder="Phone"
            defaultValue={user.phone}
          />

          <AppInput
            control={control}
            name="address"
            placeholder="Address"
            defaultValue={user.address}
          />

          <AppInput
            control={control}
            name="city"
            placeholder="City"
            defaultValue={user.city}
          />

          <AppInput
            control={control}
            name="zipCode"
            placeholder="Zip code"
            defaultValue={user.zipCode}
          />

          <AppInput
            control={control}
            name="country"
            placeholder="Country"
            defaultValue={user.country}
          />

          <AppButton
            title="Save"
            onPress={handleSubmit((data) => saveUser(data))}
            fill
          />

          <AppButton
            title="Logout"
            overWriteStyle={{ backgroundColor: "red", color: "white"}}
            onPress={async () => {
              await SecureStore.deleteItemAsync("token");
              navigation.navigate("Login");
            }}
          />

        </View>
      )}
    </ScrollView>
  );
};
