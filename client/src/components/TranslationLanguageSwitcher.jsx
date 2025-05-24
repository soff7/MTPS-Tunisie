// client/src/components/TranslationLanguageSwitcher.jsx
import React from 'react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { translationService } from '../utils/translations';
import '../styles/SimpleLanguageSwitcher.css';

const languages = [
  {
    code: 'fr',
    name: 'Français',
    nativeName: 'Français'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English'
  },
  {
    code: 'ar',
    name: 'العربية',
    nativeName: 'العربية'
  }
];

class TranslationLanguageSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currentLanguage: translationService.getCurrentLanguage()
    };
    this.dropdownRef = React.createRef();
  }

  componentDidMount() {
    // Appliquer la langue sauvegardée
    translationService.applyLanguageToDocument(this.state.currentLanguage);
    
    // Ajouter un listener pour les changements de langue
    translationService.addListener(this.handleLanguageChange);
    
    // Ajouter un listener pour fermer le dropdown en cliquant à l'extérieur
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    translationService.removeListener(this.handleLanguageChange);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleLanguageChange = (newLanguage) => {
    this.setState({ currentLanguage: newLanguage });
    
    // Forcer le re-render de tous les composants qui utilisent les traductions
    if (this.props.onLanguageChange) {
      this.props.onLanguageChange(newLanguage);
    }
    
    // Optionnel : recharger la page pour appliquer toutes les traductions
    // window.location.reload();
  };

  handleClickOutside = (event) => {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  };

  toggleDropdown = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  selectLanguage = (languageCode) => {
    this.setState({ isOpen: false });
    translationService.setLanguage(languageCode);
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

export default TranslationLanguageSwitcher;