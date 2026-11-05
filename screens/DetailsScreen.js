import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import CustomButton from "../components/CustomButton";
import { COLORS } from "../components/theme";
import { destinations } from "../data/destinations";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const destination = destinations.find(
    (item) => item.id === id
  );

  if (!destination) {
    return (
      <View style={styles.center}>
        <Text>Destination not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: destination.image }}
        style={styles.image}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={COLORS.text}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>
          {destination.name}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={18}
            color={COLORS.primary}
          />
          <Text style={styles.location}>
            {destination.location}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.category}>
            {destination.category}
          </Text>

          <View style={styles.rating}>
            <Ionicons
              name="star"
              size={18}
              color="#FFB547"
            />
            <Text style={styles.ratingText}>
              {destination.rating}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          About Destination
        </Text>

        <Text style={styles.description}>
          {destination.description}
        </Text>

        <Text style={styles.sectionTitle}>
          Estimated Price
        </Text>

        <Text style={styles.price}>
          {destination.price.toLocaleString()} ₸
        </Text>

        <CustomButton
          title="Book Now"
          onPress={() =>
            router.push({
              pathname: "/booking",
              params: { id: destination.id },
            })
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 330,
  },
  backButton: {
    position: "absolute",
    top: 45,
    left: 20,
    backgroundColor: "#FFFFFF",
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFFFFF",
    marginTop: -30,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  location: {
    color: COLORS.textSecondary,
    marginLeft: 7,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  category: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontWeight: "700",
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 30,
    marginBottom: 12,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 25,
  },
  price: {
    color: COLORS.primary,
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
  },
});