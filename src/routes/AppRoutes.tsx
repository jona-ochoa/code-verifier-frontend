import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import KatasPage from '../pages/KatasPage';
import KatasDetailPage from '../pages/KatasDetailPage';

export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/katas" element={<KatasPage />} />
            <Route path="/katas/:id" element={<KatasDetailPage />} />

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    )
}
