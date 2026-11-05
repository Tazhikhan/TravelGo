import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import DestinationCard from "../components/DestinationCard";
import { COLORS } from "../components/theme";
import { categories, destinations } from "../data/destinations";

export default function CategoriesScreen() {
  const params = useLocalSearchParams();

  const [selected, setSelected] = useState(
    typeof params.category === "string"
      ? params.category
      : "All"
  );

  const filtered =
    selected === "All"
      ? destinations
      : destinations.filter(
          (item) => item.category === selected
        );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <Text style={styles.subtitle}>
        Choose your favorite travel style
      </Text>

      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.category,
              selected === category.name &&
                styles.activeCategory,
            ]}
            onPress={() => setSelected(category.name)}
          >
            <Ionicons
              name={category.icon}
              size={23}
              color={
                selected === category.name
                  ? "#FFFFFF"
                  : COLORS.primary
              }
            />

            <Text
              style={[
                styles.categoryText,
                selected === category.name &&
                  styles.activeText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.results}>
        {filtered.length} destinations found
      </Text>

      {filtered.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
    marginBottom: 25,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  activeCategory: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    marginLeft: 8,
    color: COLORS.text,
    fontWeight: "600",
  },
  activeText: {
    color: "#FFFFFF",
  },
  results: {
    color: COLORS.textSecondary,
    marginBottom: 20,
    fontWeight: "600",
  },
});