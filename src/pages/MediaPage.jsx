import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n.jsx';
import { Volume2, VolumeX } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const MediaPage = ({ navigateTo }) => {
  const { t } = useTranslation();
  const [isMuted, setIsMuted] = useState(true);

  const handleCTA = () => {
    toast({
        title: '🚧 Bu özellik henüz uygulanmadı',
        description: 'Ancak merak etmeyin! Bir sonraki isteminizde talep edebilirsiniz! 🚀',
      });
  }

  return (
    <>
      <Helmet>
        <title>Medya - Hukuk Akademisi</title>
        <meta name="description" content="H+ Digital ile hukuk dünyasının nabzını tutun. Podcastler, webinarlar ve daha fazlası." />
      </Helmet>

      <div className="bg-background">
        <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
             <iframe
                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2"
                src={`https://www.youtube.com/embed/gbNq_sM0gT0?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=gbNq_sM0gT0&controls=0&showinfo=0&autohide=1&modestbranding=1&vq=hd1080`}
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">H+ Digital</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white/90">
              Hukuk dünyasının yeni nesil medya platformu. Podcast'ler, canlı yayınlar ve özel içeriklerle bilgiye her an, her yerden ulaşın.
            </p>
            <Button size="lg" onClick={handleCTA} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-lg px-8 py-6">İçerikleri Keşfet</Button>
          </motion.div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-lg text-foreground space-y-6">
              <p>H+ Digital, Hukuk Akademisi'nin dijital medya markası olarak, hukukçuların bilgiye erişim alışkanlıklarını kökten değiştirmeyi hedeflemektedir. Yoğun temponuzda dahi hukuki gündemi ve mesleki gelişmeleri takip edebilmeniz için podcast serileri, video içerikler, canlı yayınlar ve webinarlar üretiyoruz. Amacımız, zaman ve mekan sınırlaması olmaksızın, en kaliteli içeriği en erişilebilir formatlarda sunmaktır.</p>
              <p>Alanında öncü hukukçuların, akademisyenlerin ve sektör liderlerinin katılımıyla hazırlanan içeriklerimiz, sadece teorik bilgi sunmakla kalmaz, aynı zamanda güncel tartışmalara ışık tutar ve farklı perspektifler sunar. H+ Digital ile öğrenmek, ilham almak ve mesleki ağınızı genişletmek artık çok daha kolay.</p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Popüler İçerikler</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">En çok dinlenen podcast bölümlerimiz ve izlenen webinarlarımızdan bir seçki.</p>
                </div>
                 <div className="text-center py-16 text-muted-foreground">
                    <p>Medya içeriği yakında eklenecektir.</p>
                 </div>
            </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Topluluğa Katılın</h2>
            </div>
            <div className="max-w-5xl mx-auto text-lg text-foreground space-y-6">
              <p>H+ Digital sadece bir içerik platformu değil, aynı zamanda canlı ve interaktif bir topluluktur. Canlı yayınlarımızda sorularınızı doğrudan uzmanlara yöneltebilir, tartışmalara katılabilir ve Türkiye'nin dört bir yanından meslektaşlarınızla fikir alışverişinde bulunabilirsiniz.</p>
              <p>Sürekli genişleyen içerik kütüphanemizle, kariyerinizin her aşamasında size eşlik etmeye hazırız. Hukukun dinamik dünyasında bir adım önde olmak için H+ Digital'ı takipte kalın.</p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default MediaPage;