import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "./theme";

export default function ComingSoon({ title }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons
        name="construct-outline"
        size={70}
        color={COLORS.primary}
      />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>
        This feature will be available soon.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 25,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 12,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});