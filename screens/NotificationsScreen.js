import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { COLORS } from "../components/theme";
import { useBookings } from "../context/BookingContext";

export default function NotificationsScreen() {
  const router = useRouter();
  const { bookings } = useBookings();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={25} color={COLORS.text} />
      </TouchableOpacity>

      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Your latest travel updates</Text>

      <View style={styles.card}>
        <Ionicons name="sparkles" size={27} color={COLORS.primary} />
        <View style={styles.textBox}>
          <Text style={styles.heading}>Welcome to TravelGo!</Text>
          <Text style={styles.message}>
            Explore destinations and plan your next adventure.
          </Text>
        </View>
      </View>

      {bookings.map((booking) => (
        <View key={booking.id} style={styles.card}>
          <Ionicons
            name={booking.status === "Cancelled" ? "close-circle" : "checkmark-circle"}
            size={27}
            color={booking.status === "Cancelled" ? COLORS.danger : COLORS.secondary}
          />
          <View style={styles.textBox}>
            <Text style={styles.heading}>
              {booking.status === "Cancelled" ? "Booking Cancelled" : "Demo Booking Created"}
            </Text>
            <Text style={styles.message}>
              {booking.destinationName} — {booking.date}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 22, paddingTop: 50, paddingBottom: 45 },
  title: { fontSize: 30, fontWeight: "800", color: COLORS.text, marginTop: 22 },
  subtitle: { color: COLORS.textSecondary, marginTop: 8, marginBottom: 25 },
  card: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#FFFFFF", padding: 18,
    borderRadius: 19, marginBottom: 14,
  },
  textBox: { flex: 1, marginLeft: 15 },
  heading: { fontSize: 16, fontWeight: "800", color: COLORS.text },
  message: { color: COLORS.textSecondary, lineHeight: 21, marginTop: 6 },
});