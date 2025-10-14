import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Clock, Users, Star, CheckCircle, ShoppingCart } from 'lucide-react';

const CourseDetailPage = ({ courseId, navigateTo, currentUser, addToCart }) => {
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      const courses = JSON.parse(savedCourses);
      const foundCourse = courses.find(c => c.id === courseId);
      setCourse(foundCourse);
    }
    
    if (currentUser) {
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const enrolled = enrollments.some(e => e.studentId === currentUser.id && e.courseId === courseId);
        setIsEnrolled(enrolled);
    }

  }, [courseId, currentUser]);

  const handlePrimaryAction = () => {
    if (isEnrolled) {
        navigateTo('course-view', course.id);
        return;
    }
    
    if (!currentUser) {
      toast({
        title: 'Giriş Yapmalısınız',
        description: 'Satın almak için lütfen giriş yapın.',
        variant: 'destructive',
      });
      navigateTo('login');
      return;
    }

    addToCart({ ...course, type: 'Eğitim' });
    toast({
        title: 'Sepete Eklendi! 🛒',
        description: `${course.title} sepetinize eklendi.`,
    });
    navigateTo('cart');
  };

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-muted-foreground">Eğitim bulunamadı.</p>
      </div>
    );
  }

  const features = [
    'Video dersler',
    'Sunum dosyaları',
    'Sertifika',
    'Sınırsız erişim'
  ];

  return (
    <>
      <Helmet>
        <title>{course.title} - Hukuk Akademisi</title>
        <meta name="description" content={course.description} />
      </Helmet>

      <div className="bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            variant="ghost"
            onClick={() => navigateTo('courses')}
            className="mb-6"
          >
            ← Geri Dön
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-video bg-muted rounded-2xl overflow-hidden mb-6">
                  <img className="w-full h-full object-cover" alt={`${course.title} preview`} src="https://images.unsplash.com/photo-1677696795233-5ef097695f12" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {course.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm">{course.students} öğrenci</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                    Eğitmen
                  </h2>
                  <p className="text-lg">{course.instructor}</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Bu Eğitimde Neler Var?
                  </h2>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-24"
              >
                <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-primary">
                      ₺{course.price}
                    </span>
                  </div>

                  <Button
                    onClick={handlePrimaryAction}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-lg py-6 mb-4"
                  >
                    {isEnrolled ? "Eğitime Git" : (
                        <>
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Sepete Ekle
                        </>
                    )}
                  </Button>

                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Süre:</span>
                      <span className="font-medium text-foreground">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Öğrenci:</span>
                      <span className="font-medium text-foreground">{course.students}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Puan:</span>
                      <span className="font-medium text-foreground">{course.rating}/5</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;