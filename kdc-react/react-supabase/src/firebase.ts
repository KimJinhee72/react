
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// https://firebase.google.com/docs/web/setup#available-libraries
// TODO: Add SDKs for Firebase products that you want to use(개발자가 직접 필요한 SDK를 가져와서 쓰라는 안내)
// 1️⃣ Authentication 사용하고 싶으면: getAuth는 Firebase Authentication 모듈에서 로그인/회원가입, 사용자 정보 관리를 하기 위해 쓰는 함수
import { getAuth } from 'firebase/auth';
// 2️⃣ Firestore 사용하고 싶으면: Cloud Firestore 데이터베이스 만들기 getFirestore는 Cloud Firestore을 가져오기 위한 함수
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const authService = getAuth(app);//인증  인스턴스를 초기화
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);//저장 Cloud Firestore의 인스턴스를 초기화

// export const storage = getStorage(app);


