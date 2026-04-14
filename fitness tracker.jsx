import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Award, Flame, Bell, MessageCircle, AlertTriangle, Coffee, Info, Activity, Key } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Dashboard() {
    const { userData } = useAuth();
    const [showQuickMeal, setShowQuickMeal] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chatHistory, setChatHistory] = useState([
        { role: 'ai', text: "Hi! I'm your AI Eating Coach. Struggling with appetite today or need motivation to eat? Add your Gemini key in Profile to chat with me!" }
    ]);

    const [mealInput, setMealInput] = useState('');
    const [mealLogs, setMealLogs] = useState([
        { time: '08:30 AM', food: '2 Parathas with Curd' },
        { time: '11:00 AM', food: 'Banana and Almonds' }
    ]);

    const handleLogMeal = (e) => {
        e.preventDefault();
        if (!mealInput.trim()) return;
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMealLogs([{ time: timeStr, food: mealInput }, ...mealLogs]);
        setMealInput('');
    };

    if (!userData) return <div>Loading...</div>;

    // Chart data
    const chartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'],
        datasets: [
            {
                label: 'Weight (kg)',
                data: [userData.weight - 2, userData.weight - 1.5, userData.weight - 1, userData.weight - 0.5, userData.weight],
                borderColor: '#9b6a97',
                backgroundColor: 'rgba(155, 106, 151, 0.2)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Target',
                data: [userData.targetWeight, userData.targetWeight, userData.targetWeight, userData.targetWeight, userData.targetWeight],
                borderColor: '#d1b3d4',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false,
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
        scales: {
            y: { min: userData.weight - 5, max: Number(userData.targetWeight) + 5 }
        }
    };

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;

        const newHistory = [...chatHistory, { role: 'user', text: chatMessage }];
        setChatHistory(newHistory);
        setChatMessage('');
        setIsTyping(true);

        const apiKey = localStorage.getItem('gemini_api_key');

        if (apiKey) {
            try {
                const ai = new GoogleGenAI({ apiKey });

                // Build the system prompt + history context
                const context = `You are a helpful, encouraging AI Eating Coach for an underweight student trying to gain weight healthily. 
Current BMI is ${userData.bmi}. Always be brief (2-3 sentences), warm, and give quick ideas.
User recently said: "${chatMessage}"`;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: context,
                });

                const reply = response.text || "I'm having trouble thinking, but you got this!";
                setChatHistory([...newHistory, { role: 'ai', text: reply }]);
            } catch (err) {
                console.error(err);
                setChatHistory([...newHistory, { role: 'ai', text: "Oops, couldn't connect to my brain. Check your API key in Profile settings!" }]);
            } finally {
                setIsTyping(false);
            }
        } else {
            // Fallback
            setTimeout(() => {
                let reply = "Try a quick smoothie or a small handful of nuts. Don't stress, just small frequent bites! (Set up your Gemini Key in Profile for real AI advice)";
                if (chatMessage.toLowerCase().includes('why')) {
                    reply = "You might not be eating enough calorie-dense foods or skipping meals due to study stress. Let's add an extra study snack today. (Demo mode)";
                }
                setChatHistory([...newHistory, { role: 'ai', text: reply }]);
                setIsTyping(false);
            }, 1000);
        }
    };

    return (
        <div className="main-content animate-fade-in">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 style={{ fontSize: '2rem' }}>Hello, {userData.name}! 👋</h2>
                    <p className="text-light">Current BMI: {userData.bmi} (Goal: 21.5)</p>
                </div>
                <div className="flex gap-4">
                    <div className="glass-card flex items-center gap-2" style={{ padding: '0.5rem 1rem' }}>
                        <Award color="#f59e0b" size={24} />
                        <span className="font-bold">{userData.points} Pts</span>
                    </div>
                    <div className="glass-card flex items-center gap-2" style={{ padding: '0.5rem 1rem' }}>
                        <Flame color="#ef4444" size={24} />
                        <span className="font-bold">{userData.streak} Day Streak</span>
                    </div>
                </div>
            </div>

            {Number(userData.bmi) < 18.5 && (
                <div className="glass-card mb-8 flex gap-4 items-center" style={{ background: '#fff0f0', borderColor: '#ffcdd2' }}>
                    <AlertTriangle color="#d32f2f" size={32} />
                    <div>
                        <h4 style={{ color: '#c62828' }}>Health Alert: Low BMI</h4>
                        <p className="text-sm" style={{ color: '#b71c1c' }}>Your BMI is below the healthy range. Please ensure you're following the meal plan. Consult a doctor if you feel persistently weak.</p>
                    </div>
                </div>
            )}

            {/* Period & Health Tracker - Only for Females */}
            {userData.gender === 'Female' && (
                <div className="glass-card mb-8 flex gap-4 items-center" style={{ background: '#fce4ec', borderColor: '#f8bbd0' }}>
                    <Activity color="#c2185b" size={32} />
                    <div>
                        <h4 style={{ color: '#ad1457' }}>Period & Health Check</h4>
                        <p className="text-sm" style={{ color: '#880e4f' }}>Remember: Underweight conditions can affect menstrual regularity. Ensure adequate iron (spinach, lentils) and healthy fats this week.</p>
                    </div>
                </div>
            )}

            <div className="grid-3 mb-8">
                <div className="glass-card flex flex-col justify-between" style={{ gridColumn: 'span 2' }}>
                    <div className="flex justify-between mb-4">
                        <h3>Weight Progress</h3>
                        <span className="text-sm text-light">Target: {userData.targetWeight}kg</span>
                    </div>
                    <div style={{ height: '300px' }}>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="glass-card" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 className="mb-4 flex items-center gap-2"><Bell size={20} /> Reminders</h3>
                        <ul className="flex flex-col gap-3 flex-grow">
                            <li className="flex items-center gap-3 p-2 rounded" style={{ background: 'var(--accent)', color: 'var(--text-dark)' }}>
                                <Coffee size={18} /> Time for a mid-study snack!
                            </li>
                            <li className="flex items-center gap-3 p-2 rounded text-light" style={{ background: 'rgba(255,255,255,0.5)' }}>
                                Hydration break (Completed)
                            </li>
                        </ul>

                        <button
                            className="btn btn-primary w-full mt-4"
                            onClick={() => setShowQuickMeal(!showQuickMeal)}
                            style={{ animation: 'pulse 2s infinite' }}
                        >
                            What Should I Eat Now?
                        </button>
                        {showQuickMeal && (
                            <div className="mt-3 p-3 text-sm rounded bg-white text-dark shadow-sm">
                                <strong>Quick Idea:</strong> Banana with 2 spoons of peanut butter & a glass of milk. (Est. 350 kcal, 5 mins prep)
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid-2">
                <div className="glass-card">
                    <h3 className="mb-4 flex items-center gap-2"><MessageCircle size={20} /> AI Eating Coach & Problem Analyzer</h3>
                    <div className="flex flex-col h-64 border rounded p-3 mb-3 bg-white bg-opacity-50 overflow-y-auto" style={{ borderColor: 'var(--primary-light)' }}>
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`mb-2 p-2 rounded max-w-[80%] ${msg.role === 'ai' ? 'self-start bg-purple-100 text-purple-900' : 'self-end bg-blue-100 text-blue-900 ml-auto'}`}
                                style={{
                                    background: msg.role === 'ai' ? 'var(--primary-light)' : 'var(--accent)',
                                    color: 'var(--text-dark)'
                                }}
                            >
                                <div className="text-xs font-bold mb-1">{msg.role === 'ai' ? 'Coach' : 'You'}</div>
                                <div className="text-sm">{msg.text}</div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="self-start mb-2 p-2 rounded max-w-[80%] opacity-70" style={{ background: 'var(--primary-light)', color: 'var(--text-dark)' }}>
                                <div className="text-sm">Thinking...</div>
                            </div>
                        )}
                    </div>
                    <form className="flex gap-2" onSubmit={handleChatSubmit}>
                        <input
                            type="text"
                            className="form-input"
                            style={{ flexGrow: 1 }}
                            placeholder="E.g., I'm not hungry, what to do?"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1rem' }}>Ask</button>
                    </form>
                </div>

                <div className="glass-card flex flex-col gap-4">
                    <h3 className="flex items-center gap-2"><Info size={20} /> Balance & Tips</h3>

                    <div className="p-4 rounded border border-primary-light bg-white bg-opacity-70">
                        <h4 className="mb-2">Study + Health Balance</h4>
                        <p className="text-sm text-light mb-2">Avoid long study gaps without food to prevent muscle loss.</p>
                        <div className="flex justify-between items-center text-xs text-primary font-bold">
                            <span>90 mins Study</span>
                            <span>→</span>
                            <span>10 mins Break + Snack</span>
                        </div>
                    </div>

                    <div className="p-4 rounded border border-primary-light bg-white bg-opacity-70 mt-auto">
                        <h4 className="mb-2">Mood & Sleep</h4>
                        <p className="text-sm text-light mb-3">Track how you feel today and hours slept. Poor sleep hinders weight gain!</p>
                        <div className="flex gap-2">
                            <button className="btn-outline text-sm py-1 px-2">Good</button>
                            <button className="btn-outline text-sm py-1 px-2">Stressed</button>
                            <button className="btn-outline text-sm py-1 px-2">Didn't Sleep Well</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Row: Meal Log */}
            <div className="glass-card mt-8">
                <h3 className="mb-4 flex items-center gap-2">🍽️ What I Ate Today</h3>
                <p className="text-sm text-light mb-4">Keep a running list of your meals and snacks to make sure you hit your calorie surplus!</p>

                <form onSubmit={handleLogMeal} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        className="form-input"
                        style={{ flexGrow: 1 }}
                        placeholder="E.g., Peanut Butter Sandwich and Milk..."
                        value={mealInput}
                        onChange={(e) => setMealInput(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Log Meal</button>
                </form>

                {mealLogs.length > 0 ? (
                    <ul className="flex flex-col gap-3">
                        {mealLogs.map((log, idx) => (
                            <li key={idx} className="flex items-center gap-4 p-3 rounded bg-white bg-opacity-60 border border-primary-light">
                                <span className="font-bold text-sm text-primary" style={{ minWidth: '80px' }}>{log.time}</span>
                                <span className="text-dark">{log.food}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center p-4 text-light text-sm italic">No meals logged yet today! Time to eat something!</div>
                )}
            </div>

        </div>
    );
}
