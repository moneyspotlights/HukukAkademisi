import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from '@/i18n.jsx';
import { Button } from '@/components/ui/button';

const PrivacyPolicyPage = ({ navigateTo }) => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Gizlilik Politikası - Hukuk Akademisi</title>
      </Helmet>
      <div className="bg-white dark:bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={() => window.history.back()} className="mb-8">← Geri</Button>
          <div className="max-w-5xl mx-auto prose dark:prose-invert prose-lg">
            <h1>Gizlilik Politikası</h1>
            <p>{t('lorem_ipsum_p1')}</p>
            <h2>{t('lorem_ipsum_title')}</h2>
            <p>{t('lorem_ipsum_p2')}</p>
            <p>{t('lorem_ipsum_p1')}</p>
            <h3>{t('lorem_ipsum_title')}</h3>
            <p>{t('lorem_ipsum_p2')}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;