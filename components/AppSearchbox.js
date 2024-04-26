import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SearchBar } from "@rneui/themed";

export const AppSearchbox = ({onSearch}) => {
  const styles = StyleSheet.create({
    containerInput: {
      width: "100%",
      backgroundColor: "transparent",
      borderRadius: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
    input: {
      backgroundColor: "#f5f4f7",
    },
  });

  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <SearchBar
      placeholder="Search for items"
      leftIcon={{ type: "font-awesome-5", name: "search", size: 16 }}
      containerStyle={styles.containerInput}
      inputContainerStyle={styles.input}
      value={search}
      onChangeText={updateSearch}
      onSubmitEditing={onSearch}
    />
  );
};
