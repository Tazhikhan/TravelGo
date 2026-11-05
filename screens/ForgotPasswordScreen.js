import { Ionicons } from "@expo/vector-icons";
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

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email.trim() || !email.includes("@")) {
      if (Platform.OS === "web") {
        window.alert("Дұрыс email енгізіңіз!");
      } else {
        Alert.alert("Қате", "Дұрыс email енгізіңіз!");
      }
      return;
    }

    if (Platform.OS === "web") {
      window.alert("Demo: қалпына келтіру сұранысы қабылданды.");
    } else {
      Alert.alert(
        "Demo Mode",
        "Қалпына келтіру сұранысы қабылданды. Нақты email жіберілмейді."
      );
    }

    router.replace("/login");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={25}
          color={COLORS.text}
        />
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <Ionicons
          name="lock-open-outline"
          size={55}
          color={COLORS.primary}
        />
      </View>

      <Text style={styles.title}>Forgot Password?</Text>

      <Text style={styles.subtitle}>
        Don't worry! Enter your email address and
        we'll help you reset your password.
      </Text>

      <View style={styles.form}>
        <CustomInput
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          icon="mail-outline"
          keyboardType="email-address"
        />

        <CustomButton
          title="Reset Password"
          onPress={handleReset}
        />
      </View>

      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => router.replace("/login")}
      >
        <Ionicons
          name="arrow-back"
          size={18}
          color={COLORS.primary}
        />
        <Text style={styles.loginText}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 45,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 115,
    height: 115,
    borderRadius: 35,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 65,
    marginBottom: 35,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 15,
  },
  form: {
    marginTop: 45,
  },
  loginLink: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  loginText: {
    color: COLORS.primary,
    fontWeight: "700",
    marginLeft: 8,
  },
});