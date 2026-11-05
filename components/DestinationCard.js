import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useFavorites } from "../context/FavoritesContext";
import { COLORS } from "./theme";

export default function DestinationCard({ destination }) {
  const router = useRouter();

  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(destination.id);

  const openDetails = () => {
    router.push({
      pathname: "/destination/[id]",
      params: { id: destination.id },
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={openDetails}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: destination.image }}
          style={styles.image}
        />

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(destination.id)}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={23}
            color={favorite ? "#F04438" : COLORS.text}
          />
        </TouchableOpacity>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {destination.category}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {destination.name}
          </Text>

          <View style={styles.rating}>
            <Ionicons
              name="star"
              size={15}
              color="#FFB547"
            />

            <Text style={styles.ratingText}>
              {destination.rating}
            </Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={16}
            color={COLORS.textSecondary}
          />

          <Text style={styles.location} numberOfLines={1}>
            {destination.location}
          </Text>
        </View>

        <View style={styles.bottom}>
          <View>
            <Text style={styles.priceLabel}>
              Starting from
            </Text>

            <Text style={styles.price}>
              {destination.price.toLocaleString()} ₸
            </Text>
          </View>

          <View style={styles.arrowButton}>
            <Ionicons
              name="arrow-forward"
              size={19}
              color="#FFFFFF"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#101828",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
  },
  favoriteButton: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  categoryBadge: {
    position: "absolute",
    left: 14,
    bottom: 14,
    backgroundColor: "rgba(255,255,255,0.94)",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 12,
  },
  categoryText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
  },
  content: {
    padding: 17,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    flex: 1,
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.text,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  ratingText: {
    marginLeft: 5,
    fontWeight: "700",
    color: COLORS.text,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  location: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 13,
    marginLeft: 6,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  price: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primary,
    marginTop: 3,
  },
  arrowButton: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});