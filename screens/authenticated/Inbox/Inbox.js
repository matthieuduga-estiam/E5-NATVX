import { useState, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Divider } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

import { AppInboxCard } from "../../../components/AppInboxCard";

export const Inbox = ({ navigation }) => {
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
    topContainer: {
      height: "8%",
      width: "100%",
    },
    title: {
      textAlign: "center",
      fontSize: 24,
      fontWeight: "bold",
      paddingBottom: 10,
    },
    itemsContainer: {
      height: "92%",
      width: "100%",
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignContent: "flex-start",
    },
    list: {
      width: "100%",
      height: "100%",
    },
  });

  const [searchResults, setSearchResults] = useState([]);

  const getConversations = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/conversations/find`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getConversations();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Inbox</Text>
        <Divider />
      </View>

      <View style={styles.itemsContainer}>
        <FlatList
          style={styles.list}
          data={searchResults}
          horizontal={false}
          renderItem={({ item }) => (
            <AppInboxCard item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </View>
  );
};