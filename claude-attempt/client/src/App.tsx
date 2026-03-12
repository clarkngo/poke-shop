import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Auth } from './components/Auth';
import './App.css';

const AppContent: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🥗 PokeFlow</h1>
        <div className="user-info">
          <span>Welcome, {user?.username}!</span>
          <button onClick={logout} className="btn btn-secondary">Logout</button>
        </div>
      </header>

      <main className="app-main">
        <div className="welcome-section">
          <h2>Build Your Perfect Poke Bowl</h2>
          <p>Create your custom poke bowl with fresh ingredients!</p>
          <div className="coming-soon">
            <p>🚧 Poke Bowl Builder Coming Soon! 🚧</p>
            <p>Authentication is working. The bowl builder is being developed.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;