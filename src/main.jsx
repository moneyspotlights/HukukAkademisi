import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/i18n.jsx';

const initializeDefaultData = () => {
  if (!localStorage.getItem('users')) {
    const defaultUsers = [
      {
        id: 1,
        name: 'Koordinatör',
        email: 'koordinator@hukukakademisi.com',
        password: '123456',
        role: 'coordinator'
      }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
  if (!localStorage.getItem('publications')) {
    const defaultPublications = [
        { id: 101, title: 'Anayasa Hukuku Dergisi', type: 'dergi', price: 150, stock: 50, image: 'law journal cover' },
        { id: 102, title: 'Borçlar Hukuku El Kitabı', type: 'kitap', price: 450, stock: 30, image: 'thick law book cover' },
        { id: 103, title: 'Ceza Muhakemesi Şerhi', type: 'kitap', price: 600, stock: 20, image: 'detailed criminal law book' },
        { id: 104, title: 'Fikri Mülkiyet Hukuku Dergisi', type: 'dergi', price: 175, stock: 40, image: 'intellectual property journal' },
    ];
    localStorage.setItem('publications', JSON.stringify(defaultPublications));
  }
   if (!localStorage.getItem('events')) {
    const defaultEvents = [
        { id: 201, title: 'Online Fikri Mülkiyet Semineri', type: 'Online', date: '2025-11-15T14:00:00', price: 250, capacity: 100 },
        { id: 202, title: 'Yüz Yüze Ceza Hukuku Konferansı', type: 'Yüz Yüze', date: '2025-12-05T09:00:00', price: 750, capacity: 50 },
    ];
    localStorage.setItem('events', JSON.stringify(defaultEvents));
  }
};

initializeDefaultData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
      <Toaster />
    </LanguageProvider>
  </React.StrictMode>
);