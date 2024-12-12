import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Header } from '../ui/Header';

const ADMIN_EMAILS = ['huon_t@hotmail.com', 'edward.tome.writer@gmail.com'];

export const AdminLayout: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser || !ADMIN_EMAILS.includes(currentUser.email || '')) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};