import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import StudentDashboard from '@/pages/StudentDashboard';
import CoordinatorDashboard from '@/pages/CoordinatorDashboard';
import CourseViewPage from '@/pages/CourseViewPage';
import PublicationsPage from '@/pages/PublicationsPage';
import PublicationDetailPage from '@/pages/PublicationDetailPage';
import EventsPage from '@/pages/EventsPage';
import CartPage from '@/pages/CartPage';
import MediaPage from '@/pages/MediaPage';
import ClarificationTextPage from '@/pages/ClarificationTextPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import MembershipAgreementPage from '@/pages/MembershipAgreementPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }

    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    if (user.role === 'student') {
      setCurrentPage('student-dashboard');
    } else if (user.role === 'coordinator') {
      setCurrentPage('coordinator-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navigateTo = (page, itemId = null) => {
    setCurrentPage(page);
    setSelectedItemId(itemId);
    window.scrollTo(0, 0);
  };
  
  const addToCart = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };
  
  const removeFromCart = (itemId) => {
      const newCart = cart.filter(item => item.id !== itemId);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'courses':
        return <CoursesPage navigateTo={navigateTo} />;
      case 'course-detail':
        return <CourseDetailPage courseId={selectedItemId} navigateTo={navigateTo} currentUser={currentUser} addToCart={addToCart} />;
      case 'about':
        return <AboutPage navigateTo={navigateTo} />;
      case 'contact':
        return <ContactPage navigateTo={navigateTo} />;
      case 'login':
        return <LoginPage navigateTo={navigateTo} onLogin={handleLogin} />;
      case 'register':
        return <RegisterPage navigateTo={navigateTo} />;
      case 'student-dashboard':
        return <StudentDashboard currentUser={currentUser} navigateTo={navigateTo} />;
      case 'coordinator-dashboard':
        return <CoordinatorDashboard navigateTo={navigateTo} />;
      case 'course-view':
        return <CourseViewPage courseId={selectedItemId} currentUser={currentUser} navigateTo={navigateTo} />;
      case 'publications':
        return <PublicationsPage navigateTo={navigateTo} />;
      case 'publication-detail':
        return <PublicationDetailPage publicationId={selectedItemId} navigateTo={navigateTo} addToCart={addToCart} />;
      case 'events':
        return <EventsPage navigateTo={navigateTo} />;
      case 'cart':
        return <CartPage cart={cart} removeFromCart={removeFromCart} navigateTo={navigateTo} />;
      case 'media':
        return <MediaPage navigateTo={navigateTo} />;
      case 'clarification-text':
        return <ClarificationTextPage navigateTo={navigateTo} />;
      case 'terms-of-service':
        return <TermsOfServicePage navigateTo={navigateTo} />;
      case 'privacy-policy':
        return <PrivacyPolicyPage navigateTo={navigateTo} />;
      case 'membership-agreement':
        return <MembershipAgreementPage navigateTo={navigateTo} />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Hukuk Akademisi - Online Hukuk Eğitimleri ve Yayıncılık</title>
        <meta name="description" content="Profesyonel hukuk eğitimleri, yayınlar ve etkinlikler ile kariyerinizi geliştirin." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background">
        <Header 
          navigateTo={navigateTo} 
          currentUser={currentUser} 
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
          cartCount={cart.length}
        />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer navigateTo={navigateTo} />
        <Toaster />
      </div>
    </>
  );
}

export default App;