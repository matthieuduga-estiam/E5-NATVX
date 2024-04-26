import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const AppMessageCard = ({ message }) => {
  const styles = StyleSheet.create({
    container: {
      margin: 10,
    },
    mesageCard: {
      width: "100%",
      height: "100%",
    },
    messageHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    username: {
      fontSize: 20,
      fontWeight: "bold",
    },
    text: {
      fontSize: 16,
    },
    time: {
      fontSize: 12,
    },
  });

  const date = new Date(message.createdAt);

  return (
    <View style={styles.container}>
      <View style={styles.messageCard}>
        <View style={styles.messageHeader}>
          <Text style={styles.username}>{message.sender.username || ""}</Text>
          <Text style={styles.time}>
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </Text>
        </View>
        <Text style={styles.text}>{message.content}</Text>
      </View>
    </View>
  );
};
