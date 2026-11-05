import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "@travelgo_favorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            setFavorites(parsed);
          }
        }
      } catch (error) {
        console.log("Favorites loading error:", error);
      } finally {
        setLoaded(true);
      }
    }

    loadFavorites();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    async function saveFavorites() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(favorites)
        );
      } catch (error) {
        console.log("Favorites saving error:", error);
      }
    }

    saveFavorites();
  }, [favorites, loaded]);

  const isFavorite = (id) => {
    return favorites.includes(String(id));
  };

  const toggleFavorite = (id) => {
    const destinationId = String(id);

    setFavorites((previous) => {
      if (previous.includes(destinationId)) {
        return previous.filter(
          (item) => item !== destinationId
        );
      }

      return [...previous, destinationId];
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        loaded,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}