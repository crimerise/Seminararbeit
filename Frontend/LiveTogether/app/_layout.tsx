import { Stack } from "expo-router";
import './globals.css';
import {StatusBar} from "react-native";

export default function RootLayout() {
  return (
    <>
    <StatusBar hidden={true} />

      <Stack>
        // Login first without navbar
        <Stack.Screen
            name="login"
            options={{ headerShown: false }}
        />
        // Tabs after Login
        <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="movies/[id]"
            options={{ headerShown: false }}
        />
      </Stack>

      </>
    );
}
