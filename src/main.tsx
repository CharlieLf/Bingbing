import '@/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import { idlFactory, canisterId } from './declarations/product';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <AgentProvider withProcessEnv> */}
      {/* <ActorProvider idlFactory={idlFactory} canisterId={canisterId}> */}
        <App />
      {/* </ActorProvider> */}
    {/* </AgentProvider> */}
  </React.StrictMode>,
);
