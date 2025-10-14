import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpenCheck, Medal, Clapperboard, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from '@/i18n.jsx';

const HomePage = ({ navigateTo }) => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [publications, setPublications] = useState([]);
  const [courseIndex, setCourseIndex] = useState(0);
  const [pubIndex, setPubIndex] = useState(0);

  useEffect(() => {
    const savedCourses = localStorage.getItem('courses') || '[]';
    setCourses(JSON.parse(savedCourses));

    const savedPublications = localStorage.getItem('publications') || '[]';
    setPublications(JSON.parse(savedPublications));
  }, []);

  const features = [
    {
      icon: <Medal className="h-8 w-8" />,
      title: t('feature1_title'),
      description: t('feature1_desc'),
      page: 'courses',
    },
    {
      icon: <BookOpenCheck className="h-8 w-8" />,
      title: t('feature2_title'),
      description: t('feature2_desc'),
      page: 'publications',
    },
    {
      icon: <Clapperboard className="h-8 w-8" />,
      title: t('feature3_title'),
      description: t('feature3_desc'),
      page: 'media',
    },
  ];

  const nextItem = (setter, items) => setter(prev => (prev + 1) % (items.length > 3 ? items.length - 2 : 1));
  const prevItem = (setter, items) => setter(prev => (prev - 1 + (items.length > 3 ? items.length - 2 : 1)) % (items.length > 3 ? items.length - 2 : 1));

  const handleBannerClick = () => {
    toast({
      title: '🚧 Bu özellik henüz uygulanmadı',
      description: 'Ancak merak etmeyin! Bir sonraki isteminizde talep edebilirsiniz! 🚀',
    });
  };

  return (
    <>
      <Helmet>
        <title>Hukuk Akademisi - Online Hukuk Eğitimleri ve Yayıncılık</title>
        <meta name="description" content="Profesyonel hukuk eğitimleri, yayınlar ve etkinlikler ile kariyerinizi geliştirin." />
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              {t('home_hero_title1')}
              <span className="block text-primary mt-2">{t('home_hero_title2')}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('home_hero_subtitle')}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigateTo('courses')} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-lg px-8 py-6">{t('home_explore_courses')}</Button>
              <Button size="lg" variant="outline" onClick={() => navigateTo('about')} className="rounded-full text-lg px-8 py-6">{t('nav_about')}</Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home_why_title')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('home_why_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow flex flex-col cursor-pointer" onClick={() => navigateTo(feature.page)}>
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground flex-grow">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home_upcoming_courses_title')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('home_upcoming_courses_subtitle')}</p>
          </div>
          {courses.length > 0 && (
            <>
            <div className="relative overflow-hidden max-w-5xl mx-auto">
              <motion.div className="flex gap-8" animate={{ x: `calc(-${courseIndex * 100 / 3}% - ${courseIndex * 32 / 3}px)` }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                {courses.map((course) => (
                  <div key={course.id} className="flex-shrink-0 w-full md:w-[calc(33.333%-1.5rem)]">
                    <div className="bg-card rounded-2xl overflow-hidden group border cursor-pointer flex flex-col h-full" onClick={() => navigateTo('course-detail', course.id)}>
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={course.image} src="https://images.unsplash.com/photo-1635251595512-dc52146d5ae8" />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-semibold truncate flex-grow">{course.title}</h3>
                        <p className="text-primary font-bold mt-2">₺{course.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            {courses.length > 3 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={() => prevItem(setCourseIndex, courses)} className="rounded-full bg-primary/10 border-primary text-primary hover:bg-primary/20"><ChevronLeft className="h-5 w-5" /></Button>
              <Button variant="outline" size="icon" onClick={() => nextItem(setCourseIndex, courses)} className="rounded-full bg-primary/10 border-primary text-primary hover:bg-primary/20"><ChevronRight className="h-5 w-5" /></Button>
            </div>
            )}
            </>
          )}
        </div>
      </section>
      
      <section className="py-12 w-full">
        <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} onClick={handleBannerClick} className="relative cursor-pointer aspect-[2/1] md:aspect-[3/1] bg-gray-800 flex items-center justify-center text-white p-8 text-center w-full">
            <img className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Law education banner" src="https://images.unsplash.com/photo-1683874249384-910c58c05086" />
            <div className="relative z-10">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold">{t('home_banner_title')}</h3>
                <p className="mt-2 text-lg md:text-xl text-primary font-semibold">{t('home_banner_subtitle')}</p>
            </div>
        </motion.div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home_publications_title')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('home_publications_subtitle')}</p>
          </div>
          {publications.length > 0 && (
            <>
            <div className="relative overflow-hidden max-w-5xl mx-auto">
              <motion.div className="flex gap-8" animate={{ x: `calc(-${pubIndex * 100 / 3}% - ${pubIndex * 32 / 3}px)` }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                {publications.map((pub) => (
                  <div key={pub.id} className="flex-shrink-0 w-full md:w-[calc(33.333%-1.5rem)]">
                     <div className="bg-card rounded-2xl overflow-hidden group border cursor-pointer flex flex-col h-full" onClick={() => navigateTo('publication-detail', pub.id)}>
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={pub.image} src="https://images.unsplash.com/photo-1603123543824-49b386aac1e4" />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h4 className="font-semibold truncate flex-grow">{pub.title}</h4>
                        <p className="text-primary font-bold mt-2">₺{pub.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            {publications.length > 3 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={() => prevItem(setPubIndex, publications)} className="rounded-full bg-primary/10 border-primary text-primary hover:bg-primary/20"><ChevronLeft className="h-5 w-5" /></Button>
              <Button variant="outline" size="icon" onClick={() => nextItem(setPubIndex, publications)} className="rounded-full bg-primary/10 border-primary text-primary hover:bg-primary/20"><ChevronRight className="h-5 w-5" /></Button>
            </div>
            )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;