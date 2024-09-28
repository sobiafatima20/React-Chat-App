import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchatapplication-9b5bd.firebaseapp.com",
  projectId: "reactchatapplication-9b5bd",
  storageBucket: "reactchatapplication-9b5bd.appspot.com",
  messagingSenderId: "859605970783",
  appId: "1:859605970783:web:ea7fd366059a875de950ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore()
export const storage = getStorage()

// Function to mute notifications
export const muteNotifications = async (userId, muteStatus) => {
  try {
    const userRef = doc(db, "users", userId); // Reference to the user's document
    await updateDoc(userRef, { notificationsMuted: muteStatus }); // Update the mute status
    console.log("Notifications status updated successfully");
  } catch (error) {
    console.error("Error updating notification status:", error);
  }
};

// Function to fetch the current mute status
export const getNotificationStatus = async (userId) => {
  try {
    const userRef = doc(db, "users", userId); // Reference to the user's document
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      return data.notificationsMuted; // Return the current mute status (true/false)
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};