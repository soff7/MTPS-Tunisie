// Valeurs de base pour les couleurs
// Exportation individuelle des couleurs pour compatibilité avec le dashboard

// Palette de gris
export const gray = {
  100: '#f5f5f5',  // Très clair
  200: '#e0e0e0',
  300: '#a0a0a0',
  400: '#808080',  // --secondary-gray
  500: '#666666',
  600: '#444444',
  700: '#333333',
  800: '#222222',
  900: '#0a0a0a'   // Très foncé
};

// Palette de bleu (marque)
export const brand = {
  100: '#d1f3ff',
  200: '#a4e7ff',
  300: '#6fdaff',
  400: '#35c8fa',  // --primary-blue
  500: '#22a6d3',  // --primary-dark
  600: '#1a85a8',
  700: '#12648e',
  800: '#0a4264',
  900: '#052a3f'
};

// Autres couleurs
export const success = '#27ae60';  // --success-color
export const warning = '#f39c12';  // --warning-color
export const error = '#e74c3c';    // --danger-color

// Exporter également l'objet themePrimitives pour maintenir la compatibilité
export const themePrimitives = {
  // Couleurs primaires
  blue400: brand[400],
  blue300: brand[300],
  blue500: brand[500],
  
  // Tons de gris
  gray400: gray[400],
  gray300: gray[300],
  gray500: gray[500],
  
  // Arrière-plans
  darkBg: gray[900],
  cardBg: '#2a2a2a',
  
  // Texte
  lightText: gray[100],
  
  // États
  success,
  warning,
  error
};