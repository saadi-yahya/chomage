import React, { useState } from 'react';
import { PlannerItem } from '../types';
import { Plus, X } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const Planner: React.FC = () => {
  // Simple state-based planner without heavy DnD libraries to ensure compatibility
  const [items, setItems] = useState<PlannerItem[]>([
    { id: '1', day: 'Mon', title: 'TechFlow Interview', time: '14:00', type: 'Interview' },
    { id: '2', day: 'Tue', title: 'CV Review', time: '10:00', type: 'Task' },
    { id: '3', day: 'Wed', title: 'Apply to Google', time: '09:00', type: 'Deadline' },
  ]);

  const [newItemText, setNewItemText] = useState('');
  const [selectedDay, setSelectedDay] = useState('Mon');

  const addItem = () => {
    if (!newItemText.trim()) return;
    const newItem: PlannerItem = {
      id: Math.random().toString(36).substr(2, 9),
      day: selectedDay,
      title: newItemText,
      time: '09:00', // Default time
      type: 'Task'
    };
    setItems([...items, newItem]);
    setNewItemText('');
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Interview': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Deadline': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="h-full flex flex-col pb-20 md:pb-0">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Weekly Planner</h1>
          <p className="text-slate-500">Organize your job search week</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
          />
          <select 
            value={selectedDay} 
            onChange={(e) => setSelectedDay(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <button 
            onClick={addItem}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-full overflow-y-auto">
        {DAYS.map(day => (
          <div key={day} className="flex flex-col h-full min-h-[300px] bg-slate-50 rounded-xl border border-slate-200 p-3">
            <h3 className="font-bold text-slate-700 mb-3 text-center sticky top-0 bg-slate-50 py-1 z-10">{day}</h3>
            <div className="space-y-3 flex-1">
              {items.filter(i => i.day === day).map(item => (
                <div key={item.id} className={`p-3 rounded-lg border shadow-sm relative group ${getTypeColor(item.type)}`}>
                  <div className="text-xs font-semibold opacity-75 mb-1">{item.type} • {item.time}</div>
                  <div className="font-medium text-sm leading-snug">{item.title}</div>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/10 rounded"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {items.filter(i => i.day === day).length === 0 && (
                <div className="text-center py-8 text-slate-300 text-sm border-2 border-dashed border-slate-200 rounded-lg">
                  Free Day
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};