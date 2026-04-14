import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Activity, Heart, Brain, Calendar, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="flex items-center gap-2" style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.5rem' }}>
          <Activity size={32} />
          <span>GainTrack</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="btn btn-ghost">Log In</Link>
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
        </div>
      </header>

      <main className="main-content flex flex-col items-center justify-center animate-fade-in" style={{ flexGrow: 1, textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
            Healthy Weight Gain for <span className="text-secondary animate-pulse" style={{ display: 'inline-block' }}>Students</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '3rem', lineHeight: '1.8' }}>
            A personalized, AI-powered companion designed to help you build healthy habits, gain weight consistently, and balance your student lifestyle.
          </p>

          <div className="flex gap-4 justify-center mb-8">
            <Link to="/signup" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Start Journey <ArrowRight size={20} />
            </Link>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Demo Account:</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)' }}>demo@student.com / 123456</span>
            </div>
          </div>

          <div className="grid-3 mt-8 pt-8">
            <div className="glass-card flex flex-col items-center text-center">
              <div style={{ padding: '1rem', background: 'var(--accent)', borderRadius: '50%', marginBottom: '1rem', color: 'var(--primary)' }}>
                <Brain size={32} />
              </div>
              <h3 className="mb-2">AI Eating Coach</h3>
              <p className="text-light text-sm">Personalized suggestions to combat low appetite and skipping meals.</p>
            </div>
            
            <div className="glass-card flex flex-col items-center text-center">
              <div style={{ padding: '1rem', background: 'var(--accent)', borderRadius: '50%', marginBottom: '1rem', color: 'var(--primary)' }}>
                <Calendar size={32} />
              </div>
              <h3 className="mb-2">Smart Meal Planner</h3>
              <p className="text-light text-sm">Budget-friendly plans that fit perfectly into your study routine.</p>
            </div>

            <div className="glass-card flex flex-col items-center text-center">
              <div style={{ padding: '1rem', background: 'var(--accent)', borderRadius: '50%', marginBottom: '1rem', color: 'var(--primary)' }}>
                <Heart size={32} />
              </div>
              <h3 className="mb-2">Goal Tracking</h3>
              <p className="text-light text-sm">Monitor your weight, calories, sleep, and mood systematically.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
