import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
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

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <LinearGradient
        colors={[COLORS.primary, "#928DFF"]}
        style={styles.header}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.greeting}>Hello, Traveler! 👋</Text>
            <Text style={styles.heading}>
              Where to next?
            </Text>
          </View>

          <TouchableOpacity
            style={styles.notification}
            onPress={() => router.push("/notifications")}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.searchBox}
          onPress={() => router.push("/search")}
        >
          <Ionicons
            name="search-outline"
            size={22}
            color={COLORS.textSecondary}
          />
          <Text style={styles.searchText}>
            Search destinations...
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity
            onPress={() => router.push("/categories")}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.category}
              onPress={() =>
                router.push({
                  pathname: "/categories",
                  params: { category: category.name },
                })
              }
            >
              <Ionicons
                name={category.icon}
                size={23}
                color={COLORS.primary}
              />
              <Text style={styles.categoryText}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>
            Popular Destinations
          </Text>
        </View>

        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
          />
        ))}
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
    paddingBottom: 35,
  },
  header: {
    paddingTop: 55,
    paddingHorizontal: 22,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 8,
  },
  notification: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    height: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    marginTop: 30,
  },
  searchText: {
    color: COLORS.textSecondary,
    marginLeft: 12,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 17,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: COLORS.text,
  },
  seeAll: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  categories: {
    marginBottom: 28,
  },
  category: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    paddingHorizontal: 17,
    paddingVertical: 14,
    alignItems: "center",
    marginRight: 12,
  },
  categoryText: {
    marginTop: 7,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },
});