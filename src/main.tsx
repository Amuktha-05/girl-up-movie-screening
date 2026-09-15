import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AdminApp from './admin/AdminApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public registration site — completely unchanged */}
        <Route path="/" element={<App />} />
        {/* Protected admin dashboard — auth gate handled inside AdminApp */}
        <Route path="/admin" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
