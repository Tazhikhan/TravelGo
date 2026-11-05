
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import { COLORS } from "../components/theme";
import { useBookings } from "../context/BookingContext";
import { useFavorites } from "../context/FavoritesContext";
import { useProfile } from "../context/ProfileContext";

const menuItems = [
  {
    title: "Edit Profile",
    icon: "person-outline",
    route: "/edit-profile",
  },
  {
    title: "My Bookings",
    icon: "calendar-outline",
    route: "/my-bookings",
  },
  {
    title: "Notifications",
    icon: "notifications-outline",
    route: "/notifications",
  },
  {
    title: "Settings",
    icon: "settings-outline",
    route: "/settings",
  },
  {
    title: "About TravelGo",
    icon: "information-circle-outline",
    route: "/about",
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  const { profile } = useProfile();
  const { bookings } = useBookings();
  const { favorites } = useFavorites();

  const activeBookings = bookings.filter(
    (item) => item.status !== "Cancelled"
  );

  const totalBookings = bookings.length;
  const totalFavorites = favorites.length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <LinearGradient
        colors={[COLORS.primary, "#918BFF"]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>
          My Profile
        </Text>

        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={55}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.name}>
          {profile.name}
        </Text>

        <Text style={styles.email}>
          {profile.email}
        </Text>

        <View style={styles.memberBadge}>
          <Ionicons
            name="star"
            size={15}
            color="#FFB547"
          />

          <Text style={styles.memberText}>
            Explorer Member
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {totalBookings}
            </Text>

            <Text style={styles.statLabel}>
              Trips
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {activeBookings.length}
            </Text>

            <Text style={styles.statLabel}>
              Bookings
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {totalFavorites}
            </Text>

            <Text style={styles.statLabel}>
              Favorites
            </Text>
          </View>
        </View>

        <View style={styles.welcomeCard}>
          <View style={styles.welcomeIcon}>
            <Ionicons
              name="airplane"
              size={25}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>
              Ready for your next trip?
            </Text>

            <Text style={styles.welcomeText}>
              Discover amazing destinations
              around the world.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/home")}
          >
            <Ionicons
              name="arrow-forward-circle"
              size={30}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>
          Account Settings
        </Text>

        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.menuItem}
            activeOpacity={0.8}
            onPress={() => router.push(item.route)}
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name={item.icon}
                size={22}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.menuText}>
              {item.title}
            </Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace("/login")}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#F04438"
          />

          <Text style={styles.logoutText}>
            Log Out
          </Text>
        </TouchableOpacity>

        <Text style={styles.version}>
          TravelGo v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  header: {
    paddingTop: 55,
    paddingBottom: 45,
    alignItems: "center",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 25,
  },

  avatar: {
    width: 105,
    height: 105,
    borderRadius: 35,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    fontSize: 25,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 15,
    textAlign: "center",
  },

  email: {
    color: "#FFFFFF",
    marginTop: 6,
    fontSize: 14,
  },

  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 15,
  },

  memberText: {
    color: "#FFFFFF",
    marginLeft: 7,
    fontWeight: "600",
  },

  body: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },

  stats: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 22,
    marginTop: -20,
    elevation: 4,
    shadowColor: "#101828",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 23,
    fontWeight: "800",
    color: COLORS.primary,
  },

  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 5,
  },

  welcomeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEBFF",
    borderRadius: 20,
    padding: 17,
    marginTop: 25,
  },

  welcomeIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeContent: {
    flex: 1,
    marginHorizontal: 12,
  },

  welcomeTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },

  welcomeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 5,
    lineHeight: 18,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 30,
    marginBottom: 15,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 17,
    marginBottom: 11,
  },

  menuIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#EEEEFF",
    alignItems: "center",
    justifyContent: "center",
  },

  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: 14,
  },

  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF1F0",
    padding: 18,
    borderRadius: 17,
    marginTop: 20,
  },

  logoutText: {
    color: "#F04438",
    fontWeight: "700",
    marginLeft: 9,
  },

  version: {
    textAlign: "center",
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 25,
  },
});
