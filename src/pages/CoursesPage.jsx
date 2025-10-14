import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star } from 'lucide-react';
import { useTranslation } from '@/i18n.jsx';
import { Volume2, VolumeX } from 'lucide-react';

const CoursesPage = ({ navigateTo }) => {
  const [courses, setCourses] = useState([]);
  const { t } = useTranslation();
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setCourses(JSON.parse(localStorage.getItem('courses') || '[]'));
  }, []);

  return (
    <>
      <Helmet>
        <title>Eğitimler - Hukuk Akademisi</title>
        <meta name="description" content="Online hukuk eğitimlerimizi keşfedin. Uzman eğitmenlerden profesyonel dersler." />
      </Helmet>

      <div className="bg-background">
        <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
             <iframe
                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2"
                src={`https://www.youtube.com/embed/WhICVnfwcpE?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=WhICVnfwcpE&controls=0&showinfo=0&autohide=1&modestbranding=1&vq=hd1080`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Background Video"
            ></iframe>
            <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-6 right-6 z-20 text-white hover:bg-white/20 hover:text-white rounded-full"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Kariyerinizi Şekillendirin</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white/90">
              Türkiye'nin en iyi hukukçularından öğrenin, uzmanlığınızı bir üst seviyeye taşıyın.
            </p>
            <Button size="lg" onClick={() => navigateTo('course-detail', 1)} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-lg px-8 py-6">Öne Çıkan Eğitimi İncele</Button>
          </motion.div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-lg text-foreground space-y-6">
              <p>Hukuk Akademisi'nin online eğitimleri, modern hukuk dünyasının karmaşık taleplerine cevap vermek üzere tasarlanmıştır. Her bir kurs, teorik bilgiyi gerçek dünya senaryolarıyla birleştirerek, öğrenilenlerin kalıcı olmasını sağlar. Esnek programlarımız sayesinde, kendi hızınızda ve programınıza uygun şekilde öğrenebilir, kariyer hedeflerinize ara vermeden ulaşabilirsiniz.</p>
              <p>Platformumuz, en güncel teknolojik altyapıyı kullanarak kesintisiz ve interaktif bir öğrenme deneyimi sunar. Canlı dersler, video kayıtları, indirilebilir materyaller ve eğitmenlerle doğrudan iletişim kurma imkanı ile bilginin sınırlarını ortadan kaldırıyoruz. Hukukun her alanında uzmanlaşmanız için ihtiyacınız olan tüm kaynaklar parmaklarınızın ucunda.</p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tüm Eğitimler</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Uzmanlık alanınıza veya ilgi duyduğunuz konulara göre hazırlanmış eğitimlerimize göz atın.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group flex flex-col">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={`${course.title} course thumbnail`} src="https://images.unsplash.com/photo-1635251595512-dc52146d5ae8" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1"><Clock className="h-4 w-4" /><span>{course.duration}</span></div>
                      <div className="flex items-center space-x-1"><Users className="h-4 w-4" /><span>{course.students} öğrenci</span></div>
                      <div className="flex items-center space-x-1"><Star className="h-4 w-4 fill-primary text-primary" /><span>{course.rating}</span></div>
                    </div>
                    <Button onClick={() => navigateTo('course-detail', course.id)} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">Detayları Gör</Button>
                  </div>
                </motion.div>
              ))}
            </div>
            {courses.length === 0 && <p className="text-center py-12 text-muted-foreground text-lg">Henüz eğitim bulunmamaktadır.</p>}
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Öğrenim Yolculuğunuz</h2>
            </div>
            <div className="max-w-5xl mx-auto text-lg text-foreground space-y-6">
              <p>Hukuk Akademisi'ne katılarak sadece bir eğitim programına değil, aynı zamanda sürekli öğrenmeyi ve gelişimi teşvik eden bir topluluğa dahil olursunuz. Mezunlarımız, edindikleri bilgi ve becerilerle meslek hayatlarında fark yaratmakta ve kariyer basamaklarını hızla tırmanmaktadır. Sizi de bu başarılı topluluğun bir parçası olmaya davet ediyoruz.</p>
              <p>Sertifikasyon programlarımız, ulusal ve uluslararası alanda tanınırlığa sahip olup, özgeçmişinize değer katacak niteliktedir. Eğitiminizi tamamladıktan sonra alacağınız sertifika ile uzmanlığınızı belgeleyebilir, yeni kariyer fırsatlarının kapısını aralayabilirsiniz. Başarıya giden yolda Hukuk Akademisi her zaman yanınızda.</p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default CoursesPage;