import React, { useState } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';

export const CVBuilder: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', role: '' });
  const [experience, setExperience] = useState([{ id: 1, company: '', role: '', period: '' }]);

  const addExp = () => setExperience([...experience, { id: Date.now(), company: '', role: '', period: '' }]);
  const removeExp = (id: number) => setExperience(experience.filter(e => e.id !== id));

  return (
    <div className="max-w-3xl mx-auto pb-20 md:pb-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">CV Builder</h1>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
          <Download size={16} /> Export PDF
        </button>
      </div>

      <div className="space-y-6">
        {/* Personal Info */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Personal Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={personalInfo.name} onChange={e => setPersonalInfo({...personalInfo, name: e.target.value})} placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={personalInfo.role} onChange={e => setPersonalInfo({...personalInfo, role: e.target.value})} placeholder="Frontend Engineer" />
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
            <h2 className="text-lg font-bold text-slate-800">Experience</h2>
            <button onClick={addExp} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors">
              <Plus size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={exp.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative group">
                <button onClick={() => removeExp(exp.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
                <div className="grid md:grid-cols-2 gap-4 pr-8">
                  <input type="text" placeholder="Company Name" className="bg-white px-3 py-2 rounded border border-slate-200" />
                  <input type="text" placeholder="Role Title" className="bg-white px-3 py-2 rounded border border-slate-200" />
                  <input type="text" placeholder="Years (e.g. 2020-2022)" className="bg-white px-3 py-2 rounded border border-slate-200 md:col-span-2" />
                  <textarea placeholder="Key Responsibilities..." className="bg-white px-3 py-2 rounded border border-slate-200 md:col-span-2 h-20 resize-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};