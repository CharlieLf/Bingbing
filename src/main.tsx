import '@/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AgentProvider } from '@ic-reactor/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AgentProvider withProcessEnv>
      <App />
    </AgentProvider>
  </React.StrictMode>,
);
