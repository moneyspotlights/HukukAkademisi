import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle, Circle, Download, Play } from 'lucide-react';

const CourseViewPage = ({ courseId, currentUser, navigateTo }) => {
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const foundCourse = courses.find(c => c.id === courseId);
    setCourse(foundCourse);

    const mockLessons = [
      {
        id: 1,
        title: 'Giriş ve Temel Kavramlar',
        duration: '45 dakika',
        videoUrl: '#',
        materials: ['Sunum.pdf', 'Notlar.pdf']
      },
      {
        id: 2,
        title: 'İleri Seviye Konular',
        duration: '60 dakika',
        videoUrl: '#',
        materials: ['Örnek Vakalar.pdf']
      },
      {
        id: 3,
        title: 'Uygulama ve Örnekler',
        duration: '50 dakika',
        videoUrl: '#',
        materials: ['Uygulama Kılavuzu.pdf']
      }
    ];
    setLessons(mockLessons);
    setSelectedLesson(mockLessons[0]);

    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const enrollment = enrollments.find(
      e => e.studentId === currentUser?.id && e.courseId === courseId
    );
    if (enrollment) {
      setCompletedLessons(enrollment.progress || []);
    }
  }, [courseId, currentUser]);

  const toggleLessonComplete = (lessonId) => {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const enrollmentIndex = enrollments.findIndex(
      e => e.studentId === currentUser?.id && e.courseId === courseId
    );

    if (enrollmentIndex === -1) return;

    const isCompleted = completedLessons.includes(lessonId);
    let newCompleted;

    if (isCompleted) {
      newCompleted = completedLessons.filter(id => id !== lessonId);
    } else {
      newCompleted = [...completedLessons, lessonId];
    }

    enrollments[enrollmentIndex].progress = newCompleted;
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    setCompletedLessons(newCompleted);

    toast({
      title: isCompleted ? 'Tamamlanmadı olarak işaretlendi' : 'Tamamlandı! 🎉',
      description: isCompleted ? 'Ders tamamlanmadı olarak işaretlendi.' : 'Ders tamamlandı olarak işaretlendi.',
    });
  };

  const handleDownload = (material) => {
    toast({
      title: '🚧 Bu özellik henüz uygulanmadı',
      description: 'Ancak merak etmeyin! Bir sonraki isteminizde talep edebilirsiniz! 🚀',
    });
  };

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-muted-foreground">Eğitim bulunamadı.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{course.title} - Eğitim - Hukuk Akademisi</title>
        <meta name="description" content={`${course.title} eğitimini izleyin`} />
      </Helmet>

      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigateTo('student-dashboard')}
            className="mb-6"
          >
            ← Dashboard'a Dön
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-video bg-muted rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Video oynatıcı burada görünecek
                    </p>
                  </div>
                </div>

                {selectedLesson && (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                      {selectedLesson.title}
                    </h2>

                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-muted-foreground">
                        Süre: {selectedLesson.duration}
                      </span>

                      <Button
                        variant={completedLessons.includes(selectedLesson.id) ? 'default' : 'outline'}
                        onClick={() => toggleLessonComplete(selectedLesson.id)}
                        className="rounded-full"
                      >
                        {completedLessons.includes(selectedLesson.id) ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Tamamlandı
                          </>
                        ) : (
                          <>
                            <Circle className="h-4 w-4 mr-2" />
                            Tamamlanmadı
                          </>
                        )}
                      </Button>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Ders Materyalleri
                      </h3>
                      <div className="space-y-2">
                        {selectedLesson.materials.map((material, index) => (
                          <button
                            key={index}
                            onClick={() => handleDownload(material)}
                            className="w-full flex items-center justify-between bg-muted/50 hover:bg-muted rounded-lg p-3 transition-colors"
                          >
                            <span className="text-sm">{material}</span>
                            <Download className="h-4 w-4 text-primary" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-24"
              >
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Ders İçeriği
                  </h3>

                  <div className="space-y-2">
                    {lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className={`w-full text-left p-4 rounded-lg transition-colors ${
                          selectedLesson?.id === lesson.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted/50 hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium mb-1">
                              {lesson.title}
                            </p>
                            <p className={`text-sm ${
                              selectedLesson?.id === lesson.id
                                ? 'text-primary-foreground/80'
                                : 'text-muted-foreground'
                            }`}>
                              {lesson.duration}
                            </p>
                          </div>
                          {completedLessons.includes(lesson.id) && (
                            <CheckCircle className="h-5 w-5 flex-shrink-0 ml-2" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">İlerleme:</span>
                      <span className="font-medium">
                        {completedLessons.length} / {lessons.length}
                      </span>
                    </div>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{
                          width: `${(completedLessons.length / lessons.length) * 100}%`
                        }}
                      />
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

export default CourseViewPage;