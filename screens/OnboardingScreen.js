import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { COLORS } from "../components/theme";

const slides = [
  {
    title: "Discover New Places",
    description:
      "Explore beautiful destinations and discover amazing places around the world.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900",
  },
  {
    title: "Plan Your Adventures",
    description:
      "Create your dream trips and organize your travel plans easily.",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900",
  },
  {
    title: "Travel With Confidence",
    description:
      "Save your favorite destinations and start your next adventure.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900",
  },
];

export default function OnboardingScreen() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const { width } = useWindowDimensions();

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      router.replace("/login");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: slides[current].image }}
        style={[styles.image, { width }]}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {slides[current].title}
        </Text>

        <Text style={styles.description}>
          {slides[current].description}
        </Text>

        <View style={styles.dots}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                current === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={nextSlide}
        >
          <Text style={styles.buttonText}>
            {current === slides.length - 1
              ? "Get Started"
              : "Continue"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  image: {
    height: "52%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 25,
    alignItems: "center",
  },
  title: {
    fontSize: 29,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    marginTop: 15,
  },
  dots: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 25,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#D0D5DD",
    marginHorizontal: 5,
  },
  activeDot: {
    width: 26,
    backgroundColor: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: "100%",
    paddingVertical: 17,
    borderRadius: 18,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },
  skip: {
    marginTop: 18,
    color: COLORS.textSecondary,
    fontSize: 15,
  },
});