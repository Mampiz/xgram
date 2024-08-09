import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import "tailwindcss/tailwind.css";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user") || 'null');

    return user ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;