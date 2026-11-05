import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import CustomButton from "../components/CustomButton";
import { COLORS } from "../components/theme";
import { useProfile } from "../context/ProfileContext";

export default function EditProfileScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useProfile();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [city, setCity] = useState(profile.city);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone);
    setCity(profile.city);
  }, [profile]);

  const save = () => {
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a name and valid email.");
      return;
    }

    updateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
    });

    router.replace("/profile");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={25} color={COLORS.text} />
      </TouchableOpacity>

      <Text style={styles.title}>Edit Profile</Text>
      <Text style={styles.subtitle}>Update your personal information</Text>

      <View style={styles.avatar}>
        <Ionicons name="person" size={55} color={COLORS.primary} />
      </View>

      {[
        { label: "Full Name", value: name, setter: setName },
        { label: "Email", value: email, setter: setEmail },
        { label: "Phone Number", value: phone, setter: setPhone },
        { label: "City", value: city, setter: setCity },
      ].map((field) => (
        <View key={field.label}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            value={field.value}
            onChangeText={field.setter}
            placeholder={field.label}
          />
        </View>
      ))}

      {!!error && <Text style={styles.error}>{error}</Text>}

      <CustomButton title="Save Changes" onPress={save} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 24, paddingTop: 50, paddingBottom: 50 },
  title: { fontSize: 30, fontWeight: "800", color: COLORS.text, marginTop: 25 },
  subtitle: { color: COLORS.textSecondary, marginTop: 8 },
  avatar: {
    width: 110, height: 110, borderRadius: 35,
    backgroundColor: "#EDEBFF", justifyContent: "center",
    alignItems: "center", alignSelf: "center", marginVertical: 30,
  },
  label: { fontSize: 14, fontWeight: "700", color: COLORS.text, marginBottom: 9 },
  input: {
    backgroundColor: "#FFFFFF", borderRadius: 15, height: 56,
    borderWidth: 1, borderColor: COLORS.border,
    paddingHorizontal: 16, marginBottom: 20, fontSize: 15,
  },
  error: { color: COLORS.danger, marginBottom: 12 },
});