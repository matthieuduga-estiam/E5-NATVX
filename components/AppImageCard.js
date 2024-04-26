import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

export const AppImageCard = ({ image, readOnly = true, onPress }) => {
  const styles = StyleSheet.create({
    deleteContainer: {
      position: "absolute",
      top: 0,
      right: 0,
      backgroundColor: "#007782",
      padding: 5,
      borderRadius: 5,
    },
    deleteText: {
      color: "white",
    },
    imageContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    image: {
      width: 260,
      height: 300,
      borderWidth: 2,
      borderColor: "#d35647",
      margin: 8,
    },
  });

  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: image.source }} style={styles.image} />
      {!readOnly && (
        <TouchableOpacity onPress={onPress} style={styles.deleteContainer}>
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
