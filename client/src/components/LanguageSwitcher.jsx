// client/src/components/LanguageSwitcher.jsx - Version mise à jour avec le hook de traduction
import React, { useState, useEffect, useRef } from 'react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useTranslation } from '../hooks/useTranslation';
import '../styles/LanguageSwitcher.css';

const languages = [
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    dir: 'ltr'
  },
  {
    code: 'ar',
    name: 'العربية',
    flag: '🇹🇳',
    dir: 'rtl'
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    dir: 'ltr'
  }
];

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Appliquer la langue sélectionnée
  const applyLanguage = (languageCode) => {
    const language = languages.find(lang => lang.code === languageCode);
    if (language) {
      // Changer la direction du document pour l'arabe
      document.documentElement.setAttribute('dir', language.dir);
      document.documentElement.setAttribute('lang', language.code);
      
      // Ajouter une classe CSS pour le style RTL
      if (language.dir === 'rtl') {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    }
  };

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    applyLanguage(languageCode);
    setIsOpen(false);
  };

  // Appliquer la langue actuelle au chargement
  useEffect(() => {
    applyLanguage(currentLanguage);
  }, [currentLanguage]);

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage);
  };

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Changer de langue"
        aria-expanded={isOpen}
      >
        <FaGlobe className="globe-icon" />
        <span className="current-lang">
          <span className="flag">{getCurrentLanguage()?.flag}</span>
          <span className="lang-code">{currentLanguage.toUpperCase()}</span>
        </span>
        <FaChevronDown className={`chevron-icon ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-option ${currentLanguage === language.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <span className="flag">{language.flag}</span>
              <span className="lang-name">{language.name}</span>
              {currentLanguage === language.code && (
                <span className="checkmark">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;