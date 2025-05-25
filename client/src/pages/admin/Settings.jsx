// client/src/pages/admin/Settings.jsx
import React, { useState, useEffect } from 'react';
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
  FaServer
} from 'react-icons/fa';
import '../../styles/admin/Settings.css';

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
      sessionTimeout: 60,
      loginAttempts: 5,
      passwordExpiry: 90
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
      // Simulation de sauvegarde
      console.log(`Sauvegarde des paramètres ${section}:`, settings[section]);
      
      // Simuler un délai de réseau
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

  return (
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
                    {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
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
                <p>Configurez les options de sécurité du système</p>
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
                        Authentification à deux facteurs
                      </label>
                      <small>Recommandé pour une sécurité renforcée</small>
                    </div>

                    <div className="form-group">
                      <label>Délai d'expiration de session (minutes)</label>
                      <select
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                        className="form-select"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 heure</option>
                        <option value={120}>2 heures</option>
                        <option value={480}>8 heures</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Tentatives de connexion maximales</label>
                      <select
                        value={settings.security.loginAttempts}
                        onChange={(e) => handleInputChange('security', 'loginAttempts', parseInt(e.target.value))}
                        className="form-select"
                      >
                        <option value={3}>3 tentatives</option>
                        <option value={5}>5 tentatives</option>
                        <option value={10}>10 tentatives</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Expiration du mot de passe (jours)</label>
                      <select
                        value={settings.security.passwordExpiry}
                        onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
                        className="form-select"
                      >
                        <option value={30}>30 jours</option>
                        <option value={60}>60 jours</option>
                        <option value={90}>90 jours</option>
                        <option value={180}>180 jours</option>
                        <option value={0}>Jamais</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    onClick={() => saveSettings('security')}
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
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
                <p>Configuration générale du système</p>
              </div>

              <div className="settings-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Langue par défaut</label>
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
                      <option value="Africa/Tunis">Africa/Tunis (GMT+1)</option>
                      <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                      <option value="UTC">UTC (GMT+0)</option>
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
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Devise</label>
                    <select
                      value={settings.system.currency}
                      onChange={(e) => handleInputChange('system', 'currency', e.target.value)}
                      className="form-select"
                    >
                      <option value="TND">Dinar Tunisien (TND)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="USD">Dollar US (USD)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Fréquence de sauvegarde automatique</label>
                  <select
                    value={settings.system.backupFrequency}
                    onChange={(e) => handleInputChange('system', 'backupFrequency', e.target.value)}
                    className="form-select"
                  >
                    <option value="hourly">Toutes les heures</option>
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                    <option value="monthly">Mensuelle</option>
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
                  <small>Active le mode maintenance pour le site public</small>
                </div>

                <div className="form-actions">
                  <button
                    onClick={() => saveSettings('system')}
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
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
                <p>Sauvegarde, export et gestion des données</p>
              </div>

              <div className="settings-form">
                <div className="data-groups">
                  <div className="data-group">
                    <h3>Sauvegarde</h3>
                    <p>Créez une sauvegarde complète de vos données</p>
                    
                    <div className="data-actions">
                      <button
                        onClick={createBackup}
                        className="btn btn-secondary"
                        disabled={isLoading}
                      >
                        <FaDownload />
                        {isLoading ? 'Création en cours...' : 'Créer une sauvegarde'}
                      </button>
                    </div>

                    <div className="backup-info">
                      <small>
                        <strong>Dernière sauvegarde:</strong> 25/05/2025 à 14:30<br/>
                        <strong>Taille:</strong> 145 MB<br/>
                        <strong>Statut:</strong> <span className="status-success">Réussie</span>
                      </small>
                    </div>
                  </div>

                  <div className="data-group">
                    <h3>Export de données</h3>
                    <p>Exportez vos données au format CSV ou JSON</p>
                    
                    <div className="export-options">
                      <div className="export-item">
                        <span>Contacts et messages</span>
                        <button
                          onClick={exportData}
                          className="btn btn-sm btn-outline"
                          disabled={isLoading}
                        >
                          <FaDownload /> Exporter
                        </button>
                      </div>
                      
                      <div className="export-item">
                        <span>Produits et catalogue</span>
                        <button
                          onClick={exportData}
                          className="btn btn-sm btn-outline"
                          disabled={isLoading}
                        >
                          <FaDownload /> Exporter
                        </button>
                      </div>
                      
                      <div className="export-item">
                        <span>Utilisateurs</span>
                        <button
                          onClick={exportData}
                          className="btn btn-sm btn-outline"
                          disabled={isLoading}
                        >
                          <FaDownload /> Exporter
                        </button>
                      </div>
                      
                      <div className="export-item">
                        <span>Données analytiques</span>
                        <button
                          onClick={exportData}
                          className="btn btn-sm btn-outline"
                          disabled={isLoading}
                        >
                          <FaDownload /> Exporter
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="data-group">
                    <h3>Import de données</h3>
                    <p>Importez des données depuis un fichier CSV</p>
                    
                    <div className="import-section">
                      <input
                        type="file"
                        accept=".csv,.json"
                        className="file-input"
                        id="import-file"
                      />
                      <label htmlFor="import-file" className="file-label">
                        <FaUpload /> Choisir un fichier
                      </label>
                      <button className="btn btn-secondary" disabled={isLoading}>
                        Importer
                      </button>
                    </div>
                  </div>

                  <div className="data-group danger-zone">
                    <h3>Zone de danger</h3>
                    <p>Actions irréversibles - utilisez avec précaution</p>
                    
                    <div className="danger-actions">
                      <button className="btn btn-danger" disabled={isLoading}>
                        <FaTrash /> Supprimer tous les contacts
                      </button>
                      
                      <button className="btn btn-danger" disabled={isLoading}>
                        <FaTrash /> Réinitialiser les données
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;