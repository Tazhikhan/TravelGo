import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import DestinationCard from "../components/DestinationCard";
import { COLORS } from "../components/theme";
import { useFavorites } from "../context/FavoritesContext";
import { destinations } from "../data/destinations";

export default function FavoritesScreen() {
  const router = useRouter();

  const { favorites } = useFavorites();

  const favoriteDestinations = destinations.filter((item) =>
    favorites.includes(item.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites ❤️</Text>

      <Text style={styles.subtitle}>
        Your saved travel destinations
      </Text>

      <FlatList
        data={favoriteDestinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DestinationCard destination={item} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.iconBox}>
              <Ionicons
                name="heart-outline"
                size={65}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.emptyTitle}>
              No Favorites Yet
            </Text>

            <Text style={styles.emptyText}>
              Explore destinations and tap the heart
              icon to save your favorite places.
            </Text>

            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => router.push("/home")}
            >
              <Text style={styles.exploreText}>
                Explore Destinations
              </Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 7,
  },
  list: {
    paddingTop: 25,
    paddingBottom: 35,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  iconBox: {
    width: 125,
    height: 125,
    borderRadius: 35,
    backgroundColor: "#EDEBFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  emptyTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: COLORS.text,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 25,
  },
  exploreButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 25,
    paddingVertical: 16,
    borderRadius: 16,
  },
  exploreText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});