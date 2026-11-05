import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import DestinationCard from "../components/DestinationCard";
import { COLORS } from "../components/theme";
import { destinations } from "../data/destinations";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const filtered = destinations.filter((item) => {
    const text = `${item.name} ${item.location} ${item.category}`;
    return text.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Destinations</Text>
      <Text style={styles.subtitle}>
        Find your perfect travel destination
      </Text>

      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={22}
          color={COLORS.primary}
        />

        <TextInput
          style={styles.input}
          placeholder="Search places, countries..."
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DestinationCard destination={item} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No destinations found.
          </Text>
        }
      />
    </View>
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
    fontSize: 29,
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 7,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 58,
    borderRadius: 18,
    paddingHorizontal: 16,
    marginTop: 25,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: COLORS.text,
    outlineStyle: "none",
  },
  list: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    color: COLORS.textSecondary,
  },
});