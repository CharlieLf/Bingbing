import '@/output.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouteObject, RouterProvider } from 'react-router-dom';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Profile from '@pages/Profile';
import Register from '@pages/Register';
import ProtectedRoute from './routes/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route key="login" path="/login" element={<Login />} />,
    <Route key="register" path="/register" element={<Register />} />,
    <Route key="home" path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />,
    <Route key="profile" path="/profile/:principal" element={<ProtectedRoute><Profile /></ProtectedRoute>} />,
  ]),
);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}