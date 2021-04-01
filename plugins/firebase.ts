import firebase from 'firebase';

// ** Firebaseプロジェクトの設定を記す
if (!firebase.apps.length) {
  firebase.initializeApp({
    env_api_key: process.env.FB_API_KEY,
    env_auth_domain: process.env.FB_AUTHDOMAIN,
    env_project_id: process.env.FB_PROJECT_ID,
    env_storage_bucket: process.env.FB_STORAGE_BUCKET,
    env_messaging_sender_id: process.env.FB_MESSAGEING_SENDER_ID,
    env_app_id: process.env.FB_APP_ID,
    env_measurement_id: process.env.FB_MEASUREMENT_ID
  })
}

export const firestore = firebase.firestore();
export const storage = firebase.storage();