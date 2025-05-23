// client/src/hooks/useTranslation.js
import { createContext, useContext, useState, useEffect } from 'react';

// Dictionnaire de traductions
const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.products': 'Produits',
    'nav.services': 'Services',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.signin': 'Connexion',
    'nav.signup': 'Inscription',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Déconnexion',
    
    // Hero Section
    'hero.badge': 'Innovation & Qualité',
    'hero.title.line1': 'Solutions plastiques',
    'hero.title.line2': 'pour l\'industrie moderne',
    'hero.description': 'MTPS combine expertise technique et innovation pour fournir des solutions plastiques sur mesure répondant aux exigences les plus strictes de l\'industrie.',
    'hero.btn.products': 'EXPLORER NOS PRODUITS',
    'hero.btn.contact': 'CONTACT RAPIDE',
    'hero.stats.clients': 'Clients satisfaits',
    'hero.stats.products': 'Produits innovants',
    'hero.stats.experience': 'Années d\'expertise',
    'hero.scroll': 'Découvrir',
    
    // Services
    'services.badge': 'EXPERTISE',
    'services.title': 'Nos Services',
    'services.description': 'MTPS propose une gamme complète de services pour répondre à vos besoins en tubes plastiques industriels',
    'services.manufacturing.title': 'Fabrication industrielle',
    'services.manufacturing.description': 'Production de tubes plastiques de haute qualité pour diverses applications industrielles.',
    'services.manufacturing.stat': 'ans d\'expérience',
    'services.custom.title': 'Solutions sur mesure',
    'services.custom.description': 'Conception et fabrication de tubes plastiques selon vos spécifications techniques.',
    'services.custom.stat': 'projets réalisés',
    'services.support.title': 'Support technique',
    'services.support.description': 'Expertise et conseils techniques pour choisir les meilleures solutions pour vos besoins.',
    'services.support.stat': 'assistance',
    'services.discover': 'Découvrir',
    
    // Features
    'features.title': 'Pourquoi choisir MTPS?',
    'features.subtitle': 'Découvrez les caractéristiques qui distinguent nos solutions de tubes plastiques industriels',
    'features.quality.title': 'Qualité garantie',
    'features.quality.description': 'Nos produits répondent aux normes de qualité les plus strictes pour assurer une performance optimale.',
    'features.quality.stat': 'satisfaction',
    'features.eco.title': 'Éco-responsable',
    'features.eco.description': 'Matériaux recyclables et processus de fabrication respectueux de l\'environnement pour un avenir durable.',
    'features.eco.stat': 'recyclable',
    'features.durability.title': 'Durabilité',
    'features.durability.description': 'Tubes résistants conçus pour durer dans les conditions industrielles les plus exigeantes.',
    'features.durability.stat': 'ans de garantie',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.description': 'Notre équipe est à votre disposition pour répondre à toutes vos questions',
    'contact.form.name': 'Nom',
    'contact.form.company': 'Nom de l\'entreprise',
    'contact.form.email': 'Adresse E-mail',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Message',
    'contact.form.send': 'Envoyer le message',
    'contact.info.title': 'Nos Coordonnées',
    'contact.info.address': 'Adresse',
    'contact.info.phone': 'Téléphone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Heures d\'ouverture',
    
    // Footer
    'footer.description': 'Leader dans la fabrication de tubes plastiques industriels avec plus de 15 ans d\'expérience.',
    'footer.navigation': 'Navigation',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur est survenue',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.confirm': 'Confirmer',
    'common.save': 'Enregistrer',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.view': 'Voir',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent'
  },
  
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.services': 'الخدمات',
    'nav.about': 'حولنا',
    'nav.contact': 'اتصل بنا',
    'nav.signin': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    'nav.dashboard': 'لوحة التحكم',
    'nav.logout': 'تسجيل الخروج',
    
    // Hero Section
    'hero.badge': 'الابتكار والجودة',
    'hero.title.line1': 'حلول بلاستيكية',
    'hero.title.line2': 'للصناعة الحديثة',
    'hero.description': 'تجمع شركة MTPS بين الخبرة التقنية والابتكار لتوفير حلول بلاستيكية مخصصة تلبي أصعب متطلبات الصناعة.',
    'hero.btn.products': 'استكشف منتجاتنا',
    'hero.btn.contact': 'اتصال سريع',
    'hero.stats.clients': 'العملاء راضون',
    'hero.stats.products': 'منتجات مبتكرة',
    'hero.stats.experience': 'سنوات من الخبرة',
    'hero.scroll': 'اكتشف',
    
    // Services
    'services.badge': 'الخبرة',
    'services.title': 'خدماتنا',
    'services.description': 'تقدم MTPS مجموعة كاملة من الخدمات لتلبية احتياجاتكم في الأنابيب البلاستيكية الصناعية',
    'services.manufacturing.title': 'التصنيع الصناعي',
    'services.manufacturing.description': 'إنتاج أنابيب بلاستيكية عالية الجودة لمختلف التطبيقات الصناعية.',
    'services.manufacturing.stat': 'سنوات من الخبرة',
    'services.custom.title': 'حلول مخصصة',
    'services.custom.description': 'تصميم وتصنيع أنابيب بلاستيكية وفقاً لمواصفاتكم التقنية.',
    'services.custom.stat': 'مشاريع منجزة',
    'services.support.title': 'الدعم التقني',
    'services.support.description': 'خبرة ونصائح تقنية لاختيار أفضل الحلول لاحتياجاتكم.',
    'services.support.stat': 'مساعدة',
    'services.discover': 'اكتشف',
    
    // Features
    'features.title': 'لماذا تختار MTPS؟',
    'features.subtitle': 'اكتشف الخصائص التي تميز حلولنا للأنابيب البلاستيكية الصناعية',
    'features.quality.title': 'جودة مضمونة',
    'features.quality.description': 'منتجاتنا تلبي أصعب معايير الجودة لضمان الأداء الأمثل.',
    'features.quality.stat': 'رضا',
    'features.eco.title': 'صديق للبيئة',
    'features.eco.description': 'مواد قابلة للتدوير وعمليات تصنيع تحترم البيئة من أجل مستقبل مستدام.',
    'features.eco.stat': 'قابل للتدوير',
    'features.durability.title': 'المتانة',
    'features.durability.description': 'أنابيب مقاومة مصممة للصمود في أصعب الظروف الصناعية.',
    'features.durability.stat': 'سنوات ضمان',
    
    // Contact
    'contact.title': 'اتصل بنا',
    'contact.description': 'فريقنا في خدمتكم للإجابة على جميع أسئلتكم',
    'contact.form.name': 'الاسم',
    'contact.form.company': 'اسم الشركة',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.subject': 'الموضوع',
    'contact.form.message': 'الرسالة',
    'contact.form.send': 'إرسال الرسالة',
    'contact.info.title': 'معلومات الاتصال',
    'contact.info.address': 'العنوان',
    'contact.info.phone': 'الهاتف',
    'contact.info.email': 'البريد الإلكتروني',
    'contact.info.hours': 'ساعات العمل',
    
    // Footer
    'footer.description': 'رائدة في تصنيع الأنابيب البلاستيكية الصناعية مع أكثر من 15 سنة من الخبرة.',
    'footer.navigation': 'التنقل',
    'footer.services': 'الخدمات',
    'footer.contact': 'اتصل بنا',
    'footer.rights': 'جميع الحقوق محفوظة.',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.confirm': 'تأكيد',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق'
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.signin': 'Sign In',
    'nav.signup': 'Sign Up',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    
    // Hero Section
    'hero.badge': 'Innovation & Quality',
    'hero.title.line1': 'Plastic solutions',
    'hero.title.line2': 'for modern industry',
    'hero.description': 'MTPS combines technical expertise and innovation to provide custom plastic solutions that meet the strictest industry requirements.',
    'hero.btn.products': 'EXPLORE OUR PRODUCTS',
    'hero.btn.contact': 'QUICK CONTACT',
    'hero.stats.clients': 'Satisfied clients',
    'hero.stats.products': 'Innovative products',
    'hero.stats.experience': 'Years of expertise',
    'hero.scroll': 'Discover',
    
    // Services
    'services.badge': 'EXPERTISE',
    'services.title': 'Our Services',
    'services.description': 'MTPS offers a complete range of services to meet your industrial plastic pipe needs',
    'services.manufacturing.title': 'Industrial manufacturing',
    'services.manufacturing.description': 'Production of high-quality plastic pipes for various industrial applications.',
    'services.manufacturing.stat': 'years of experience',
    'services.custom.title': 'Custom solutions',
    'services.custom.description': 'Design and manufacture of plastic pipes according to your technical specifications.',
    'services.custom.stat': 'completed projects',
    'services.support.title': 'Technical support',
    'services.support.description': 'Expertise and technical advice to choose the best solutions for your needs.',
    'services.support.stat': 'assistance',
    'services.discover': 'Discover',
    
    // Features
    'features.title': 'Why choose MTPS?',
    'features.subtitle': 'Discover the features that distinguish our industrial plastic pipe solutions',
    'features.quality.title': 'Guaranteed quality',
    'features.quality.description': 'Our products meet the strictest quality standards to ensure optimal performance.',
    'features.quality.stat': 'satisfaction',
    'features.eco.title': 'Eco-friendly',
    'features.eco.description': 'Recyclable materials and environmentally friendly manufacturing processes for a sustainable future.',
    'features.eco.stat': 'recyclable',
    'features.durability.title': 'Durability',
    'features.durability.description': 'Resistant pipes designed to last in the most demanding industrial conditions.',
    'features.durability.stat': 'years warranty',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.description': 'Our team is at your disposal to answer all your questions',
    'contact.form.name': 'Name',
    'contact.form.company': 'Company Name',
    'contact.form.email': 'Email Address',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.info.title': 'Our Contact Information',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Opening Hours',
    
    // Footer
    'footer.description': 'Leader in industrial plastic pipe manufacturing with over 15 years of experience.',
    'footer.navigation': 'Navigation',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous'
  }
};

// Context de traduction
const TranslationContext = createContext();

// Hook personnalisé pour utiliser les traductions
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// Provider de traduction
export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = (key, params = {}) => {
    let translation = translations[currentLanguage]?.[key] || translations['fr'][key] || key;
    
    // Remplacer les paramètres dans la traduction
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
  };

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('language', languageCode);
  };

  const value = {
    t,
    currentLanguage,
    changeLanguage,
    languages: Object.keys(translations)
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};