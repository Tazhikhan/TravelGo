import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { COLORS } from "../components/theme";
import { useBookings } from "../context/BookingContext";

export default function MyBookingsScreen() {
  const router = useRouter();
  const { bookings, cancelBooking } = useBookings();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={() => router.replace("/profile")}>
        <Ionicons name="arrow-back" size={26} color={COLORS.text} />
      </TouchableOpacity>

      <Text style={styles.title}>My Bookings</Text>
      <Text style={styles.subtitle}>Manage your travel reservations</Text>

      {bookings.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="calendar-outline" size={75} color={COLORS.primary} />
          <Text style={styles.emptyTitle}>No Bookings Yet</Text>
          <Text style={styles.muted}>Your demo reservations will appear here.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/home")}
          >
            <Text style={styles.buttonText}>Explore Destinations</Text>
          </TouchableOpacity>
        </View>
      ) : (
        bookings.map((booking) => (
          <View key={booking.id} style={styles.card}>
            <Image source={{ uri: booking.image }} style={styles.image} />
            <View style={styles.cardBody}>
              <Text style={styles.name}>{booking.destinationName}</Text>
              <Text style={styles.muted}>Traveler: {booking.name}</Text>
              <Text style={styles.muted}>Date: {booking.date}</Text>
              <Text style={styles.muted}>Guests: {booking.guests}</Text>
              <Text style={styles.price}>{booking.total.toLocaleString()} ₸</Text>
              <Text
                style={[
                  styles.status,
                  booking.status === "Cancelled" && { color: COLORS.danger },
                ]}
              >
                {booking.status}
              </Text>

              {booking.status !== "Cancelled" && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => cancelBooking(booking.id)}
                >
                  <Text style={styles.cancelText}>Cancel Booking</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 22, paddingTop: 50, paddingBottom: 45, flexGrow: 1 },
  title: { fontSize: 30, fontWeight: "800", color: COLORS.text, marginTop: 20 },
  subtitle: { color: COLORS.textSecondary, marginTop: 8, marginBottom: 25 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  emptyTitle: { fontSize: 23, fontWeight: "800", color: COLORS.text, marginTop: 22 },
  muted: { color: COLORS.textSecondary, fontSize: 14, marginTop: 7 },
  button: {
    backgroundColor: COLORS.primary, borderRadius: 16,
    padding: 16, marginTop: 25,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
  card: {
    backgroundColor: "#FFFFFF", borderRadius: 22,
    overflow: "hidden", marginBottom: 20, elevation: 3,
  },
  image: { width: "100%", height: 170 },
  cardBody: { padding: 18 },
  name: { fontSize: 21, fontWeight: "800", color: COLORS.text },
  price: { fontSize: 21, fontWeight: "800", color: COLORS.primary, marginTop: 14 },
  status: { color: "#13B8A6", fontWeight: "700", marginTop: 10 },
  cancelButton: {
    backgroundColor: "#FFF1F0", borderRadius: 13,
    padding: 14, alignItems: "center", marginTop: 15,
  },
  cancelText: { color: COLORS.danger, fontWeight: "700" },
});