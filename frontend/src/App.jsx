import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import "./styles/App.css";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function ProtectedLayout({ children }) {
  return (
    <div className="app">
      <Navigation />
      {children}
    </div>
  );
}

function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <div className="auth-content">
        <div className="auth-header">
          <div className="auth-logo">📝</div>
          <h1 className="auth-title">NotesApp</h1>
          <p className="auth-subtitle">Your thoughts, organized</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Home />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <RegisterAndLogout />
            </AuthLayout>
          }
        />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
