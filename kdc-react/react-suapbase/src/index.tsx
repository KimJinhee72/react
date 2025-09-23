// index.tsx
import { createRoot } from 'react-dom/client';
import { supabase } from './lib/supabaseClient';
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
async function fetchData() {
  const { data, error } = await supabase.from('my_table').select('*');
  if (error) console.error(error);
  else console.log(data);
}


// 호출 예시
fetchData()
