import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './containers';
import { Home, Login, Register } from './pages';
import { AuthProvider } from './firebase/AuthContext'; // Import AuthProvider
import styles from './App.module.css';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

const App = () => (
  <AuthProvider> {/* Wrap the whole app with AuthProvider */}
    <Router>
      <div className={styles.app}>
        <div className={styles.gradientBg}>
          <Header />
        </div>
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  </AuthProvider>
);

export default App;
