import React, { useState } from 'react';
import {
  FaCog,
  FaUser,
  FaEnvelope,
  FaGlobe,
  FaShieldAlt,
  FaDatabase,
  FaDownload,
  FaUpload,
  FaTrash,
  FaCheck,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaBell,
  FaPalette,
  FaServer,
  FaFileCsv, // Add this line
  FaFileExcel, // Add this line
  FaCloudUploadAlt, // Add this line
  FaRedo // Add this line
} from 'react-icons/fa';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: 'Administrateur MTPS',
      email: 'admin@mtps.tn',
      role: 'admin',
      avatar: '',
      phone: '+216 70 000 000',
      location: 'Tunis, Tunisie'
    },
    company: {
      name: 'MTPS - Manufacture de Tubes Plastiques et Services',
      email: 'contact@mtps.tn',
      phone: '+216 70 000 000',
      address: 'Zone Industrielle, Rue de l\'Industrie, Tunisie',
      website: 'https://mtps-tunisie.com',
      description: 'Leader dans la fabrication de tubes plastiques industriels depuis plus de 20 ans.'
    },
    notifications: {
      emailNotifications: true,
      newContacts: true,
      productUpdates: false,
      systemAlerts: true,
      weeklyReports: true,
      monthlyReports: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 60, // minutes
      loginAttempts: 5,
      passwordExpiry: 90 // days
    },
    system: {
      language: 'fr',
      timezone: 'Africa/Tunis',
      dateFormat: 'DD/MM/YYYY',
      currency: 'TND',
      backupFrequency: 'daily',
      maintenanceMode: false
    }
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveSettings = async (section) => {
    setIsLoading(true);
    try {
      console.log(`Sauvegarde des paramètres ${section}:`, settings[section]);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Paramètres sauvegardés avec succès!');
    } catch (err) {
      console.error('Erreur sauvegarde:', err);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    if (passwords.newPassword.length < 6) {
      alert('Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Changement de mot de passe...');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      alert('Mot de passe modifié avec succès!');
    } catch (err) {
      console.error('Erreur changement mot de passe:', err);
      alert('Erreur lors du changement de mot de passe');
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = async () => {
    setIsLoading(true);
    try {
      console.log('Export des données...');
      // Simulate data export
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Données exportées avec succès!');
    } catch (err) {
      alert('Erreur lors de l\'export');
    } finally {
      setIsLoading(false);
    }
  };

  const createBackup = async () => {
    setIsLoading(true);
    try {
      console.log('Création de sauvegarde...');
      // Simulate backup creation
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('Sauvegarde créée avec succès!');
    } catch (err) {
      alert('Erreur lors de la création de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: <FaUser /> },
    { id: 'company', label: 'Entreprise', icon: <FaGlobe /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'security', label: 'Sécurité', icon: <FaShieldAlt /> },
    { id: 'system', label: 'Système', icon: <FaServer /> },
    { id: 'data', label: 'Données', icon: <FaDatabase /> }
  ];

  // Styles CSS intégrés
  const styles = `
    :root {
      --admin-primary: #2563eb;
      --admin-primary-dark: #1d4ed8;
      --admin-text-primary: #1f2937;
      --admin-text-secondary: #6b7280;
      --admin-bg: #f9fafb;
      --admin-card-bg: #ffffff;
      --admin-border: #e5e7eb;
      --admin-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --admin-danger: #ef4444;
    }
    body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      background-color: var(--admin-bg);
      color: var(--admin-text-primary);
    }
    .settings-page {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      box-sizing: border-box;
    }

    .settings-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--admin-border);
    }

    .settings-header h1 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--admin-text-primary);
      margin: 0 0 0.5rem 0;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .settings-header p {
      color: var(--admin-text-secondary);
      font-size: 1rem;
      margin: 0;
    }

    .settings-container {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 2rem;
      align-items: start;
    }

    .settings-sidebar {
      background: var(--admin-card-bg);
      border-radius: 12px;
      box-shadow: var(--admin-shadow-sm);
      border: 1px solid var(--admin-border);
      overflow: hidden;
      position: sticky;
      top: 2rem;
      padding: 1rem;
      box-sizing: border-box;
    }

    .settings-nav {
      padding: 1rem 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      border: none;
      background: none;
      color: var(--admin-text-secondary);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      width: 100%;
      text-align: left;
      border-left: 3px solid transparent;
    }

    .nav-item:hover {
      background: var(--admin-bg);
      color: var(--admin-text-primary);
    }

    .nav-item.active {
      background: rgba(37, 99, 235, 0.05);
      color: var(--admin-primary);
      border-left-color: var(--admin-primary);
      font-weight: 600;
    }

    .nav-item svg {
      font-size: 1rem;
      flex-shrink: 0;
    }

    .settings-content {
      background: var(--admin-card-bg);
      border-radius: 12px;
      box-shadow: var(--admin-shadow-sm);
      border: 1px solid var(--admin-border);
      min-height: 600px;
      padding: 2rem;
      box-sizing: border-box;
    }

    .settings-section {
      padding: 0rem; /* Adjusted from 2rem to 0 for better internal spacing with section-header */
    }

    .section-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--admin-border);
    }

    .section-header h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--admin-text-primary);
      margin: 0 0 0.5rem 0;
    }

    .section-header p {
      color: var(--admin-text-secondary);
      margin: 0;
    }

    .settings-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--admin-text-primary);
    }

    .form-group small {
      font-size: 0.75rem;
      color: var(--admin-text-secondary);
      margin-top: 0.25rem;
    }

    .form-input,
    .form-select,
    .form-textarea {
      padding: 0.75rem;
      border: 1px solid var(--admin-border);
      border-radius: 6px;
      font-size: 0.875rem;
      background: var(--admin-card-bg);
      color: var(--admin-text-primary);
      transition: all 0.2s ease;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
      outline: none;
      border-color: var(--admin-primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .form-input:disabled {
      background: var(--admin-bg);
      color: var(--admin-text-secondary);
      cursor: not-allowed;
    }

    .form-textarea {
      resize: vertical;
      min-height: 80px;
    }

    .form-select {
      cursor: pointer;
    }

    .password-input {
      position: relative;
      display: flex;
      align-items: center;
    }

    .password-input input {
      padding-right: 3rem;
      flex: 1;
    }

    .password-toggle {
      position: absolute;
      right: 0.75rem;
      background: none;
      border: none;
      color: var(--admin-text-secondary);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .password-toggle:hover {
      color: var(--admin-primary);
      background: rgba(37, 99, 235, 0.05);
    }

    .section-divider {
      height: 1px;
      background: var(--admin-border);
      margin: 2rem 0;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--admin-border);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background: var(--admin-primary);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: var(--admin-primary-dark);
    }

    .btn-secondary {
      background: var(--admin-bg);
      color: var(--admin-text-primary);
      border: 1px solid var(--admin-border);
    }

    .btn-secondary:hover:not(:disabled) {
      background: var(--admin-border);
    }

    .btn-danger {
      background: var(--admin-danger);
      color: white;
    }

    .btn-danger:hover:not(:disabled) {
      background: #dc2626;
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
    }

    .btn-outline {
      background: transparent;
      border: 1px solid var(--admin-border);
      color: var(--admin-text-primary);
    }

    .btn-outline:hover:not(:disabled) {
      background: var(--admin-bg);
    }

    .notification-groups,
    .security-groups,
    .data-groups {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .notification-group h3,
    .security-group h3 {
      color: var(--admin-text-primary);
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    .switch-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .switch-label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      font-size: 0.875rem;
      color: var(--admin-text-primary);
    }

    .switch-input {
      display: none;
    }

    .switch-slider {
      position: relative;
      width: 44px;
      height: 24px;
      background: var(--admin-border);
      border-radius: 12px;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .switch-slider::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      transition: all 0.2s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .switch-input:checked + .switch-slider {
      background: var(--admin-primary);
    }

    .switch-input:checked + .switch-slider::before {
      transform: translateX(20px);
    }

    .switch-group small {
      color: var(--admin-text-secondary);
      font-size: 0.75rem;
      margin-left: 3.25rem;
    }

    .data-group {
      padding: 1.5rem;
      border: 1px solid var(--admin-border);
      border-radius: 8px;
      background: var(--admin-bg);
    }

    .data-group h3 {
      color: var(--admin-text-primary);
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    .data-group p {
      color: var(--admin-text-secondary);
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }

    .data-actions {
      margin-bottom: 1rem;
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .backup-info {
      padding: 1rem;
      background: var(--admin-card-bg);
      border-radius: 6px;
      border: 1px solid var(--admin-border);
      margin-top: 1rem;
    }

    .backup-info h4 {
      color: var(--admin-text-primary);
      margin: 0 0 0.5rem 0;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .backup-info p {
      color: var(--admin-text-secondary);
      margin: 0;
      font-size: 0.75rem;
    }

    .backup-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .backup-stat {
      text-align: center;
      padding: 0.75rem;
      background: var(--admin-card-bg);
      border-radius: 6px;
      border: 1px solid var(--admin-border);
    }

    .backup-stat .value {
      display: block;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--admin-primary);
      margin-bottom: 0.25rem;
    }

    .backup-stat .label {
      font-size: 0.75rem;
      color: var(--admin-text-secondary);
    }

    .alert {
      padding: 1rem;
      border-radius: 6px;
      margin-bottom: 1rem;
      border: 1px solid;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .alert svg {
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    .alert-info {
      background: rgba(59, 130, 246, 0.1);
      border-color: rgba(59, 130, 246, 0.3);
      color: #1e40af;
    }

    .alert-warning {
      background: rgba(245, 158, 11, 0.1);
      border-color: rgba(245, 158, 11, 0.3);
      color: #92400e;
    }

    .alert-danger {
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.3);
      color: #991b1b;
    }

    .alert-success {
      background: rgba(34, 197, 94, 0.1);
      border-color: rgba(34, 197, 94, 0.3);
      color: #166534;
    }

    .settings-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .settings-list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: var(--admin-card-bg);
      border: 1px solid var(--admin-border);
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .settings-list-item:hover {
      background: var(--admin-bg);
    }

    .settings-list-item .item-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .settings-list-item .item-title {
      font-weight: 500;
      color: var(--admin-text-primary);
      font-size: 0.875rem;
    }

    .settings-list-item .item-description {
      font-size: 0.75rem;
      color: var(--admin-text-secondary);
    }

    .settings-list-item .item-actions {
      display: flex;
      gap: 0.5rem;
    }

    .file-upload {
      border: 2px dashed var(--admin-border);
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      background: var(--admin-bg);
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .file-upload:hover {
      border-color: var(--admin-primary);
      background: rgba(37, 99, 235, 0.05);
    }

    .file-upload.dragover {
      border-color: var(--admin-primary);
      background: rgba(37, 99, 235, 0.1);
    }

    .file-upload-icon {
      font-size: 2rem;
      color: var(--admin-text-secondary);
      margin-bottom: 1rem;
    }

    .file-upload-text {
      color: var(--admin-text-primary);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .file-upload-hint {
      color: var(--admin-text-secondary);
      font-size: 0.875rem;
    }

    .file-upload input[type="file"] {
      display: none;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: var(--admin-bg);
      border-radius: 4px;
      overflow: hidden;
      margin: 1rem 0;
    }

    .progress-fill {
      height: 100%;
      background: var(--admin-primary);
      transition: width 0.3s ease;
      border-radius: 4px;
    }

    @media (max-width: 1024px) {
      .settings-container {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .settings-sidebar {
        position: static;
        order: 2;
      }

      .settings-content {
        order: 1;
      }

      .settings-nav {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.5rem;
        padding: 1rem;
      }

      .nav-item {
        padding: 0.75rem 1rem;
        border-left: none;
        border-bottom: 3px solid transparent;
        text-align: center;
      }

      .nav-item.active {
        border-left: none;
        border-bottom-color: var(--admin-primary);
      }
    }

    @media (max-width: 768px) {
      .settings-page {
        padding: 1rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column;
      }

      .backup-stats {
        grid-template-columns: 1fr;
      }

      .data-actions {
        flex-direction: column;
      }

      .settings-list-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .settings-list-item .item-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }

    @media (max-width: 480px) {
      .settings-section {
        padding: 1rem;
      }

      .settings-nav {
        grid-template-columns: 1fr;
      }

      .section-header h2 {
        font-size: 1.25rem;
      }

      .settings-header h1 {
        font-size: 1.5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="settings-page">
        <div className="settings-header">
          <h1><FaCog /> Paramètres</h1>
          <p>Configuration et gestion du système MTPS</p>
        </div>

        <div className="settings-container">
          <div className="settings-sidebar">
            <nav className="settings-nav">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="settings-content">

            {/* Profil */}
            {activeTab === 'profile' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Profil utilisateur</h2>
                  <p>Gérez vos informations personnelles</p>
                </div>

                <div className="settings-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom complet</label>
                      <input
                        type="text"
                        value={settings.profile.name}
                        onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Adresse email</label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input
                        type="tel"
                        value={settings.profile.phone}
                        onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Localisation</label>
                      <input
                        type="text"
                        value={settings.profile.location}
                        onChange={(e) => handleInputChange('profile', 'location', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Rôle</label>
                    <input
                      type="text"
                      value={settings.profile.role}
                      className="form-input"
                      disabled
                    />
                    <small>Le rôle ne peut être modifié que par un super administrateur</small>
                  </div>

                  <div className="section-divider"></div>

                  <h3>Changer le mot de passe</h3>

                  <div className="form-group">
                    <label>Mot de passe actuel</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwords.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Nouveau mot de passe</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwords.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Confirmer le mot de passe</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwords.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      onClick={changePassword}
                      className="btn btn-secondary"
                      disabled={isLoading}
                    >
                      Changer le mot de passe
                    </button>

                    <button
                      onClick={() => saveSettings('profile')}
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sauvegarde...' : 'Sauvegarder le profil'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Entreprise */}
            {activeTab === 'company' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Informations de l'entreprise</h2>
                  <p>Paramètres généraux de MTPS</p>
                </div>

                <div className="settings-form">
                  <div className="form-group">
                    <label>Nom de l'entreprise</label>
                    <input
                      type="text"
                      value={settings.company.name}
                      onChange={(e) => handleInputChange('company', 'name', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email de contact</label>
                      <input
                        type="email"
                        value={settings.company.email}
                        onChange={(e) => handleInputChange('company', 'email', e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Téléphone</label>
                      <input
                        type="tel"
                        value={settings.company.phone}
                        onChange={(e) => handleInputChange('company', 'phone', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Adresse</label>
                    <textarea
                      value={settings.company.address}
                      onChange={(e) => handleInputChange('company', 'address', e.target.value)}
                      className="form-textarea"
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label>Site web</label>
                    <input
                      type="url"
                      value={settings.company.website}
                      onChange={(e) => handleInputChange('company', 'website', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={settings.company.description}
                      onChange={(e) => handleInputChange('company', 'description', e.target.value)}
                      className="form-textarea"
                      rows="4"
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      onClick={() => saveSettings('company')}
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Paramètres de notification</h2>
                  <p>Configurez vos préférences de notification</p>
                </div>

                <div className="settings-form">
                  <div className="notification-groups">
                    <div className="notification-group">
                      <h3>Notifications par email</h3>

                      <div className="switch-group">
                        <label className="switch-label">
                          <input
                            type="checkbox"
                            checked={settings.notifications.emailNotifications}
                            onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                            className="switch-input"
                          />
                          <span className="switch-slider"></span>
                          Activer les notifications email
                        </label>
                      </div>

                      <div className="switch-group">
                        <label className="switch-label">
                          <input
                            type="checkbox"
                            checked={settings.notifications.newContacts}
                            onChange={(e) => handleInputChange('notifications', 'newContacts', e.target.checked)}
                            className="switch-input"
                          />
                          <span className="switch-slider"></span>
                          Nouveaux messages de contact
                        </label>
                      </div>

                      <div className="switch-group">
                        <label className="switch-label">
                          <input
                            type="checkbox"
                            checked={settings.notifications.productUpdates}
                            onChange={(e) => handleInputChange('notifications', 'productUpdates', e.target.checked)}
                            className="switch-input"
                          />
                          <span className="switch-slider"></span>
                          Mises à jour des produits
                        </label>
                      </div>
                    </div>

                    <div className="notification-group">
                      <h3>Notifications système</h3>

                      <div className="switch-group">
                        <label className="switch-label">
                          <input
                            type="checkbox"
                            checked={settings.notifications.systemAlerts}
                            onChange={(e) => handleInputChange('notifications', 'systemAlerts', e.target.checked)}
                            className="switch-input"
                          />
                          <span className="switch-slider"></span>
                          Alertes système
                        </label>
                      </div>
                    </div>

                    <div className="notification-group">
                      <h3>Rapports automatiques</h3>

                      <div className="switch-group">
                        <label className="switch-label">
                          <input
                            type="checkbox"
                            checked={settings.notifications.weeklyReports}
                            onChange={(e) => handleInputChange('notifications', 'weeklyReports', e.target.checked)}
                            className="switch-input"
                          />
                          <span className="switch-slider"></span>
                          Rapports hebdomadaires
                        </label>
                      </div>

                      <div className="switch-group">
                        <label className="switch-label">
                          <input
                            type="checkbox"
                            checked={settings.notifications.monthlyReports}
                            onChange={(e) => handleInputChange('notifications', 'monthlyReports', e.target.checked)}
                            className="switch-input"
                          />
                          <span className="switch-slider"></span>
                          Rapports mensuels
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      onClick={() => saveSettings('notifications')}
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sauvegarde...' : 'Sauvegarder les notifications'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sécurité */}
            {activeTab === 'security' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Paramètres de sécurité</h2>
                  <p>Gérez les options de sécurité de votre compte et du système</p>
                </div>

                <div className="settings-form">
                  <div className="security-groups">
                    <div className="security-group">
                      <h3>Authentification</h3>
                      <div className="switch-group">
                        <label className="switch-label">
                          <input
                            type="checkbox"
                            checked={settings.security.twoFactorAuth}
                            onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                            className="switch-input"
                          />
                          <span className="switch-slider"></span>
                          Authentification à deux facteurs (2FA)
                        </label>
                        <small>Ajoutez une couche de sécurité supplémentaire à votre compte.</small>
                      </div>
                    </div>

                    <div className="security-group">
                      <h3>Paramètres de session</h3>
                      <div className="form-group">
                        <label>Délai d'expiration de session (minutes)</label>
                        <input
                          type="number"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value) || 0)}
                          className="form-input"
                          min="1"
                        />
                        <small>Déconnecte les utilisateurs après une période d'inactivité spécifiée.</small>
                      </div>
                      <div className="form-group">
                        <label>Tentatives de connexion maximales</label>
                        <input
                          type="number"
                          value={settings.security.loginAttempts}
                          onChange={(e) => handleInputChange('security', 'loginAttempts', parseInt(e.target.value) || 0)}
                          className="form-input"
                          min="1"
                        />
                        <small>Nombre de tentatives de connexion échouées avant le verrouillage du compte.</small>
                      </div>
                      <div className="form-group">
                        <label>Expiration du mot de passe (jours)</label>
                        <input
                          type="number"
                          value={settings.security.passwordExpiry}
                          onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value) || 0)}
                          className="form-input"
                          min="0"
                        />
                        <small>Définissez une durée après laquelle les utilisateurs doivent changer leur mot de passe (0 pour désactiver).</small>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      onClick={() => saveSettings('security')}
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sauvegarde...' : 'Sauvegarder la sécurité'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Système */}
            {activeTab === 'system' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Paramètres système</h2>
                  <p>Configurez les paramètres généraux du système MTPS</p>
                </div>

                <div className="settings-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Langue</label>
                      <select
                        value={settings.system.language}
                        onChange={(e) => handleInputChange('system', 'language', e.target.value)}
                        className="form-select"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Fuseau horaire</label>
                      <select
                        value={settings.system.timezone}
                        onChange={(e) => handleInputChange('system', 'timezone', e.target.value)}
                        className="form-select"
                      >
                        <option value="Africa/Tunis">GMT+1 (Tunis)</option>
                        <option value="Europe/Paris">GMT+2 (Paris)</option>
                        <option value="America/New_York">GMT-4 (New York)</option>
                        {/* Add more timezones as needed */}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Format de date</label>
                      <select
                        value={settings.system.dateFormat}
                        onChange={(e) => handleInputChange('system', 'dateFormat', e.target.value)}
                        className="form-select"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY (ex: 29/05/2025)</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY (ex: 05/29/2025)</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD (ex: 2025-05-29)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Devise</label>
                      <select
                        value={settings.system.currency}
                        onChange={(e) => handleInputChange('system', 'currency', e.target.value)}
                        className="form-select"
                      >
                        <option value="TND">TND (Dinar tunisien)</option>
                        <option value="USD">USD (Dollar américain)</option>
                        <option value="EUR">EUR (Euro)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Fréquence de sauvegarde</label>
                    <select
                      value={settings.system.backupFrequency}
                      onChange={(e) => handleInputChange('system', 'backupFrequency', e.target.value)}
                      className="form-select"
                    >
                      <option value="daily">Quotidienne</option>
                      <option value="weekly">Hebdomadaire</option>
                      <option value="monthly">Mensuelle</option>
                      <option value="manual">Manuelle</option>
                    </select>
                  </div>

                  <div className="switch-group">
                    <label className="switch-label">
                      <input
                        type="checkbox"
                        checked={settings.system.maintenanceMode}
                        onChange={(e) => handleInputChange('system', 'maintenanceMode', e.target.checked)}
                        className="switch-input"
                      />
                      <span className="switch-slider"></span>
                      Mode maintenance
                    </label>
                    <small>Activez le mode maintenance pour empêcher l'accès des utilisateurs pendant la maintenance du système.</small>
                  </div>

                  <div className="form-actions">
                    <button
                      onClick={() => saveSettings('system')}
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sauvegarde...' : 'Sauvegarder le système'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Données */}
            {activeTab === 'data' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Gestion des données</h2>
                  <p>Exportez vos données, gérez les sauvegardes et les restaurations</p>
                </div>

                <div className="data-groups">
                  <div className="data-group">
                    <h3>Exporter les données</h3>
                    <p>Téléchargez une copie de toutes vos données système pour la sauvegarde ou la migration.</p>
                    <div className="data-actions">
                      <button
                        onClick={exportData}
                        className="btn btn-secondary"
                        disabled={isLoading}
                      >
                        <FaDownload /> {isLoading ? 'Exportation...' : 'Exporter les données'}
                      </button>
                      <button className="btn btn-outline" disabled={isLoading}>
                        <FaFileCsv /> Exporter CSV (Coming Soon)
                      </button>
                      <button className="btn btn-outline" disabled={isLoading}>
                        <FaFileExcel /> Exporter Excel (Coming Soon)
                      </button>
                    </div>
                  </div>

                  <div className="data-group">
                    <h3>Sauvegarde du système</h3>
                    <p>Créez une sauvegarde complète de la base de données et des fichiers de votre application.</p>
                    <div className="data-actions">
                      <button
                        onClick={createBackup}
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        <FaCloudUploadAlt /> {isLoading ? 'Création...' : 'Créer une sauvegarde maintenant'}
                      </button>
                      <button className="btn btn-secondary" disabled={isLoading}>
                        <FaRedo /> Restaurer à partir d'une sauvegarde
                      </button>
                      <button className="btn btn-danger" disabled={isLoading}>
                        <FaTrash /> Supprimer les anciennes sauvegardes
                      </button>
                    </div>
                    <div className="backup-info">
                      <h4>Statut de la dernière sauvegarde:</h4>
                      <p>Dernière sauvegarde effectuée le: 28 mai 2025, 14:30 GMT+1</p>
                      <p>Taille de la sauvegarde: 15.2 MB</p>
                    </div>
                    <div className="backup-stats">
                      <div className="backup-stat">
                        <span className="value">7</span>
                        <span className="label">Sauvegardes disponibles</span>
                      </div>
                      <div className="backup-stat">
                        <span className="value">50 GB</span>
                        <span className="label">Espace total utilisé</span>
                      </div>
                    </div>
                  </div>

                  <div className="data-group">
                    <h3>Nettoyage des données</h3>
                    <p>Supprimez les données obsolètes ou inutiles pour optimiser les performances du système.</p>
                    <div className="data-actions">
                      <button className="btn btn-danger" disabled={isLoading}>
                        <FaTrash /> Nettoyer les données temporaires
                      </button>
                      <button className="btn btn-danger" disabled={isLoading}>
                        <FaTrash /> Supprimer les logs anciens
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    onClick={() => saveSettings('data')}
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sauvegarde...' : 'Sauvegarder les préférences de données'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;