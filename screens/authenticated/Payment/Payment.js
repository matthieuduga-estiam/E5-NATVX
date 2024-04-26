import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { AppButton } from "../../../components/AppButton";
import * as SecureStore from "expo-secure-store";

export const Payment = ({ route, navigation }) => {
  const { item } = route.params;

  const [isRefreshingToken, setIsRefreshingToken] = useState(true);

  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    cardContainer: {
      width: "100%",
      height: "30%",
    },
    cardField: {
      width: "100%",
      height: "20%",
    },
    orderContainer: {
      width: "100%",
      height: "20%",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
    },
  });

  const getProfile = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      setToken(token);
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setIsRefreshingToken(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handlePayment = async () => {
    setIsRefreshingToken(true);

    if (!cardDetails?.complete) {
      Alert.alert("Please enter your card details");
      setIsRefreshingToken(false);
      return;
    }

    const billingDetails = {
      amount: item.price * 100,
      currency: "usd",
      email: user.email,
      item: item.name,
      name: user.firstName + " " + user.lastName,
      address: user.address,
      city: user.city,
      zipCode: user.zipCode,
      coutry: user.country,
    };

    try {
      const { clientSecret, error } = await fetchStripeInstance(billingDetails);
      if (error) {
        Alert.alert("Error", "Unable to process payment");
        setIsRefreshingToken(false);
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          paymentMethodData: cardDetails,
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
          setIsRefreshingToken(false);
        } else if (paymentIntent) {
          successfulPayment();
          Alert.alert("Payment Successful", "Your payment was successful", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Home");
              },
            },
          ]);
        }
      }
    } catch (e) {
      setIsRefreshingToken(false);
      Alert.alert("Error", e.message);
    }

    setIsRefreshingToken(false);
  };

  const successfulPayment = () => {
    fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/articles/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        isSold: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsRefreshingToken(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchStripeInstance = async (billingDetails) => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/payments`,
      {
        method: "POST",
        body: JSON.stringify(billingDetails),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (isRefreshingToken) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#c8382e" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.orderContainer}>
        <Text style={styles.price}>Price: ${item.price}</Text>
      </View>
      <View style={styles.cardContainer}>
        <CardField
          style={styles.cardField}
          postalCodeEnabled={false}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
        />
        <AppButton title="Pay" onPress={handlePayment} />
      </View>
    </View>
  );
};
