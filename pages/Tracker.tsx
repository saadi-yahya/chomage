import React from 'react';
import { ApplicationStatus } from '../types';
import { MoreHorizontal } from 'lucide-react';

const mockApps: ApplicationStatus[] = [
  { id: '1', jobId: '1', status: 'Interview', dateAdded: '2023-10-01', notes: 'Scheduled for Tuesday', jobSnapshot: { title: 'Senior React Dev', company: 'TechFlow', location: 'Remote', salary: '$120k', type: 'Full-time', posted: '', description: '', requirements: [], tags: [], id: '1' } },
  { id: '2', jobId: '2', status: 'Applied', dateAdded: '2023-10-02', notes: 'Waiting for response', jobSnapshot: { title: 'Product Designer', company: 'Creative Arc', location: 'NYC', salary: '$90k', type: 'Full-time', posted: '', description: '', requirements: [], tags: [], id: '2' } },
  { id: '3', jobId: '3', status: 'Rejected', dateAdded: '2023-09-28', notes: 'Position filled', jobSnapshot: { title: 'Junior Dev', company: 'StartupX', location: 'Remote', salary: '$60k', type: 'Contract', posted: '', description: '', requirements: [], tags: [], id: '3' } },
];

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    'Interview': 'bg-purple-100 text-purple-700',
    'Applied': 'bg-blue-100 text-blue-700',
    'Wishlist': 'bg-slate-100 text-slate-700',
    'Offer': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-50 text-red-600',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  );
};

export const Tracker: React.FC = () => {
  return (
    <div className="pb-20 md:pb-0">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Application Tracker</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Company / Role</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Date Added</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Notes</th>
                <th className="px-6 py-4 font-semibold text-slate-700 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{app.jobSnapshot.title}</div>
                    <div className="text-xs text-slate-500">{app.jobSnapshot.company}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{app.dateAdded}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-6 py-4 text-slate-500 italic max-w-xs truncate">{app.notes}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-blue-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};