import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
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

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const showMessage = (message) => {
    if (Platform.OS === "web") {
      window.alert(message);
    } else {
      Alert.alert("TravelGo", message);
    }
  };

  const handleRegister = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      showMessage("Барлық өрістерді толтырыңыз!");
      return;
    }

    if (!email.includes("@")) {
      showMessage("Email дұрыс енгізілмеген!");
      return;
    }

    if (password.length < 6) {
      showMessage("Құпиясөз кемінде 6 таңбадан тұруы керек!");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Құпиясөздер сәйкес келмейді!");
      return;
    }

    showMessage("Демо тіркелу сәтті өтті!");
    router.replace("/login");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <LinearGradient
        colors={[COLORS.primary, "#8E88FF"]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Ionicons name="airplane" size={45} color="#FFFFFF" />

        <Text style={styles.headerTitle}>
          Create Account
        </Text>

        <Text style={styles.headerSubtitle}>
          Join TravelGo and explore the world
        </Text>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.title}>Let's Get Started!</Text>
        <Text style={styles.subtitle}>
          Create your account to begin your journey
        </Text>

        <CustomInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          icon="person-outline"
          autoCapitalize="words"
        />

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
          placeholder="Create password"
          value={password}
          onChangeText={setPassword}
          icon="lock-closed-outline"
          secureTextEntry
        />

        <CustomInput
          label="Confirm Password"
          placeholder="Repeat password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          icon="shield-checkmark-outline"
          secureTextEntry
        />

        <CustomButton
          title="Create Account"
          onPress={handleRegister}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
          </Text>

          <TouchableOpacity
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.link}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
  },
  header: {
    height: 245,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
  },
  back: {
    position: "absolute",
    top: 35,
    left: 22,
    padding: 8,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 12,
  },
  headerSubtitle: {
    color: "#FFFFFF",
    marginTop: 8,
    fontSize: 14,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -25,
    padding: 25,
    paddingBottom: 45,
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
    marginBottom: 25,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: COLORS.textSecondary,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});