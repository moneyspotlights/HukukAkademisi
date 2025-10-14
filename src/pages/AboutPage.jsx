import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Users, Award } from 'lucide-react';
import { useTranslation } from '@/i18n.jsx';
import { Button } from '@/components/ui/button';

const AboutPage = ({ navigateTo }) => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Misyonumuz',
      description: 'Hukuk eğitimini herkes için erişilebilir kılmak ve kaliteli eğitim sunmak'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Topluluk',
      description: 'Binlerce öğrenci ve uzman eğitmenle büyüyen bir topluluk'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Kalite',
      description: 'Sektörün en iyi eğitmenleri ve güncel içerikler'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Hakkımızda - Hukuk Akademisi</title>
        <meta name="description" content="Hukuk Akademisi hakkında bilgi edinin. Misyonumuz, vizyonumuz ve değerlerimiz." />
      </Helmet>

      <div className="bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Deneyimi
                <span className="block text-primary mt-2">Geleceğe Taşıyoruz</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                2013 yılından beri hukuk profesyonellerinin kariyer yolculuklarında onlara rehberlik ediyor, en güncel bilgi ve tecrübeyi sunuyoruz.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigateTo('courses')} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-lg px-8 py-6">Eğitimleri Keşfet</Button>
                <Button size="lg" variant="outline" onClick={() => navigateTo('contact')} className="rounded-full text-lg px-8 py-6">İletişime Geç</Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Storytelling Section 1 */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-lg text-foreground space-y-6">
              <p>Hukuk Akademisi, hukuk alanında faaliyet gösteren profesyonellerin, öğrencilerin ve akademisyenlerin mesleki gelişimlerine katkıda bulunmak amacıyla kurulmuştur. Kurulduğumuz günden bu yana, teorik bilgiyi pratik deneyimle birleştirerek katılımcılarımıza benzersiz bir öğrenme ortamı sunmayı hedefliyoruz. Gelişen teknoloji ve değişen hukuk normlarına hızla adapte olan dinamik yapımızla, sektörün nabzını tutuyor ve en güncel içerikleri sizlere ulaştırıyoruz.</p>
              <p>Eğitim programlarımız, alanında uzmanlaşmış, Türkiye'nin önde gelen hukukçuları ve akademisyenleri tarafından hazırlanmaktadır. Katılımcılarımızın sadece bilgi edinmelerini değil, aynı zamanda bu bilgiyi meslek hayatlarında nasıl etkin bir şekilde kullanacaklarını da öğrenmelerini sağlıyoruz. Bu misyonla, her bir eğitimi interaktif, vaka odaklı ve uygulamaya yönelik olarak tasarlıyoruz.</p>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {values.map((value, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow flex flex-col text-center items-center">
                        <div className="text-primary mb-4">{value.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground flex-grow">{value.description}</p>
                    </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Storytelling Section 2 */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Vizyonumuz</h2>
            </div>
            <div className="max-w-5xl mx-auto text-lg text-foreground space-y-6">
              <p>Hukuk Akademisi olarak vizyonumuz, Türkiye'de ve uluslararası alanda hukuk eğitiminin standartlarını yeniden tanımlamaktır. Teknolojiyi eğitimin merkezine koyarak, coğrafi sınırları ortadan kaldıran, herkes için erişilebilir ve esnek bir öğrenme platformu olmayı amaçlıyoruz. Geleceğin hukukçularını bugünden yetiştirirken, aynı zamanda mevcut profesyonellerin de sürekli gelişimlerini destekleyerek kariyerlerinde bir adım önde olmalarını sağlamayı hedefliyoruz.</p>
              <p>Yenilikçi eğitim modelleri, dijital yayıncılık ve interaktif medya araçları ile hukuk dünyasında bir referans noktası haline gelmek en büyük arzumuzdur. Bu yolda, etik değerlere bağlı, toplumsal sorumluluk bilincine sahip ve adaletin tecellisine katkı sağlayan bir neslin yetişmesine öncülük etmeyi vizyonumuzun temel taşı olarak görüyoruz.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;