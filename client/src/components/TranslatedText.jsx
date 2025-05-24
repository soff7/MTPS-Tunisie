// client/src/components/TranslatedText.jsx
import React from 'react';
import { translationService } from '../utils/translations';

class TranslatedText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLanguage: translationService.getCurrentLanguage()
    };
  }

  componentDidMount() {
    // Ajouter un listener pour les changements de langue
    translationService.addListener(this.handleLanguageChange);
  }

  componentWillUnmount() {
    translationService.removeListener(this.handleLanguageChange);
  }

  handleLanguageChange = (newLanguage) => {
    this.setState({ currentLanguage: newLanguage });
  };

  render() {
    const { tKey, params = {}, tag: Tag = 'span', className, children, ...otherProps } = this.props;
    
    // Si tKey est fourni, utiliser la traduction
    const text = tKey ? translationService.t(tKey, params) : children;
    
    return (
      <Tag className={className} {...otherProps}>
        {text}
      </Tag>
    );
  }
}

export default TranslatedText;

// Fonction utilitaire pour utiliser les traductions directement
export const useTranslation = () => {
  return {
    t: (key, params) => translationService.t(key, params),
    currentLanguage: translationService.getCurrentLanguage(),
    setLanguage: (lang) => translationService.setLanguage(lang)
  };
};