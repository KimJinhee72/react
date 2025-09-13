// main.tsx
import { createRoot } from 'react-dom/client';
import App from './App';
import firebase from './firebase'; // default export

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}

console.log(firebase.name); // Firebase 앱 이름 확인 가능
