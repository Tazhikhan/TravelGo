import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { BookingProvider } from "../../context/BookingContext";
import { FavoritesProvider } from "../../context/FavoritesContext";
import { ProfileProvider } from "../../context/ProfileContext";

export default function RootLayout() {
  return (
    <ProfileProvider>
      <BookingProvider>
        <FavoritesProvider>
          <StatusBar style="auto" />

          <Stack
            screenOptions={{
              headerShown: false,
              animation: "fade",
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="forgot-password" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="destination/[id]" />
            <Stack.Screen name="booking" />
            <Stack.Screen name="my-bookings" />
            <Stack.Screen name="edit-profile" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="about" />
          </Stack>
        </FavoritesProvider>
      </BookingProvider>
    </ProfileProvider>
  );
}