import React, { useState } from 'react';
import { ShoppingCart, CheckCircle, Apple, Coffee } from 'lucide-react';

export default function MealPlanner() {
  const [dietPref, setDietPref] = useState('veg');

  const mealPlans = {
    veg: {
      breakfast: "2 Parathas with Curd + 1 Banana + Glass of Milk",
      snack1: "Handful of Roasted Makhana (Fox nuts) & Almonds",
      lunch: "1 Bowl Dal, 1 Bowl Sabzi (Potato/Paneer), 3 Roti, Rice, and Salad",
      snack2: "Peanut Butter Sandwich or Besan Chilla",
      dinner: "Khichdi with Ghee or Pulao with Raita, 1 glass warm milk before bed."
    },
    nonveg: {
      breakfast: "2 Boiled Eggs + 2 Slices of Whole Wheat Bread + Glass of Milk",
      snack1: "Banana and handful of mixed nuts",
      lunch: "Chicken Curry (2 pieces), 2 Roti, 1 portion Rice, Salad",
      snack2: "Peanut Butter Sandwich",
      dinner: "Fish or Egg Curry with Rice/Roti, 1 glass warm milk before bed."
    }
  };

  const activePlan = mealPlans[dietPref];

  const groceryList = [
    { item: 'Bananas (1 Dozen)', est: '₹60' },
    { item: 'Milk (1L x 7)', est: '₹450' },
    { item: 'Peanut Butter (500g)', est: '₹200' },
    { item: 'Mixed Nuts/Almonds (250g)', est: '₹300' },
    { item: 'Oats / Poha (1kg)', est: '₹150' },
    { item: 'Eggs / Paneer', est: '₹200' }
  ];

  return (
    <div className="main-content animate-fade-in">
      <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
        <div>
          <h2 style={{ fontSize: '2rem' }}>Smart Meal Planner</h2>
          <p className="text-light text-lg">Budget-friendly, cal-dense Indian Student Diet</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-full shadow-sm border border-primary-light">
          <button 
            className={`py-2 px-4 rounded-full font-bold text-sm transition-all ${dietPref === 'veg' ? 'bg-primary text-white' : 'text-light'}`}
            onClick={() => setDietPref('veg')}
          >
            Vegetarian
          </button>
          <button 
            className={`py-2 px-4 rounded-full font-bold text-sm transition-all ${dietPref === 'nonveg' ? 'bg-primary text-white' : 'text-light'}`}
            onClick={() => setDietPref('nonveg')}
          >
            Non-Vegetarian
          </button>
        </div>
      </div>

      <div className="grid-3 mb-8">
        <div className="glass-card" style={{ gridColumn: 'span 2' }}>
          <h3 className="mb-6 flex items-center gap-2"><Apple /> Today's Plan</h3>
          
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded border-l-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderLeftColor: '#f59e0b' }}>
              <h4 className="flex items-center gap-2 text-sm text-light mb-1"><Coffee size={16}/> Breakfast (8:00 AM)</h4>
              <p className="font-medium text-dark">{activePlan.breakfast}</p>
            </div>
            
            <div className="p-4 rounded border-l-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderLeftColor: '#10b981' }}>
              <h4 className="flex items-center gap-2 text-sm text-light mb-1"><Coffee size={16}/> Mid-Morning / Study Snack (11:00 AM)</h4>
              <p className="font-medium text-dark">{activePlan.snack1}</p>
            </div>

            <div className="p-4 rounded border-l-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderLeftColor: '#3b82f6' }}>
              <h4 className="flex items-center gap-2 text-sm text-light mb-1"><Coffee size={16}/> Lunch (1:30 PM)</h4>
              <p className="font-medium text-dark">{activePlan.lunch}</p>
            </div>

            <div className="p-4 rounded border-l-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderLeftColor: '#8b5cf6' }}>
              <h4 className="flex items-center gap-2 text-sm text-light mb-1"><Coffee size={16}/> Evening Snack (5:00 PM)</h4>
              <p className="font-medium text-dark">{activePlan.snack2}</p>
            </div>

            <div className="p-4 rounded border-l-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderLeftColor: '#6366f1' }}>
              <h4 className="flex items-center gap-2 text-sm text-light mb-1"><Coffee size={16}/> Dinner (8:30 PM)</h4>
              <p className="font-medium text-dark">{activePlan.dinner}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card">
            <h3 className="mb-4 flex items-center gap-2"><ShoppingCart /> Grocery Planner</h3>
            <p className="text-sm text-light mb-4">Weekly student budget estimation</p>
            
            <ul className="flex flex-col gap-3">
              {groceryList.map((g, idx) => (
                <li key={idx} className="flex justify-between items-center text-sm border-b pb-2" style={{ borderColor: 'var(--primary-light)' }}>
                  <span className="flex items-center gap-2"><CheckCircle size={16} color="var(--primary)" /> {g.item}</span>
                  <span className="font-bold text-light">{g.est}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t flex justify-between font-bold" style={{ borderColor: 'var(--primary-light)', color: 'var(--text-dark)' }}>
              <span>Total Est.</span>
              <span>₹1360 / week</span>
            </div>
          </div>

          <div className="glass-card bg-primary text-white" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white' }}>
            <h3 className="mb-2 text-white">Mini Workout Guide</h3>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>Simple home exercises help build muscle instead of just fat!</p>
            <ul className="text-sm list-disc pl-4 space-y-1">
              <li>15 Pushups</li>
              <li>20 Squats</li>
              <li>30 sec Plank</li>
              <li>Light stretching</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
