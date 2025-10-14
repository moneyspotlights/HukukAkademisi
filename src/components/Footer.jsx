import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { useTranslation } from '@/i18n.jsx';

const Footer = ({ navigateTo }) => {
    const { t } = useTranslation();

    const handleSubscribe = (e) => {
        e.preventDefault();
        toast({
            title: 'Teşekkürler! 🎉',
            description: 'Bültenimize başarıyla abone oldunuz.',
        });
        e.target.reset();
    };

    return (
        <footer className="bg-gray-900 text-gray-300 dark:bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <p className="font-bold text-white mb-4">{t('footer_follow')}</p>
                        <div className="flex space-x-4 mb-8">
                            <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white"><Instagram /></a>
                            <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white"><Linkedin /></a>
                            <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white"><Youtube /></a>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-3">
                                <button onClick={() => navigateTo('clarification-text')} className="block hover:text-white text-left">{t('footer_clarification')}</button>
                                <button onClick={() => navigateTo('terms-of-service')} className="block hover:text-white text-left">{t('footer_terms')}</button>
                            </div>
                            <div className="space-y-3">
                                <button onClick={() => navigateTo('privacy-policy')} className="block hover:text-white text-left">{t('footer_privacy')}</button>
                                <button onClick={() => navigateTo('membership-agreement')} className="block hover:text-white text-left">{t('footer_membership')}</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-white mb-4">{t('footer_subscribe_title')}</p>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                            <Input 
                                type="email" 
                                placeholder={t('footer_email_placeholder')}
                                className="bg-gray-800 border-gray-700 text-white rounded-lg focus:ring-primary"
                                required 
                            />
                            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">{t('footer_submit')}</Button>
                        </form>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center md:text-left">
                    <p className="text-xs text-gray-500">{t('footer_copyright', { year: new Date().getFullYear() })}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;