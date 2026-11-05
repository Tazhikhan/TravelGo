import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const ProfileContext = createContext(null);
const STORAGE_KEY = "@travelgo_profile";

const defaultProfile = {
  name: "TravelGo User",
  email: "traveler@travelgo.com",
  phone: "",
  city: "Almaty",
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setProfile({ ...defaultProfile, ...JSON.parse(saved) });
        }
      } catch (error) {
        console.log("Profile load error:", error);
      } finally {
        setLoaded(true);
      }
    }
    loadProfile();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(profile)
    ).catch(console.log);
  }, [profile, loaded]);

  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  return (
    <ProfileContext.Provider
      value={{ profile, updateProfile, loaded }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be inside ProfileProvider");
  }
  return context;
}