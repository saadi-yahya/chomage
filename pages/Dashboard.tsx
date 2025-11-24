import React, { useEffect, useState } from 'react';
import { getTrendingJobs } from '../services/jobService';
import { Job, PlannerItem } from '../types';
import { JobCard } from '../components/JobCard';
import { TrendingUp, Calendar, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [trending, setTrending] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock upcoming events
  const upcomingEvents: PlannerItem[] = [
    { id: '1', day: 'Today', title: 'TechFlow Interview', time: '14:00', type: 'Interview' },
    { id: '2', day: 'Tomorrow', title: 'Update Portfolio', time: '10:00', type: 'Task' },
  ];

  useEffect(() => {
    getTrendingJobs().then(jobs => {
      setTrending(jobs);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hello, Alex 👋</h1>
          <p className="text-slate-500">Ready to find your next opportunity?</p>
        </div>
        <Link to="/coach" className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg shadow-orange-200 transition-all">
          <Zap size={20} />
        </Link>
      </header>

      {/* Quick Stats/Shortcuts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg shadow-blue-200">
          <div className="text-3xl font-bold">12</div>
          <div className="text-sm opacity-90">Applications</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-3xl font-bold text-orange-500">3</div>
          <div className="text-sm text-slate-500">Interviews</div>
        </div>
        <Link to="/cv" className="col-span-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 rounded-xl shadow-md flex items-center justify-between group">
          <div>
            <div className="font-semibold">Update CV</div>
            <div className="text-xs text-slate-400 group-hover:text-white transition-colors">Last edited 2 days ago</div>
          </div>
          <ArrowRight className="opacity-50 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      {/* Upcoming Schedule */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calendar size={18} className="text-blue-500" />
            Up Next
          </h2>
          <Link to="/planner" className="text-sm text-blue-600 font-medium hover:underline">View Planner</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {upcomingEvents.map(event => (
            <div key={event.id} className="min-w-[160px] bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{event.day}</div>
              <div className="font-semibold text-slate-900 mt-1">{event.time}</div>
              <div className="text-sm text-slate-600 truncate">{event.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Jobs */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp size={18} className="text-orange-500" />
            Trending Jobs
          </h2>
          <Link to="/jobs" className="text-sm text-blue-600 font-medium hover:underline">View All</Link>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
             [1, 2, 3].map(i => (
               <div key={i} className="h-40 bg-slate-100 rounded-xl animate-pulse" />
             ))
          ) : (
            trending.map(job => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </section>
    </div>
  );
};