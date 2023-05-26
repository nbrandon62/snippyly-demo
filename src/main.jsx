import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { SnippylyProvider } from '@snippyly/react';
const apiKey = import.meta.env.VITE_SNIPPYLY_API_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnippylyProvider apiKey={apiKey} >
      <App />
    </SnippylyProvider>
  </React.StrictMode>
);
