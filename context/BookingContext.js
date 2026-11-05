
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const BookingContext = createContext(null);

const STORAGE_KEY = "@travelgo_bookings";

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadBookings() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            setBookings(parsed);
          }
        }
      } catch (error) {
        console.log("Booking load error:", error);
      } finally {
        setLoaded(true);
      }
    }

    loadBookings();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    async function saveBookings() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(bookings)
        );
      } catch (error) {
        console.log("Booking save error:", error);
      }
    }

    saveBookings();
  }, [bookings, loaded]);

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      status: "Confirmed (Demo)",
      createdAt: new Date().toISOString(),
    };

    setBookings((previous) => [
      newBooking,
      ...previous,
    ]);

    return newBooking;
  };

  const cancelBooking = (id) => {
    setBookings((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, status: "Cancelled" }
          : item
      )
    );
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loaded,
        addBooking,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useBookings must be used inside BookingProvider"
    );
  }

  return context;
}
