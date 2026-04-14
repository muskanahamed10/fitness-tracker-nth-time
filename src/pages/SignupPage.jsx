import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Activity } from 'lucide-react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', age: '', gender: 'Male', height: '', weight: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    try {
      setError('');
      setLoading(true);
      await signup(
        formData.email, 
        formData.password, 
        formData.name, 
        Number(formData.age), 
        formData.gender, 
        Number(formData.height), 
        Number(formData.weight)
      );
      // Removed navigate('/dashboard') to let useEffect handle it
    } catch (err) {
      setError(err.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center justify-center gap-2 mb-2" style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.5rem' }}>
            <Activity size={32} />
            <span>GainTrack</span>
          </Link>
          <h2 style={{ fontSize: '1.5rem' }}>Start Your Journey</h2>
        </div>

        {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" required className="form-input" value={formData.name} onChange={handleChange} />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" name="email" required className="form-input" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" name="password" required className="form-input" value={formData.password} onChange={handleChange} />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Age</label>
              <input type="number" name="age" required min="10" max="100" className="form-input" value={formData.age} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select name="gender" className="form-input" value={formData.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Height (cm)</label>
              <input type="number" name="height" required min="100" max="250" className="form-input" value={formData.height} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Weight (kg)</label>
              <input type="number" name="weight" required min="30" max="200" className="form-input" value={formData.weight} onChange={handleChange} />
            </div>
          </div>

          <button disabled={loading} type="submit" className="btn btn-primary w-full mt-4" style={{ width: '100%' }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center text-sm text-light mt-4">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
}
