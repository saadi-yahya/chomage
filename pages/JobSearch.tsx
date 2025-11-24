import React, { useState, useEffect } from 'react';
import { searchJobs } from '../services/jobService';
import { Job } from '../types';
import { JobCard } from '../components/JobCard';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';

export const JobSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    const results = await searchJobs(query);
    setJobs(results);
    setIsSearching(false);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full flex flex-col pb-20 md:pb-0">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 sticky top-0 z-10 md:static">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Job title, keywords, or company" 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="City, state, or 'Remote'" 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button 
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 md:shadow-none"
          >
            Find Jobs
          </button>
        </div>
        
        {/* Simple Filter Pills */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-medium text-slate-700 whitespace-nowrap">
              <SlidersHorizontal size={14} /> Filters
            </button>
            {['Remote', 'Full-time', '$100k+', 'Last 24h'].map(f => (
              <button key={f} className="px-3 py-1.5 border border-slate-200 hover:border-blue-300 rounded-full text-xs text-slate-600 whitespace-nowrap">
                {f}
              </button>
            ))}
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-sm font-semibold text-slate-500 mb-4">{jobs.length} Results found</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {isSearching ? (
             <div className="col-span-full py-20 text-center text-slate-400">Searching...</div>
          ) : (
            jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};