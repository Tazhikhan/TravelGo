import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import CustomButton from "../components/CustomButton";
import { COLORS } from "../components/theme";
import { useBookings } from "../context/BookingContext";
import { destinations } from "../data/destinations";

export default function BookingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addBooking } = useBookings();

  const destination = destinations.find((item) => item.id === id);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("1");
  const [error, setError] = useState("");

  if (!destination) {
    return (
      <View style={styles.center}>
        <Text>Destination not found.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBooking = () => {
    const guestCount = Number(guests);
    const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const parsedDate = new Date(`${date}T12:00:00`);
    const isRealDate =
      validDate &&
      !Number.isNaN(parsedDate.getTime()) &&
      parsedDate.getFullYear() === Number(date.slice(0, 4)) &&
      parsedDate.getMonth() + 1 === Number(date.slice(5, 7)) &&
      parsedDate.getDate() === Number(date.slice(8, 10));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!name.trim()) {
      setError("Enter your full name.");
      return;
    }
    if (!isRealDate || parsedDate < today) {
      setError("Enter a valid future date: YYYY-MM-DD.");
      return;
    }
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 20) {
      setError("Guests must be between 1 and 20.");
      return;
    }

    setError("");

    addBooking({
      destinationId: destination.id,
      destinationName: destination.name,
      image: destination.image,
      name: name.trim(),
      date,
      guests: guestCount,
      total: destination.price * guestCount,
    });

    router.replace("/my-bookings");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
      </TouchableOpacity>

      <Text style={styles.title}>Book Your Adventure</Text>
      <Text style={styles.subtitle}>
        Complete your travel booking
      </Text>

      <View style={styles.destinationCard}>
        <Ionicons name="location" size={28} color={COLORS.primary} />
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Text style={styles.destinationName}>{destination.name}</Text>
          <Text style={styles.muted}>{destination.location}</Text>
        </View>
      </View>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your full name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Travel Date</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={setDate}
        keyboardType="numbers-and-punctuation"
      />

      <Text style={styles.label}>Number of Guests</Text>
      <TextInput
        style={styles.input}
        placeholder="1"
        value={guests}
        onChangeText={setGuests}
        keyboardType="number-pad"
      />

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Booking Summary</Text>
        <Text style={styles.muted}>
          Price per guest: {destination.price.toLocaleString()} ₸
        </Text>
        <Text style={styles.total}>
          Total: {(destination.price * (Number(guests) || 0)).toLocaleString()} ₸
        </Text>
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}

      <CustomButton
        title="Confirm Demo Booking"
        onPress={handleBooking}
      />

      <Text style={styles.disclaimer}>
        Demo only. No payment is charged and no real reservation is made.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 24, paddingTop: 50, paddingBottom: 50 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  back: {
    width: 45, height: 45, borderRadius: 15,
    backgroundColor: "#FFFFFF", alignItems: "center",
    justifyContent: "center", marginBottom: 25,
  },
  title: { fontSize: 29, fontWeight: "800", color: COLORS.text },
  subtitle: { color: COLORS.textSecondary, marginTop: 8, marginBottom: 25 },
  destinationCard: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF",
    padding: 20, borderRadius: 20, marginBottom: 28,
  },
  destinationName: { fontSize: 19, fontWeight: "800", color: COLORS.text },
  muted: { color: COLORS.textSecondary, fontSize: 13, marginTop: 6 },
  label: { fontSize: 14, fontWeight: "700", color: COLORS.text, marginBottom: 9 },
  input: {
    height: 56, backgroundColor: "#FFFFFF", borderWidth: 1,
    borderColor: COLORS.border, borderRadius: 15,
    paddingHorizontal: 16, fontSize: 15, marginBottom: 20,
    color: COLORS.text,
  },
  summary: {
    backgroundColor: "#FFFFFF", borderRadius: 20,
    padding: 20, marginVertical: 15,
  },
  summaryTitle: { fontSize: 18, fontWeight: "800", color: COLORS.text },
  total: { fontSize: 23, fontWeight: "800", color: COLORS.primary, marginTop: 15 },
  error: { color: COLORS.danger, marginBottom: 12, fontWeight: "600" },
  disclaimer: {
    textAlign: "center", color: COLORS.textSecondary,
    fontSize: 12, marginTop: 14, lineHeight: 19,
  },
  link: { color: COLORS.primary, marginTop: 15 },
});