import '@/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AgentProvider } from '@ic-reactor/react';
// import { AuthProvider } from '@hooks/useAuth';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
      <AgentProvider withProcessEnv>
        <App />
      </AgentProvider>
    {/* </AuthProvider> */}
  </React.StrictMode>,
);
