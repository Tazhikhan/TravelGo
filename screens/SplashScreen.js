import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { COLORS } from "../components/theme";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient
      colors={[COLORS.primary, "#928DFF"]}
      style={styles.container}
    >
      <View style={styles.logo}>
        <Text style={styles.logoIcon}>✈</Text>
      </View>

      <Text style={styles.title}>TravelGo</Text>

      <Text style={styles.subtitle}>
        Explore the world with us
      </Text>

      <ActivityIndicator
        size="large"
        color={COLORS.white}
        style={styles.loader}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  logoIcon: {
    fontSize: 60,
    color: "#FFFFFF",
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 10,
  },
  loader: {
    position: "absolute",
    bottom: 80,
  },
});