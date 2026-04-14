import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { TrendingUp, Target } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function ProgressAnalytics() {
  const { userData } = useAuth();

  if (!userData) return null;

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calorie Intake (kcal)',
        data: [2100, 2300, 1900, 2500, 2400, 2600, 2200],
        backgroundColor: 'rgba(155, 106, 151, 0.7)',
        borderRadius: 4,
      }
    ]
  };

  const pieData = {
    labels: ['Carbs', 'Protein', 'Fats'],
    datasets: [
      {
        data: [50, 25, 25],
        backgroundColor: [
          '#9b6a97',
          '#ffb7b2',
          '#d1b3d4'
        ],
        borderWidth: 0,
      }
    ]
  };

  return (
    <div className="main-content animate-fade-in">
      <div className="mb-8">
        <h2 style={{ fontSize: '2rem' }}>Progress & Analytics</h2>
        <p className="text-light">Deep dive into your habits and consistency.</p>
      </div>

      <div className="grid-2 mb-8">
        <div className="glass-card">
          <h3 className="mb-4 flex items-center gap-2"><TrendingUp size={20}/> Calorie Intake History</h3>
          <div style={{ height: '300px' }}>
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="glass-card flex flex-col">
          <h3 className="mb-4 flex items-center gap-2"><Target size={20}/> Macros Distribution (Avg)</h3>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <div style={{ width: '250px' }}>
              <Pie data={pieData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3 className="mb-4 text-center">Subject/Meal Consistency Report</h3>
        <p className="text-sm text-light text-center mb-6">AI analysis of your study habits + meal timings.</p>
        
        <div className="grid-3 text-center">
          <div className="p-4 bg-white bg-opacity-50 rounded border border-primary-light">
            <div className="display-4 font-bold text-primary mb-2">85%</div>
            <div className="text-sm font-semibold">Breakfast Adherence</div>
            <p className="text-xs text-light mt-2">You rarely skip mornings!</p>
          </div>
          <div className="p-4 bg-white bg-opacity-50 rounded border border-primary-light">
            <div className="display-4 font-bold text-secondary mb-2">40%</div>
            <div className="text-sm font-semibold">Study Snack Consistency</div>
            <p className="text-xs text-light mt-2">You tend to forget snacks during long study sessions.</p>
          </div>
          <div className="p-4 bg-white bg-opacity-50 rounded border border-primary-light">
            <div className="display-4 font-bold text-green-500 mb-2" style={{ color: '#10b981' }}>7/7</div>
            <div className="text-sm font-semibold">Sleep Quality</div>
            <p className="text-xs text-light mt-2">Great 7+ hours sleep avg. Perfect for recovery.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
