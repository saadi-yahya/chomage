export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  posted: string;
  description: string;
  requirements: string[];
  tags: string[];
  logoUrl?: string;
}

export interface ApplicationStatus {
  id: string;
  jobId: string;
  status: 'Wishlist' | 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  dateAdded: string;
  notes: string;
  jobSnapshot: Job;
}

export interface PlannerItem {
  id: string;
  day: string; // Mon, Tue, etc.
  title: string;
  time: string;
  type: 'Interview' | 'Task' | 'Deadline';
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  isError?: boolean;
}