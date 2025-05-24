export const showNotification = (message, type = 'info') => {
  // Intégration avec une librairie de notifications comme react-toastify
  console.log(`[${type.toUpperCase()}] ${message}`);
};

export const showSuccess = (message) => showNotification(message, 'success');
export const showError = (message) => showNotification(message, 'error');
export const showWarning = (message) => showNotification(message, 'warning');
export const showInfo = (message) => showNotification(message, 'info');