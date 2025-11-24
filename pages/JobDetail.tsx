import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from '../services/jobService';
import { Job } from '../types';
import { ArrowLeft, Share2, Bookmark, CheckCircle, Briefcase, MapPin, DollarSign } from 'lucide-react';

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      getJobById(id).then(j => setJob(j || null));
    }
  }, [id]);

  if (!job) return <div className="p-8 text-center text-slate-400">Loading job details...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-24 md:pb-10">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 flex items-center text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={18} className="mr-1" /> Back
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="px-6 md:px-10 pb-10">
          <div className="flex justify-between items-start -mt-10 mb-6">
            <img 
              src={job.logoUrl} 
              alt={job.company} 
              className="w-20 h-20 rounded-xl border-4 border-white bg-white shadow-md object-cover"
            />
            <div className="flex gap-2 mt-12 md:mt-0">
               <button className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 rounded-full">
                 <Share2 size={20} />
               </button>
               <button className="p-2 text-slate-400 hover:text-orange-500 bg-slate-50 rounded-full">
                 <Bookmark size={20} />
               </button>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-8">
            <span className="flex items-center gap-1"><Briefcase size={16}/> {job.company}</span>
            <span className="flex items-center gap-1"><MapPin size={16}/> {job.location}</span>
            <span className="flex items-center gap-1 text-green-600 font-medium"><DollarSign size={16}/> {job.salary}</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-3">About the Role</h3>
                <p className="text-slate-600 leading-relaxed">{job.description}</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle size={18} className="text-blue-500 mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl h-fit border border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-4">Job Overview</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-slate-500 block mb-1">Job Type</span>
                  <span className="font-medium text-slate-800">{job.type}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Posted</span>
                  <span className="font-medium text-slate-800">{job.posted}</span>
                </div>
                <div>
                   <span className="text-slate-500 block mb-1">Skills</span>
                   <div className="flex flex-wrap gap-2 mt-1">
                     {job.tags.map(tag => (
                       <span key={tag} className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600">
                         {tag}
                       </span>
                     ))}
                   </div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg shadow-blue-200 transition-all">
                Apply Now
              </button>
              <button className="w-full mt-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-3 rounded-lg font-medium transition-colors">
                Add to Planner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};