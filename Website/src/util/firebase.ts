import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyB0z4WO8zpqu2Tf9tYJlYpc71pjSREBhaA",
  databaseURL: "https://mmrl-80afa-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "mmrl-80afa",
  storageBucket: "mmrl-80afa.appspot.com",
  appId: "1:343713662395:android:e20d7b9250788d64f5b09e",
};

export const firebaseApp = initializeApp(firebaseConfig);