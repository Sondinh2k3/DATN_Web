import './App.scss';

import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from './services/auth';
import Header from './component/Header/Header';
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Dashboard from './component/Dashboard/Dashboard';
import Profile from './component/Profile/Profile';
import History from './component/History/History';

const ProtectedRoute = ({ children }) => {
    const isAuth = isAuthenticated();
    const location = useLocation();

    if (!isAuth) {
        // Lưu vị trí hiện tại để chuyển hướng lại sau khi đăng nhập
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

const App = () => {
    const isAuth = isAuthenticated();

    return (
        <div className="app">
            {isAuth && <Header />}
            <main className="main-content">
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected routes */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />
                    <Route path="/history" element={
                        <ProtectedRoute>
                            <History />
                        </ProtectedRoute>
                    } />

                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
