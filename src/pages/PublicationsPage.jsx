import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n.jsx';

const PublicationsPage = ({ navigateTo }) => {
    const [publications, setPublications] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        setPublications(JSON.parse(localStorage.getItem('publications') || '[]'));
    }, []);

    const renderPublicationCard = (pub) => (
        <motion.div
            key={pub.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="group cursor-pointer"
            onClick={() => navigateTo('publication-detail', pub.id)}
        >
            <div className="bg-card border border-border rounded-2xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-shadow">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={pub.title} src="https://images.unsplash.com/photo-1603123543824-49b386aac1e4" />
            </div>
            <h3 className="text-md font-semibold mt-4 text-center">{pub.title}</h3>
            <p className="text-center text-primary font-bold">₺{pub.price}</p>
        </motion.div>
    );

    const books = publications.filter(p => p.type === 'kitap');
    const journals = publications.filter(p => p.type === 'dergi');

    return (
        <>
            <Helmet>
                <title>Yayınlar - Hukuk Akademisi</title>
                <meta name="description" content="Hukuk alanındaki kitap ve dergilerimizi keşfedin." />
            </Helmet>
            <div className="bg-background">
                <section className="py-24" style={{ backgroundColor: '#F5F5F7' }}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-5xl mx-auto">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">Yayınlarımız</h1>
                            <p className="text-lg text-muted-foreground">Hukuk literatürüne yön veren, alanında uzman akademisyenler ve uygulayıcılar tarafından kaleme alınmış değerli eserler.</p>
                        </div>
                    </div>
                </section>
                
                <section className="py-24 bg-background">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto text-lg text-foreground space-y-6">
                      <p>Hukuk Akademisi Yayıncılık, kurulduğu günden bu yana hukuk dünyasına nitelikli ve güncel eserler kazandırmayı misyon edinmiştir. Kitap ve dergilerimiz, hem teorik derinliği hem de pratik uygulamaya yönelik zengin içeriğiyle hukuk profesyonelleri ve öğrenciler için vazgeçilmez birer kaynak niteliğindedir. Her bir yayın, titiz bir editöryel süreçten geçerek okuyucuyla buluşur.</p>
                      <p>Yayın yelpazemiz, hukukun temel dallarından en spesifik ve güncel konulara kadar geniş bir alanı kapsamaktadır. Amacımız, sadece mevcut bilgi birikimini aktarmak değil, aynı zamanda hukuk alanındaki yeni tartışmalara öncülük etmek ve literatüre kalıcı katkılar sunmaktır. Bu doğrultuda, yenilikçi ve özgün çalışmalara her zaman kapımız açıktır.</p>
                    </div>
                  </div>
                </section>

                {books.length > 0 && (
                <section className="py-24 bg-muted/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kitaplarımız</h2>
                          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Monografiler, şerhler, el kitapları ve daha fazlası. Hukuk kütüphanenizi zenginleştirecek temel eserler.</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl mx-auto">
                            {books.slice(0,3).map(renderPublicationCard)}
                        </div>
                    </div>
                </section>
                )}

                {journals.length > 0 && (
                <section className="py-24 bg-muted/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dergilerimiz</h2>
                          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Hakemli ve güncel makalelerle hukuki gelişmeleri yakından takip edin.</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl mx-auto">
                            {journals.slice(0,3).map(renderPublicationCard)}
                        </div>
                    </div>
                </section>
                )}
                
                <section className="py-24 bg-background">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto text-lg text-foreground space-y-6">
                      <p>Yayıncılık faaliyetlerimizi dijital platformlara da taşıyarak, bilgiye erişimi daha kolay ve hızlı hale getiriyoruz. E-kitap ve online dergi aboneliklerimiz ile dünyanın her yerinden zengin arşivimize ulaşabilir, araştırmalarınızı ve çalışmalarınızı dijital dünyanın sunduğu imkanlarla sürdürebilirsiniz.</p>
                      <p>Hukuk Akademisi olarak, bilginin paylaşarak çoğaldığına inanıyoruz. Bu inançla, hukuk literatürüne katkıda bulunmak isteyen tüm yazarlara ve akademisyenlere kapılarımızı açıyor, değerli çalışmalarını daha geniş kitlelerle buluşturmak için köprü görevi görüyoruz.</p>
                    </div>
                  </div>
                </section>
            </div>
        </>
    );
};

export default PublicationsPage;