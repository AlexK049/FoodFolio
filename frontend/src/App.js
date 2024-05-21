import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home, Notes, Settings, Login, Signup, AppSkeleton, Offline } from "./pages";
import { useState, useEffect } from 'react';
import api from './static/js/APIClient'

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const ProtectedRoute = ({ children }) => {
        if (isLoggedIn === null) {
            // Still loading, you can show a loading spinner or another component
            return <div>Loading...</div>;
        }
        return isLoggedIn ? children : <Navigate to="/login" />;
    };

    useEffect(() => {
        const checkStatus = async () => {
            try {
                setIsLoggedIn(await api.isAuth());
            } catch (error) {
                setIsLoggedIn(false);
            }
        }
        checkStatus();
    }, []);

    // nested router documentation:
    // https://ui.dev/react-router-nested-routes
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><AppSkeleton /></ProtectedRoute>}>
                        <Route path="/" element={<Home />} />
                        <Route path="/notes" element={<Notes />} />
                        <Route path="/offline" element={<Offline />} />
                    </Route>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<h1>not found</h1>} />
                </Routes>
            </Router>
        </div>
    );
}
