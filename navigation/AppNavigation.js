import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import { View, ActivityIndicator } from "react-native";

import { Landing } from "../screens/unauthenticated/Landing/Landing";
import { Login } from "../screens/unauthenticated/Login/Login";
import { Register } from "../screens/unauthenticated/Register/Register";

import { Payment } from "../screens/authenticated/Payment/Payment";
import { Article } from "../screens/authenticated/Article/Article";
import { Message } from "../screens/authenticated/Message/Message";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigation = () => {
  const [isRefreshingToken, setIsRefreshingToken] = useState(true);
  const [token, setToken] = useState(null);
  const [initialRouteName, setInitialRouteName] = useState("Landing");

  useEffect(() => {
    SecureStore.getItemAsync("token").then((token) => {
      if (token) {
        fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/verify`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              setToken(token);
              setInitialRouteName("Connected");
            }
          })
          .catch((error) => {
            SecureStore.deleteItemAsync("token");
          });
      }
      setIsRefreshingToken(false);
    });
  }, []);

  if (isRefreshingToken) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#c8382e" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="Connected"
          component={AuthenticatedNav}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: "Payment",
          }}
        />
        <Stack.Screen
          name="Article"
          component={Article}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: "Article",
          }}
        />
        <Stack.Screen
          name="Message"
          component={Message}
          options={({ route }) => ({
            headerShown: true,
            headerBackTitleVisible: false,
            title: `${route.params.username}`,
          })}
        />
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: "Log in",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: "Sign up",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

import { Home } from "../screens/authenticated/Home/Home";
import { Search } from "../screens/authenticated/Search/Search";
import { Sell } from "../screens/authenticated/Sell/Sell";
import { Inbox } from "../screens/authenticated/Inbox/Inbox";
import { Profile } from "../screens/authenticated/Profile/Profile";

const AuthenticatedNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon name="search" color={color} />,
        }}
      />
      <Tab.Screen
        name="Sell"
        component={Sell}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon name="add" color={color} />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon name="mail" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon name="person" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
