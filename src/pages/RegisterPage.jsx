import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from '@/i18n.jsx';
import { Checkbox } from '@/components/ui/checkbox';

const RegisterPage = ({ navigateTo }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreedMembership, setAgreedMembership] = useState(false);
  const [agreedClarification, setAgreedClarification] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Hata',
        description: 'Şifreler eşleşmiyor.',
        variant: 'destructive',
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.email === formData.email)) {
      toast({
        title: 'Hata',
        description: 'Bu e-posta adresi zaten kullanılıyor.',
        variant: 'destructive',
      });
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'student'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    toast({
      title: 'Kayıt Başarılı! 🎉',
      description: 'Hesabınız oluşturuldu. Şimdi giriş yapabilirsiniz.',
    });

    setTimeout(() => {
      navigateTo('login');
    }, 1500);
  };
  
  const canSubmit = agreedMembership && agreedClarification;

  return (
    <>
      <Helmet>
        <title>{t('register_title')} - Hukuk Akademisi</title>
        <meta name="description" content="Hukuk Akademisi'ne kayıt olun ve eğitimlere başlayın." />
      </Helmet>

      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-background to-muted/20 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-2">
              {t('register_title')}
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              {t('register_subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t('register_name_label')}</Label>
                <Input id="name" type="text" placeholder={t('register_name_placeholder')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="rounded-lg"/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('register_email_label')}</Label>
                <Input id="email" type="email" placeholder={t('register_email_placeholder')} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="rounded-lg"/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('register_password_label')}</Label>
                <Input id="password" type="password" placeholder={t('register_password_placeholder')} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required className="rounded-lg"/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('register_confirm_password_label')}</Label>
                <Input id="confirmPassword" type="password" placeholder={t('register_password_placeholder')} value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required className="rounded-lg"/>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                    <Checkbox id="membership" checked={agreedMembership} onCheckedChange={setAgreedMembership} className="mt-1"/>
                    <label htmlFor="membership" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        <button type="button" onClick={() => navigateTo('membership-agreement')} className="text-primary hover:underline">{t('footer_membership')}</button>
                        'ni okudum ve kabul ediyorum.
                    </label>
                </div>
                 <div className="flex items-start space-x-2">
                    <Checkbox id="clarification" checked={agreedClarification} onCheckedChange={setAgreedClarification} className="mt-1"/>
                    <label htmlFor="clarification" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        <button type="button" onClick={() => navigateTo('clarification-text')} className="text-primary hover:underline">{t('footer_clarification')}</button>
                        'ni okudum ve kabul ediyorum.
                    </label>
                </div>
              </div>


              <Button type="submit" disabled={!canSubmit} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-lg py-6 disabled:bg-primary/50">
                {t('register_button')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t('register_have_account')}{' '}
                <button onClick={() => navigateTo('login')} className="text-primary hover:underline font-medium">
                  {t('login_button')}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;