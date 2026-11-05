import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { COLORS } from "../components/theme";

export default function MyTripsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Trips ✈️</Text>

      <Text style={styles.subtitle}>
        Your travel adventures in one place
      </Text>

      <View style={styles.emptyContainer}>
        <View style={styles.iconBox}>
          <Ionicons
            name="airplane-outline"
            size={70}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.emptyTitle}>
          No Trips Planned Yet
        </Text>

        <Text style={styles.emptyText}>
          Start exploring amazing destinations
          and plan your next adventure.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.buttonText}>
            Explore Destinations
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 55,
    paddingHorizontal: 22,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 70,
  },
  iconBox: {
    width: 135,
    height: 135,
    borderRadius: 40,
    backgroundColor: "#EDEBFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  emptyTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 25,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 25,
    paddingVertical: 17,
    borderRadius: 17,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});