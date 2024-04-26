import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppMessageCard } from "../../../components/AppMessageCard";
import { AppButton } from "../../../components/AppButton";
import { useForm } from "react-hook-form";
import { AppInput } from "../../../components/AppInput";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Divider } from "@rneui/themed";

export const Message = ({ route, navigation }) => {
  const margins = useSafeAreaInsets();
  const { id } = route.params;

  const [isRefreshingToken, setIsRefreshingToken] = useState(true);

  const [destId, setDestId] = useState(id);
  const [me, setMe] = useState({});
  const [tokenJWT, setTokenJWT] = useState("");

  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);

  const styles = StyleSheet.create({
    container: {
      marginBottom: margins.bottom,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
    },
    messagesContainer: {
      width: "100%",
      height: "90%",
    },
    actionContainer: {
      width: "100%",
      height: "10%",
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingTop: 25,
    },
    textZone: {
      width: "80%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    sendButton: {
      width: "20%",
      height: "100%",
      justifyContent: "center",
    },
  });

  const scrollRef = useRef();

  const getConversation = async (me, jwt) => {
    let model = {
      sender: me._id,
      receiver: destId,
    };

    fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/conversations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    })
      .then((response) => response.json())
      .then((data) => {
        setConversation(data.conversation);
        setMessages(data.messages);
        setMembers(data.members);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setIsRefreshingToken(false);
  };

  const getMe = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      setTokenJWT(token);
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setMe(data);
          getConversation(data, token);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const me = members.find((member) => member._id !== destId);

    let model = {
      conversation: conversation._id,
      sender: me._id,
      content: data.message,
    };

    const token = await SecureStore.getItemAsync("token");
    fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    })
      .then((response) => response.json())
      .then((data) => {
        getConversation(me, tokenJWT);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getMe();
  }, []);

  if (isRefreshingToken) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#c8382e" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={scrollRef}
      onContentSizeChange={() => {
        scrollRef.current.scrollToEnd({ animated: true });
      }}
    >
      <View style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <AppMessageCard key={index} message={message} />
        ))}
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.textZone}>
          <AppInput
            control={control}
            name="message"
            rules={{ required: true }}
            placeholder="Type your message here"
          />
        </View>
        <View style={styles.sendButton}>
          <AppButton title="Send" fill onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </ScrollView>
  );
};
