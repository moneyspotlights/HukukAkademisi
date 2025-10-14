import React from 'react';
const translations = {
  tr: {
    // Header
    nav_home: 'Ana Sayfa',
    nav_courses: 'Eğitimler',
    nav_publications: 'Yayınlar',
    nav_events: 'Etkinlikler',
    nav_about: 'Hakkımızda',
    nav_contact: 'İletişim',
    nav_media: 'Medya',
    login_button: 'Giriş Yap',
    register_button: 'Kayıt Ol',
    cart_button: 'Sepet',
    dashboard: 'Dashboard',
    logout_button: 'Çıkış Yap',

    // Home Page
    home_hero_title1: 'Hukuk Kariyerinizi',
    home_hero_title2: 'Geliştirin',
    home_hero_subtitle: 'Uzman eğitmenlerden online hukuk eğitimleri alın. Kendi hızınızda öğrenin, kariyerinizi ilerletin.',
    home_explore_courses: 'Eğitimleri Keşfet',
    home_why_title: 'Neden Hukuk Akademisi?',
    home_why_subtitle: '2013 yılından bu yana “Deneyimi Geleceğe Taşıyoruz” sloganı ile faaliyetlerine devam eden Hukuk Akademisi...',
    feature1_title: 'Mesleki Öğretim',
    feature1_desc: "Türkiye'nin önde gelen uygulayıcı ve akademisyenlerinin danışmanlığında, mesleki ihtiyaçlara uygun...",
    feature2_title: 'Basılı Yayımcılık',
    feature2_desc: 'Kitap ve dergi yayımcılığında kaliteli, yenilikçi, özgün ve fark yaratan eserlere imza atmayı hedef...',
    feature3_title: 'Medya',
    feature3_desc: 'H+ Digital ile hukukçulara yönelik medya ve eğitim alışkanlıklarını değiştirmeyi, mekan/zaman sınırlaması...',
    home_upcoming_courses_title: 'Yaklaşan Eğitimler',
    home_upcoming_courses_subtitle: 'Kariyerinize yön verecek en yeni ve popüler eğitim programlarımızı keşfedin.',
    home_banner_title: 'Havacılık Hukuku Eğitimi',
    home_banner_subtitle: 'Kayıtlar Başladı!',
    home_publications_title: 'Güncel Yayınlar',
    home_publications_subtitle: 'Alanında uzman yazarlar tarafından kaleme alınmış en son kitap ve dergilerimize göz atın.',

    // Footer
    footer_follow: 'Bizi Takip Edin',
    footer_clarification: 'Aydınlatma Metni',
    footer_terms: 'Kullanım Şartları',
    footer_privacy: 'Gizlilik Politikası',
    footer_membership: 'Üyelik Sözleşmesi',
    footer_subscribe_title: 'Bizden Haberdar Olun!',
    footer_email_placeholder: 'E-posta adresiniz',
    footer_submit: 'Gönder',
    footer_copyright: '© {year} Hukuk Akademisi. Tüm Hakları Saklıdır.',

    // Register Page
    register_title: 'Kayıt Ol',
    register_subtitle: 'Yeni hesap oluşturun',
    register_name_label: 'Ad Soyad',
    register_name_placeholder: 'Adınız Soyadınız',
    register_email_label: 'E-posta',
    register_email_placeholder: 'ornek@email.com',
    register_password_label: 'Şifre',
    register_password_placeholder: '••••••••',
    register_confirm_password_label: 'Şifre Tekrar',
    register_membership_agree: 'Üyelik sözleşmesini okudum ve kabul ediyorum.',
    register_clarification_agree: 'Aydınlatma metnini okudum ve kabul ediyorum.',
    register_have_account: 'Zaten hesabınız var mı?',

    // Legal Pages
    lorem_ipsum_title: 'Lorem Ipsum Dolor Sit Amet',
    lorem_ipsum_p1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    lorem_ipsum_p2: 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat.',
  },
  en: {
    // Header
    nav_home: 'Home',
    nav_courses: 'Courses',
    nav_publications: 'Publications',
    nav_events: 'Events',
    nav_about: 'About Us',
    nav_contact: 'Contact',
    nav_media: 'Media',
    login_button: 'Login',
    register_button: 'Sign Up',
    cart_button: 'Cart',
    dashboard: 'Dashboard',
    logout_button: 'Logout',

    // Home Page
    home_hero_title1: 'Advance Your',
    home_hero_title2: 'Law Career',
    home_hero_subtitle: 'Take online law courses from expert instructors. Learn at your own pace, advance your career.',
    home_explore_courses: 'Explore Courses',
    home_why_title: 'Why Hukuk Akademisi?',
    home_why_subtitle: 'Hukuk Akademisi has been operating since 2013 with the motto "Carrying Experience to the Future"...',
    feature1_title: 'Professional Teaching',
    feature1_desc: 'Under the guidance of Turkey\'s leading practitioners and academics, tailored to professional needs...',
    feature2_title: 'Printed Publishing',
    feature2_desc: 'Aims to create high-quality, innovative, and unique works in book and journal publishing...',
    feature3_title: 'Media',
    feature3_desc: 'With H+ Digital, we aim to change the media and education habits of lawyers, eliminating location/time constraints...',
    home_upcoming_courses_title: 'Upcoming Courses',
    home_upcoming_courses_subtitle: 'Discover our newest and most popular training programs that will shape your career.',
    home_banner_title: 'Aviation Law Training',
    home_banner_subtitle: 'Enrollment has begun!',
    home_publications_title: 'Current Publications',
    home_publications_subtitle: 'Browse our latest books and journals written by expert authors in their fields.',

    // Footer
    footer_follow: 'Follow Us',
    footer_clarification: 'Clarification Text',
    footer_terms: 'Terms of Use',
    footer_privacy: 'Privacy Policy',
    footer_membership: 'Membership Agreement',
    footer_subscribe_title: 'Stay Informed!',
    footer_email_placeholder: 'Your email address',
    footer_submit: 'Submit',
    footer_copyright: '© {year} Hukuk Akademisi. All Rights Reserved.',

    // Register Page
    register_title: 'Sign Up',
    register_subtitle: 'Create a new account',
    register_name_label: 'Full Name',
    register_name_placeholder: 'Your Full Name',
    register_email_label: 'Email',
    register_email_placeholder: 'example@email.com',
    register_password_label: 'Password',
    register_password_placeholder: '••••••••',
    register_confirm_password_label: 'Confirm Password',
    register_membership_agree: 'I have read and agree to the Membership Agreement.',
    register_clarification_agree: 'I have read and agree to the Clarification Text.',
    register_have_account: 'Already have an account?',

    // Legal Pages
    lorem_ipsum_title: 'Lorem Ipsum Dolor Sit Amet',
    lorem_ipsum_p1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    lorem_ipsum_p2: 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat.',
  }
};

const LanguageContext = React.createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = React.useState(localStorage.getItem('language') || 'tr');

  const setLang = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key, replacements = {}) => {
    let translation = (translations[language] && translations[language][key]) || key;
    Object.keys(replacements).forEach(r => {
      translation = translation.replace(`{${r}}`, replacements[r]);
    });
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => React.useContext(LanguageContext);