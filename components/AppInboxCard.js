import { Pressable, Image, Text, StyleSheet, View } from "react-native";
import { Divider } from "@rneui/themed";

export const AppInboxCard = ({ me, item, navigation }) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    card: {
      width: "100%",
      padding: 10,
      borderRadius: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
    message: {
      fontSize: 16,
    },
  });

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("Message", {
          username: item.otherUser,
          id: item.otherUserId,
        })
      }
    >
      <View style={styles.card}>
        <Text style={styles.title}>{item.otherUser}</Text>
        <Text style={styles.message}>{item.lastMessage}</Text>
      </View>
      <Divider />
    </Pressable>
  );
};
