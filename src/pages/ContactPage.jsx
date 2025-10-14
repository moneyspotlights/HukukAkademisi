import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '@/i18n';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Mesajınız Alındı! 📧',
      description: 'En kısa sürede size dönüş yapacağız.',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: <Mail className="h-6 w-6" />, title: 'E-posta', content: 'info@hukukakademisi.com' },
    { icon: <Phone className="h-6 w-6" />, title: 'Telefon', content: '+90 (212) 123 45 67' },
    { icon: <MapPin className="h-6 w-6" />, title: 'Adres', content: 'İstanbul, Türkiye' }
  ];

  return (
    <>
      <Helmet>
        <title>İletişim - Hukuk Akademisi</title>
        <meta name="description" content="Hukuk Akademisi ile iletişime geçin. Sorularınız için bize ulaşın." />
      </Helmet>
      <div className="bg-background">
        <section className="py-24" style={{ backgroundColor: '#F5F5F7' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">İletişime Geçin</h1>
                    <p className="text-lg text-muted-foreground">Sorularınız, önerileriniz veya işbirliği talepleriniz için buradayız. Size yardımcı olmaktan mutluluk duyarız.</p>
                </div>
            </div>
        </section>

        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
                    {contactInfo.map((info, index) => (
                      <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-card border border-border rounded-2xl p-6 text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">{info.icon}</div>
                          <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                          <p className="text-muted-foreground">{info.content}</p>
                      </motion.div>
                    ))}
                </div>
            </div>
        </section>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="pb-24">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Bize Mesaj Gönderin</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div><Input placeholder="Adınız Soyadınız" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="rounded-lg" /></div>
                <div><Input type="email" placeholder="E-posta Adresiniz" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="rounded-lg" /></div>
                <div><Input placeholder="Konu" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required className="rounded-lg" /></div>
                <div><Textarea placeholder="Mesajınız" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={6} className="rounded-lg resize-none" /></div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-lg py-6">Gönder</Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;