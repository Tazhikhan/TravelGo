
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

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
          const parsed = JSON.parse(saved);

          setProfile({
            ...defaultProfile,
            ...parsed,
          });
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

    async function saveProfile() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(profile)
        );
      } catch (error) {
        console.log("Profile save error:", error);
      }
    }

    saveProfile();
  }, [profile, loaded]);

  const updateProfile = (updates) => {
    setProfile((previous) => ({
      ...previous,
      ...updates,
    }));
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        loaded,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      "useProfile must be used inside ProfileProvider"
    );
  }

  return context;
}
