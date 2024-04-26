import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppButton } from "../../../components/AppButton";

export const Landing = ({ navigation }) => {
  const margins = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
      paddingTop: margins.top,
      paddingBottom: margins.bottom,
      paddingLeft: margins.left,
      paddingRight: margins.right,
    },
    imageContainer: {
      height: "65%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    actionContainer: {
      height: "35%",
      width: "100%",
      alignItems: "center",
    },
    buttonContainer: {
      width: "100%",
      paddingHorizontal: 20,
    },
    image: {
      height: "90%",
      width: "90%",
      borderRadius: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      paddingBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/app/landing.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.actionContainer}>
        <Text style={styles.title}>
          Join and sell pre-loved clothes with no fees
        </Text>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Sign up for Vinted"
            onPress={() => navigation.navigate("Register")}
            fill
          />
          <AppButton
            title="I already have an account"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </View>
  );
};
