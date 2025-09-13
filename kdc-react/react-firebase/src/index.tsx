// index.tsx
import { createRoot } from 'react-dom/client';
import { app } from './firebase'; // default export
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

console.log(app.name); // Firebase 앱 이름 확인 가능
