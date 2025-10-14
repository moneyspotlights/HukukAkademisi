import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpen, Play } from 'lucide-react';

const StudentDashboard = ({ currentUser, navigateTo }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');

    const userEnrollments = enrollments.filter(e => e.studentId === currentUser.id);
    const userCourses = userEnrollments.map(enrollment => {
      const course = courses.find(c => c.id === enrollment.courseId);
      return {
        ...course,
        enrollmentId: enrollment.id,
        progress: enrollment.progress || []
      };
    }).filter(c => c.id);

    setEnrolledCourses(userCourses);
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-muted-foreground">Lütfen giriş yapın.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Öğrenci Dashboard - Hukuk Akademisi</title>
        <meta name="description" content="Kayıtlı olduğunuz eğitimleri görüntüleyin ve öğrenmeye devam edin." />
      </Helmet>

      <div className="bg-gradient-to-b from-background to-muted/20 min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-2">
              Hoş Geldiniz, {currentUser.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              Eğitimlerinize devam edin
            </p>
          </motion.div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrolledCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img 
                      className="w-full h-full object-cover"
                      alt={`${course.title} thumbnail`}
                     src="https://images.unsplash.com/photo-1635251595512-dc52146d5ae8" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <Button
                      onClick={() => navigateTo('course-view', course.id)}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Eğitime Devam Et
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
                Henüz Kayıtlı Eğitim Yok
              </h2>
              <p className="text-muted-foreground mb-6">
                Eğitimlere göz atın ve öğrenmeye başlayın
              </p>
              <Button
                onClick={() => navigateTo('courses')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
              >
                Eğitimleri Keşfet
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;