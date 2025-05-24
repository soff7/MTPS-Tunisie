export const formatCurrency = (amount, currency = 'DT') => {
  return `${amount.toLocaleString()} ${currency}`;
};

export const formatDate = (date, locale = 'fr-FR') => {
  return new Date(date).toLocaleDateString(locale);
};

export const formatDateTime = (date, locale = 'fr-FR') => {
  return new Date(date).toLocaleString(locale);
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
