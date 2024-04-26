import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Divider } from "@rneui/themed";
import { AppButton } from "../../../components/AppButton";
import { AppImageCard } from "../../../components/AppImageCard";

export const Article = ({ route, navigation }) => {
  const { item } = route.params;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    imageContainer: {
      width: "100%",
      height: "45%",
      padding: 10,
      backgroundColor: "lightgrey",
    },
    dataContainer: {
      width: "100%",
      height: "55%",
    },
    headerContainer: {
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    contentContainer: {
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    footerContainer: {
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    price: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 10,
    },
    size: {
      fontSize: 16,
      marginTop: 10,
    },
    divider: {
      marginTop: 10,
      width: "100%",
    },
    description: {
      fontSize: 16,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FlatList
          data={item.photos}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <AppImageCard
              image={{ source: item }}
            />
          )}
        />
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.size}>{item.size}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.contentContainer}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.footerContainer}>
          <AppButton
            title="Buy"
            fill
            onPress={() => {
              navigation.navigate("Payment", { item: item });
            }}
          />
          <AppButton
            title="Contact"
            onPress={() => {
              navigation.navigate("Message", {
                username: item.owner.username,
                id: item.owner._id,
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};
