import React, { useState } from 'react';
import { Menu, X, Sun, Moon, User, LogOut, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/i18n.jsx';

const Header = ({ navigateTo, currentUser, onLogout, theme, toggleTheme, cartCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();

  const logoSrc = theme === 'dark' 
    ? 'https://horizons-cdn.hostinger.com/bc06efbd-7af1-4aef-ab8d-7496cb3e9923/565732aa7ab9927e2f0ed41bfd9ccb93.png'
    : 'https://horizons-cdn.hostinger.com/bc06efbd-7af1-4aef-ab8d-7496cb3e9923/3e9433c81d784bc8c066233f23219e3d.png';

  const menuItems = [
    { label: t('nav_courses'), page: 'courses' },
    { label: t('nav_publications'), page: 'publications' },
    { label: t('nav_events'), page: 'events' },
    { label: t('nav_media'), page: 'media' },
    { label: t('nav_about'), page: 'about' },
    { label: t('nav_contact'), page: 'contact' },
  ];
  
  const mobileMenuItems = [
    { label: t('nav_home'), page: 'home' },
    ...menuItems
  ];
  
  const toggleLanguage = () => {
    const newLang = language === 'tr' ? 'en' : 'tr';
    setLanguage(newLang);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigateTo('home')}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img 
                src={logoSrc} 
                alt="Hukuk Akademisi Logo" 
                className="h-10 w-auto"
              />
            </button>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" onClick={() => navigateTo('cart')} className="rounded-full relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {cartCount}
                    </span>
                )}
            </Button>
            
            <Button variant="ghost" size="icon" onClick={toggleLanguage} className="rounded-full w-10">
              <span className="text-sm font-semibold">{language.toUpperCase()}</span>
            </Button>

            {currentUser ? (
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (currentUser.role === 'student') navigateTo('student-dashboard');
                    else if (currentUser.role === 'coordinator') navigateTo('coordinator-dashboard');
                  }}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm">{currentUser.name}</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={onLogout} className="rounded-full">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center">
                <Button onClick={() => navigateTo('login')} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                  {t('login_button')}
                </Button>
              </div>
            )}

            <div className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/40 bg-background"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {mobileMenuItems.map((item) => (
                <button key={item.page} onClick={() => { navigateTo(item.page); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                  {item.label}
                </button>
              ))}
              
              {currentUser ? (
                <>
                  <button onClick={() => {
                      if (currentUser.role === 'student') navigateTo('student-dashboard');
                      else if (currentUser.role === 'coordinator') navigateTo('coordinator-dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  >
                    {t('dashboard')}
                  </button>
                  <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm font-medium text-destructive hover:bg-accent rounded-lg transition-colors">
                    {t('logout_button')}
                  </button>
                </>
              ) : (
                <Button onClick={() => { navigateTo('login'); setMobileMenuOpen(false); }} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                  {t('login_button')}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;