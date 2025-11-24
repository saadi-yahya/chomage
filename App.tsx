
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { Dashboard } from './pages/Dashboard';
import { JobSearch } from './pages/JobSearch';
import { JobDetail } from './pages/JobDetail';
import { Planner } from './pages/Planner';
import { Coach } from './pages/Coach';
import { CVBuilder } from './pages/CVBuilder';
import { Tracker } from './pages/Tracker';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="jobs" element={<JobSearch />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          <Route path="planner" element={<Planner />} />
          <Route path="coach" element={<Coach />} />
          <Route path="cv" element={<CVBuilder />} />
          <Route path="tracker" element={<Tracker />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
