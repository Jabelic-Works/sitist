import firebase from "firebase"
import "firebase/storage"
// ** Firebaseプロジェクトの設定を記す
export const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTHDOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGEING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
export const storage = firebase.storage()
export const auth = firebase.auth()
export default firebase
