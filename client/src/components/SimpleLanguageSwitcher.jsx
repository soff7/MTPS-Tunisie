// client/src/components/SimpleLanguageSwitcher.jsx
import React from 'react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import '../styles/SimpleLanguageSwitcher.css';

const languages = [
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    nativeName: 'Français'
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    nativeName: 'English'
  },
  {
    code: 'ar',
    name: 'العربية',
    flag: '🇹🇳',
    nativeName: 'العربية'
  }
];

class SimpleLanguageSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currentLanguage: 'fr'
    };
    this.dropdownRef = React.createRef();
  }

  componentDidMount() {
    // Récupérer la langue sauvegardée ou utiliser le français par défaut
    const savedLanguage = localStorage.getItem('language') || 'fr';
    this.setState({ currentLanguage: savedLanguage });
    this.applyLanguage(savedLanguage);
    
    // Ajouter un listener pour fermer le dropdown en cliquant à l'extérieur
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  };

  applyLanguage = (languageCode) => {
    const language = languages.find(lang => lang.code === languageCode);
    if (language) {
      // Changer la direction du document pour l'arabe
      const direction = languageCode === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', direction);
      document.documentElement.setAttribute('lang', languageCode);
      
      // Ajouter/supprimer la classe RTL
      if (direction === 'rtl') {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    }
  };

  toggleDropdown = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  selectLanguage = (languageCode) => {
    this.setState({ 
      currentLanguage: languageCode, 
      isOpen: false 
    });
    
    // Sauvegarder la langue sélectionnée
    localStorage.setItem('language', languageCode);
    
    // Appliquer les changements de langue
    this.applyLanguage(languageCode);
    
    // Optionnel : recharger la page pour appliquer toutes les traductions
    // window.location.reload();
  };

  getCurrentLanguage = () => {
    return languages.find(lang => lang.code === this.state.currentLanguage) || languages[0];
  };

  render() {
    const { isOpen, currentLanguage } = this.state;
    const currentLang = this.getCurrentLanguage();

    return (
      <div className="simple-language-switcher" ref={this.dropdownRef}>
        <button
          className="language-button"
          onClick={this.toggleDropdown}
          aria-label="Changer de langue"
          aria-expanded={isOpen}
        >
          <FaGlobe className="globe-icon" />
          <span className="current-lang">
            <span className="flag">{currentLang.flag}</span>
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
                onClick={() => this.selectLanguage(language.code)}
              >
                <span className="flag">{language.flag}</span>
                <span className="lang-name">{language.nativeName}</span>
                {currentLanguage === language.code && (
                  <span className="checkmark">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SimpleLanguageSwitcher;