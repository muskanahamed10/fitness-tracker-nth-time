import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, Shield, BellRing, Target, Key } from 'lucide-react';

export default function Profile() {
  const { userData } = useAuth();
  const [success, setSuccess] = useState('');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');

  if (!userData) return null;

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('gemini_api_key', apiKey);
    setSuccess('Profile & Settings updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="main-content animate-fade-in" style={{ maxWidth: '800px' }}>
      <div className="mb-8">
        <h2 style={{ fontSize: '2rem' }}>Your Profile</h2>
        <p className="text-light">Manage your settings and personal information.</p>
      </div>

      {success && (
        <div className="mb-6 p-4 rounded bg-green-100 text-green-800" style={{ backgroundColor: '#d1fae5', color: '#065f46' }}>
          {success}
        </div>
      )}

      <div className="grid-3 mb-8 gap-6">
        <div className="glass-card flex flex-col items-center text-center" style={{ gridColumn: 'span 1' }}>
          <div className="bg-primary flex items-center justify-center rounded-full mb-4" style={{ width: '100px', height: '100px', backgroundColor: 'var(--primary-light)', color: 'white' }}>
            <User size={48} />
          </div>
          <h3 className="mb-1">{userData.name}</h3>
          <p className="text-light text-sm mb-4">{userData.email}</p>
          <div className="w-full text-left text-sm space-y-2 mt-4 pt-4 border-t border-primary-light">
            <div className="flex justify-between"><span className="text-light">Age</span> <strong>{userData.age}</strong></div>
            <div className="flex justify-between"><span className="text-light">Gender</span> <strong>{userData.gender}</strong></div>
            <div className="flex justify-between"><span className="text-light">Height</span> <strong>{userData.height} cm</strong></div>
            <div className="flex justify-between"><span className="text-light">Weight</span> <strong>{userData.weight} kg</strong></div>
            <div className="flex justify-between"><span className="text-light">BMI</span> <strong>{userData.bmi}</strong></div>
          </div>
        </div>

        <div className="glass-card" style={{ gridColumn: 'span 2' }}>
          <h3 className="mb-4 flex items-center gap-2"><Settings size={20} /> Settings</h3>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label text-sm">Update Target Weight (kg)</label>
              <input type="number" className="form-input" defaultValue={userData.targetWeight} />
            </div>

            <div className="form-group mt-4">
              <label className="form-label text-sm flex items-center gap-2"><Key size={16}/> Gemini API Key (For AI Coach)</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="AIzaSy..." 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)} 
              />
              <p className="text-xs text-light mt-1">Stored securely in your browser's local storage.</p>
            </div>

            <h4 className="mt-6 mb-3 text-sm font-bold flex items-center gap-2"><BellRing size={16}/> Notifications</h4>
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked /> 
                <span>Meal Reminders (Push Notifications)</span>
              </label>
              <label className="flex items-center gap-3 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked /> 
                <span>Hydration Warnings</span>
              </label>
              {userData.gender === 'Female' && (
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                  <input type="checkbox" defaultChecked /> 
                  <span>Period & Health Insights</span>
                </label>
              )}
            </div>

            <h4 className="mt-6 mb-3 text-sm font-bold flex items-center gap-2"><Shield size={16}/> Privacy</h4>
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked /> 
                <span>Allow Analytics for AI Coaching</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}
