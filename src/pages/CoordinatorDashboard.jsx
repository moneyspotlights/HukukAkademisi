import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, UserPlus } from 'lucide-react';

const CoordinatorDashboard = ({ navigateTo }) => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [publications, setPublications] = useState([]);
  const [events, setEvents] = useState([]);

  const [newCourse, setNewCourse] = useState({ title: '', price: '', duration: '', instructor: '', description: '' });
  const [newPublication, setNewPublication] = useState({ title: '', price: '', stock: '', type: 'kitap' });
  const [newEvent, setNewEvent] = useState({ title: '', price: '', capacity: '', date: '', type: 'Online' });


  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setCourses(JSON.parse(localStorage.getItem('courses') || '[]'));
    setUsers(JSON.parse(localStorage.getItem('users') || '[]').filter(u => u.role === 'student'));
    setEnrollments(JSON.parse(localStorage.getItem('enrollments') || '[]'));
    setPublications(JSON.parse(localStorage.getItem('publications') || '[]'));
    setEvents(JSON.parse(localStorage.getItem('events') || '[]'));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const updatedCourses = [...courses, { id: Date.now(), ...newCourse, price: parseFloat(newCourse.price), students: 0, rating: 5.0, image: 'Professional law education course' }];
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
    toast({ title: 'Eğitim Eklendi!' });
    setNewCourse({ title: '', price: '', duration: '', instructor: '', description: '' });
  };
  
  const handleAddPublication = (e) => {
    e.preventDefault();
    const updatedPublications = [...publications, { id: Date.now(), ...newPublication, price: parseFloat(newPublication.price), stock: parseInt(newPublication.stock), image: 'new publication cover' }];
    localStorage.setItem('publications', JSON.stringify(updatedPublications));
    setPublications(updatedPublications);
    toast({ title: 'Yayın Eklendi!' });
    setNewPublication({ title: '', price: '', stock: '', type: 'kitap' });
  };
  
  const handleAddEvent = (e) => {
    e.preventDefault();
    const updatedEvents = [...events, { id: Date.now(), ...newEvent, price: parseFloat(newEvent.price), capacity: parseInt(newEvent.capacity) }];
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
    toast({ title: 'Etkinlik Eklendi!' });
    setNewEvent({ title: '', price: '', capacity: '', date: '', type: 'Online' });
  };
  
  const handleDelete = (type, id) => {
      if (type === 'course') {
          const updated = courses.filter(item => item.id !== id);
          setCourses(updated);
          localStorage.setItem('courses', JSON.stringify(updated));
      } else if (type === 'publication') {
          const updated = publications.filter(item => item.id !== id);
          setPublications(updated);
          localStorage.setItem('publications', JSON.stringify(updated));
      } else if (type === 'event') {
          const updated = events.filter(item => item.id !== id);
          setEvents(updated);
          localStorage.setItem('events', JSON.stringify(updated));
      }
      toast({ title: 'Öğe Silindi' });
  };

  return (
    <>
      <Helmet>
        <title>Koordinatör Dashboard - Hukuk Akademisi</title>
        <meta name="description" content="Eğitimleri, yayınları, etkinlikleri ve öğrencileri yönetin." />
      </Helmet>
      <div className="bg-gradient-to-b from-background to-muted/20 min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Koordinatör Dashboard</h1>
            <p className="text-lg text-muted-foreground">İçerikleri ve kullanıcıları yönetin</p>
          </motion.div>

          <Tabs defaultValue="courses" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="courses">Eğitimler</TabsTrigger>
              <TabsTrigger value="publications">Yayınlar</TabsTrigger>
              <TabsTrigger value="events">Etkinlikler</TabsTrigger>
              <TabsTrigger value="students">Öğrenciler</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold mb-6">Yeni Eğitim Ekle</h2>
                    <form onSubmit={handleAddCourse} className="space-y-4">
                        <Input placeholder="Eğitim Adı" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} required />
                        <Input placeholder="Fiyat" type="number" value={newCourse.price} onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })} required />
                        <Input placeholder="Süre" value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })} required />
                        <Input placeholder="Eğitmen" value={newCourse.instructor} onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })} required />
                        <Input placeholder="Açıklama" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} required />
                        <Button type="submit"><Plus className="h-4 w-4 mr-2"/>Ekle</Button>
                    </form>
                </motion.div>
                <div className="space-y-4">
                    {courses.map(course => (
                        <div key={course.id} className="bg-card border p-4 rounded-xl flex justify-between items-center">
                            <span>{course.title}</span>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete('course', course.id)}><Trash2 className="h-4 w-4"/></Button>
                        </div>
                    ))}
                </div>
            </TabsContent>
            
            <TabsContent value="publications" className="space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold mb-6">Yeni Yayın Ekle</h2>
                    <form onSubmit={handleAddPublication} className="space-y-4">
                        <Input placeholder="Yayın Adı" value={newPublication.title} onChange={(e) => setNewPublication({ ...newPublication, title: e.target.value })} required />
                        <Input placeholder="Fiyat" type="number" value={newPublication.price} onChange={(e) => setNewPublication({ ...newPublication, price: e.target.value })} required />
                        <Input placeholder="Stok" type="number" value={newPublication.stock} onChange={(e) => setNewPublication({ ...newPublication, stock: e.target.value })} required />
                         <select value={newPublication.type} onChange={e => setNewPublication({...newPublication, type: e.target.value})} className="w-full p-2 border rounded-lg bg-background">
                            <option value="kitap">Kitap</option>
                            <option value="dergi">Dergi</option>
                        </select>
                        <Button type="submit"><Plus className="h-4 w-4 mr-2"/>Ekle</Button>
                    </form>
                </motion.div>
                <div className="space-y-4">
                    {publications.map(pub => (
                        <div key={pub.id} className="bg-card border p-4 rounded-xl flex justify-between items-center">
                            <span>{pub.title} ({pub.type})</span>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete('publication', pub.id)}><Trash2 className="h-4 w-4"/></Button>
                        </div>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold mb-6">Yeni Etkinlik Ekle</h2>
                    <form onSubmit={handleAddEvent} className="space-y-4">
                        <Input placeholder="Etkinlik Adı" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
                        <Input placeholder="Fiyat" type="number" value={newEvent.price} onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })} required />
                        <Input placeholder="Kapasite" type="number" value={newEvent.capacity} onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })} required />
                        <Input type="datetime-local" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required />
                        <select value={newEvent.type} onChange={e => setNewEvent({...newEvent, type: e.target.value})} className="w-full p-2 border rounded-lg bg-background">
                            <option value="Online">Online</option>
                            <option value="Yüz Yüze">Yüz Yüze</option>
                        </select>
                        <Button type="submit"><Plus className="h-4 w-4 mr-2"/>Ekle</Button>
                    </form>
                </motion.div>
                 <div className="space-y-4">
                    {events.map(event => (
                        <div key={event.id} className="bg-card border p-4 rounded-xl flex justify-between items-center">
                            <span>{event.title} ({event.type})</span>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete('event', event.id)}><Trash2 className="h-4 w-4"/></Button>
                        </div>
                    ))}
                </div>
            </TabsContent>
            
            <TabsContent value="students">
                <p className="text-muted-foreground text-center py-8">Öğrenci yönetimi yakında...</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default CoordinatorDashboard;