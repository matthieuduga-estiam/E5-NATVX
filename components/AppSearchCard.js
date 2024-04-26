import { Pressable, Image, Text, StyleSheet, View } from "react-native";

export const AppSearchCard = ({ item, navigation }) => {
  const styles = StyleSheet.create({
    card: {
      marginVertical: 8,
      backgroundColor: "white",
      flexBasis: "47%",
      marginHorizontal: 5,
      borderColor: "#000",
      borderWidth: 1,
    },
    header: {
      paddingVertical: 17,
      paddingHorizontal: 16,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    footer: {
      paddingVertical: 17,
      paddingHorizontal: 16,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    image: {
      flex: 1,
      height: 150,
      width: null,
    },
    username: {
      fontSize: 18,
      flex: 1,
    },
    name: {
      fontSize: 18,
      flex: 1,
    },
    price: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 5,
    },
    size: {
      fontSize: 14,
      fontWeight: "light",
      marginTop: 5,
    },
  });

  const handlePress = () => {
    navigation.navigate("Article", { item: item });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <View>
          <Text style={styles.username}>{item.owner.username}</Text>
        </View>
      </View>

      <Image style={styles.image} source={{ uri: item.photos[0] }} />

      <View style={styles.footer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.size}>{item.size}</Text>
      </View>
    </Pressable>
  );
};
