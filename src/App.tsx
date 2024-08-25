import '@/output.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Profile from '@pages/Profile';
import Register from '@pages/Register';
import AddProduct from '@pages/AddProduct';
import ProductDetail from '@pages/ProductDetail';
import ProtectedRoute from './routes/ProtectedRoute';
import UnauthorizedRoute from './routes/UnauthorizedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { AgentProvider } from '@ic-reactor/react';
import { createAgentManager } from '@ic-reactor/react/dist/core';
import { ServiceContextProvider } from './contexts/ServiceContext';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route key="login" path="/login" element={<UnauthorizedRoute><Login /></UnauthorizedRoute>} />,
    <Route key="register" path="/register" element={<UnauthorizedRoute><Register /></UnauthorizedRoute>} />,

    <Route key="home" path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />,
    <Route key="profile" path="/profile/:principal" element={<ProtectedRoute><Profile /></ProtectedRoute>} />,
    <Route key="addProduct" path="/addProduct" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />,
    <Route key="productDetail" path="/productDetail/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />,
  ]),
);

// const test = createBrowserRouter([
//   { path: '/test', element: <Test /> }
// ])

export default function App() {
  const agentManager = createAgentManager({
    host: "http://localhost:4943"
  });

  return (
    <AgentProvider withProcessEnv agentManager={agentManager}>
      <ServiceContextProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ServiceContextProvider>
    </AgentProvider>
  );
}