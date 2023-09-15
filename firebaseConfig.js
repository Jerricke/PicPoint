// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADOPa5dhoUXpdlzYzBKo-NCRs3VifILuw",
  authDomain: "picpoint-adb16.firebaseapp.com",
  projectId: "picpoint-adb16",
  storageBucket: "picpoint-adb16.appspot.com",
  messagingSenderId: "842667619716",
  appId: "1:842667619716:web:547b6c7db7ae6affa5d9d1",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
export const FBDB = getFirestore(app);
export const FBSTORAGE = getStorage(app);
export const FBAUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
