import { LinearGradient } from "expo-linear-gradient";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { COLORS } from "./theme";

export default function CustomButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  style,
}) {
  const isSecondary = variant === "secondary";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={loading || disabled}
      style={[
        styles.wrapper,
        style,
        disabled && styles.disabled,
      ]}
    >
      {isSecondary ? (
        <Text style={styles.secondaryText}>{title}</Text>
      ) : (
        <LinearGradient
          colors={[COLORS.primary, "#8B85FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryText}>{title}</Text>
          )}
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 56,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#EEF0FF",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.55,
  },
});