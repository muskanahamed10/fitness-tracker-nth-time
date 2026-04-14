import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Activity, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      // Removed navigate('/dashboard') to let useEffect handle it after context updates
    } catch (err) {
      setError('Failed to sign in: Invalid credentials.');
    } finally {
      setLoading(false);
    }
  }

  function fillDemo() {
    setEmail('demo@student.com');
    setPassword('123456');
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center gap-2 mb-4" style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.5rem' }}>
            <Activity size={32} />
            <span>GainTrack</span>
          </Link>
          <h2 style={{ fontSize: '1.75rem' }}>Welcome Back!</h2>
          <p className="text-light text-sm mt-2">Log in to continue your journey.</p>
        </div>

        {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group relative">
            <label className="form-label">Email</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="email" 
                required 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
          </div>

          <div className="form-group relative">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                required 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
          </div>

          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" /> Remember me
            </label>
            <button type="button" className="text-primary font-medium hover:underline" onClick={() => alert('Forgot password linked to valid email flow...')}>Forgot Password?</button>
          </div>

          <button disabled={loading} type="submit" className="btn btn-primary w-full" style={{ width: '100%' }}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button type="button" onClick={fillDemo} className="btn-outline w-full text-sm" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}>
            Use Demo Credentials
          </button>
        </div>

        <div className="text-center text-sm text-light mt-4">
          Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
