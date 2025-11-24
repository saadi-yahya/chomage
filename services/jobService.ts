import { Job } from '../types';

// Mock data store
const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechFlow Solutions',
    location: 'Remote',
    salary: '$120k - $150k',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'We are looking for an experienced React developer to lead our frontend team.',
    requirements: ['React', 'TypeScript', 'Tailwind CSS', '5+ years experience'],
    tags: ['Remote', 'Senior', 'Engineering'],
    logoUrl: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Creative Arc',
    location: 'New York, NY',
    salary: '$90k - $130k',
    type: 'Full-time',
    posted: '1 day ago',
    description: 'Join our award-winning design team working on next-gen consumer apps.',
    requirements: ['Figma', 'UI/UX', 'Prototyping', 'Portfolio required'],
    tags: ['Design', 'Creative', 'Hybrid'],
    logoUrl: 'https://picsum.photos/100/100?random=2'
  },
  {
    id: '3',
    title: 'Marketing Specialist',
    company: 'Growth Rocket',
    location: 'Austin, TX',
    salary: '$60k - $80k',
    type: 'Contract',
    posted: '4 hours ago',
    description: 'Help us scale our user base through targeted social media campaigns.',
    requirements: ['SEO', 'Content Marketing', 'Analytics', 'Copywriting'],
    tags: ['Marketing', 'Junior', 'Contract'],
    logoUrl: 'https://picsum.photos/100/100?random=3'
  },
  {
    id: '4',
    title: 'Backend Developer (Go)',
    company: 'StreamLine',
    location: 'San Francisco, CA',
    salary: '$140k - $180k',
    type: 'Full-time',
    posted: 'Just now',
    description: 'Building high-performance microservices for real-time video processing.',
    requirements: ['Go', 'Kubernetes', 'AWS', 'System Design'],
    tags: ['Backend', 'Go', 'Infrastructure'],
    logoUrl: 'https://picsum.photos/100/100?random=4'
  },
  {
    id: '5',
    title: 'Customer Success Manager',
    company: 'HelpDesk Inc.',
    location: 'Remote',
    salary: '$70k - $90k',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'Ensure our enterprise clients get the most out of our platform.',
    requirements: ['Communication', 'CRM', 'Problem Solving', 'English C1'],
    tags: ['Support', 'Remote', 'Non-tech'],
    logoUrl: 'https://picsum.photos/100/100?random=5'
  }
];

export const searchJobs = async (query: string): Promise<Job[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  if (!query) return MOCK_JOBS;
  
  const lowerQuery = query.toLowerCase();
  return MOCK_JOBS.filter(job => 
    job.title.toLowerCase().includes(lowerQuery) || 
    job.company.toLowerCase().includes(lowerQuery) ||
    job.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getJobById = async (id: string): Promise<Job | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_JOBS.find(j => j.id === id);
};

export const getTrendingJobs = async (): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return MOCK_JOBS.slice(0, 3);
};