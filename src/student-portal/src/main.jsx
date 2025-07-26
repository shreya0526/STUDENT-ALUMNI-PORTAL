import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; 
import sapStore from './store/sapStore.js';
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={sapStore}>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
