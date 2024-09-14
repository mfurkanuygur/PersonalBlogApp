import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blogimagestore-63035.firebaseapp.com",
  projectId: "blogimagestore-63035",
  storageBucket: "blogimagestore-63035.appspot.com",
  messagingSenderId: "469410753185",
  appId: "1:469410753185:web:cd13da02bff9a822755ee0"
};

export const app = initializeApp(firebaseConfig);