import React from 'react';
import { Job } from '../types';
import { MapPin, DollarSign, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99] transition-transform"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <img 
            src={job.logoUrl} 
            alt={job.company} 
            className="w-12 h-12 rounded-lg object-cover bg-slate-100"
          />
          <div>
            <h3 className="font-semibold text-slate-900 line-clamp-1">{job.title}</h3>
            <p className="text-sm text-slate-600">{job.company}</p>
          </div>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {job.type}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-slate-500 gap-4">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            {job.location}
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign size={14} />
            {job.salary}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock size={12} />
          Posted {job.posted}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};