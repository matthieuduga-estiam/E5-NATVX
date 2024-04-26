import { SafeAreaProvider } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";
import { KeyboardAvoidingView, Platform } from "react-native";

import { AppNavigation } from "./navigation/AppNavigation";

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51OCVAKCCCaLvnuxiDz99FMJ3DWQjXaJGLDD0NOun3qeWnfU3aGImlefgBSUpAZQg6UdtW5frUn6fpLvD3EonqlkO008GsD26e0">
      <SafeAreaProvider>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <AppNavigation />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </StripeProvider>
  );
}
