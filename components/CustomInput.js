import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS } from "./theme";

export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  icon = "mail-outline",
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
}) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        <Ionicons
          name={icon}
          size={21}
          color={COLORS.textSecondary}
        />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#98A2B3"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !visible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
          >
            <Ionicons
              name={visible ? "eye-off-outline" : "eye-outline"}
              size={21}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 9,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FF",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    height: 58,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    marginLeft: 12,
    outlineStyle: "none",
  },
});