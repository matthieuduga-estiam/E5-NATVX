import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { AppButton } from "../../../components/AppButton";
import { set, useForm } from "react-hook-form";
import { AppInput } from "../../../components/AppInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { AppImageCard } from "../../../components/AppImageCard";

export const Sell = () => {
  const margins = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      marginTop: margins.top,
      marginBottom: margins.bottom,
      marginLeft: margins.left,
      marginRight: margins.right,
    },
    imageContainer: {
      width: "100%",
      height: "45%",
      padding: 10,
      backgroundColor: "lightgray",
    },
    buttonContainer: {
      width: "100%",
      height: "20%",
      padding: 10,
      backgroundColor: "lightgray",
      alignItems: "center",
      justifyContent: "center",
    },
    dataContainer: {
      width: "100%",
      height: "50%",
      padding: 10,
    },
  });

  const navigation = useNavigation();
  const [photos, setPhotos] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    data.photos = photos;

    const token = await SecureStore.getItemAsync("token");
    if (token) {
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/articles`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            Alert.alert("Error", data.error);
          } else {
            Alert.alert("Success", "Article uploaded successfully", [
              {
                text: "Ok",
                onPress: () => {
                  setPhotos([]);
                  reset();
                  navigation.navigate("Home")
                },
              },
            ]);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const askTypeImage = async () => {
    if (photos.length >= 5) {
      Alert.alert("Maximum photos reached", "You can only upload 5 photos");
      return;
    }

    Alert.alert(
      "Choose an option",
      "Pick an option to upload photos",
      [
        {
          text: "Camera",
          onPress: () => takePicture(),
        },
        {
          text: "Gallery",
          onPress: () => pickImage(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const ImagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    base64: true,
  };

  const takePicture = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== "granted") {
      Alert.alert(
        "Permission required",
        "You need to grant the permission to access your camera"
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync(ImagePickerOptions);

    if (!result.cancelled) {
      const { assets } = result;
      if (assets && assets.length > 0)
        setPhotos([
          ...photos,
          {
            name: assets[0].filename,
            base64: assets[0].base64,
            source: assets[0].uri,
          },
        ]);
    }
  };

  const pickImage = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== "granted") {
      Alert.alert(
        "Permission required",
        "You need to grant the permission to access your camera roll"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync(ImagePickerOptions);

    if (!result.cancelled) {
      const { assets } = result;
      if (assets && assets.length > 0)
        setPhotos([
          ...photos,
          {
            name: assets[0].filename,
            base64: assets[0].base64,
            source: assets[0].uri,
          },
        ]);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
      }}
      contentInset={{ marginBottom: 100}}
    >
      {photos.length === 0 ? (
        <Pressable onPress={pickImage} style={styles.buttonContainer}>
          <AppButton icon="add" title="Upload photos" onPress={askTypeImage} />
        </Pressable>
      ) : (
        <View style={styles.imageContainer}>
          <FlatList
            style={styles.listImages}
            data={photos}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <AppImageCard
                image={item}
                readOnly={false}
                onPress={() =>
                  setPhotos(photos.filter((photo) => photo !== item))
                }
              />
            )}
          />
          <AppButton icon="add" title="Upload photos" onPress={askTypeImage} />
        </View>
      )}
      <View style={styles.dataContainer}>
        <AppInput
          control={control}
          name="name"
          label="Name"
          placeholder="Name of the product"
        />

        <AppInput
          control={control}
          name="size"
          label="Size"
          placeholder="Size of the product"
        />

        <AppInput
          control={control}
          name="condition"
          label="Condition"
          placeholder="Condition of the product"
        />

        <AppInput
          control={control}
          name="price"
          label="Price"
          placeholder="Price of the product"
        />

        <AppInput
          control={control}
          name="description"
          label="Description"
          placeholder="Description of the product"
          multiline
        />

        <AppButton
          title="Upload"
          fill
          onPress={handleSubmit((data) => onSubmit(data))}
        />
      </View>
    </ScrollView>
  );
};
