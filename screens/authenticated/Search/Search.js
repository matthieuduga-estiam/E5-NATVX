import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Divider } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

import { AppSearchbox } from "../../../components/AppSearchbox";
import { AppSearchCard } from "../../../components/AppSearchCard";

export const Search = ({ navigation }) => {
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
      height: "10%",
      width: "100%",
      justifyContent: "center",
    },
    searchBoxContainer: {
      padding: 10,
    },
    itemsContainer: {
      height: "90%",
      width: "100%",
      alignItems: "center",
      paddingTop: 20,
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

  const handleSearch = (element) => {
    var search = element.nativeEvent.text;
    searchItems(search);
  };

  const searchItems = async (search) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/articles/search`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: search }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      searchItems();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.searchBoxContainer}>
          <AppSearchbox onSearch={handleSearch} />
        </View>
        <Divider />
      </View>

      <View style={styles.itemsContainer}>
        <FlatList
          style={styles.list}
          data={searchResults}
          numColumns={2}
          renderItem={({ item }) => (
            <AppSearchCard item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </View>
  );
};
