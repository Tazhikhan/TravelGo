import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { COLORS } from "../components/theme";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Қате", "Барлық өрістерді толтырыңыз!");
      return;
    }

    router.replace("/home");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={[COLORS.primary, "#8E88FF"]}
          style={styles.header}
        >
          <View style={styles.iconBox}>
            <Ionicons name="airplane" size={40} color="#FFFFFF" />
          </View>

          <Text style={styles.brand}>TravelGo</Text>
          <Text style={styles.headerText}>
            Your journey starts here
          </Text>
        </LinearGradient>

        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Sign in to continue your adventure
          </Text>

          <CustomInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            icon="mail-outline"
            keyboardType="email-address"
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            icon="lock-closed-outline"
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => router.push("/forgot-password")}
          >
            <Text style={styles.forgot}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <CustomButton
            title="Sign In"
            onPress={handleLogin}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/register")}
            >
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.demo}>
            Demo mode: any email and password
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flexGrow: 1,
  },
  header: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 35,
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    fontSize: 35,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 15,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 15,
    marginTop: 5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -35,
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 40,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 7,
    marginBottom: 30,
  },
  forgot: {
    color: COLORS.primary,
    fontWeight: "600",
    textAlign: "right",
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  footerText: {
    color: COLORS.textSecondary,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  demo: {
    textAlign: "center",
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 25,
  },
});