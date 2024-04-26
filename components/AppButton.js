import { TouchableOpacity, StyleSheet, Text, Pressable } from "react-native";
import { Icon } from "@rneui/themed";

export const AppButton = ({ title, icon, onPress, fill, overWriteStyle }) => {
  const localStyle = StyleSheet.create({
    button: {
      backgroundColor: fill ? "#007782" : "transparent",
      borderWidth: 1,
      borderColor: "#007782",
      borderRadius: 5,
      alignItems: "center",
      marginVertical: 10,
      paddingVertical: 10,
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
    },
    icon: {
      marginRight: 10,
    },
    text: {
      color: fill ? "white" : "#007782",
      fontSize: 16,
    },
  });

  const styles = { ...localStyle, ...overWriteStyle };

  return (
    <Pressable style={styles.button} onPress={onPress}>
      {icon && (
        <Icon name={icon} size={16} color={fill ? "white" : "#007782"} />
      )}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
