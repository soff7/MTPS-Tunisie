import React, { useState } from 'react';
import { FaCog, FaUser, FaGlobe, FaBell, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: 'Administrateur MTPS',
      email: 'admin@mtps.tn',
      role: 'admin',
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
    system: {
      language: 'fr',
      timezone: 'Africa/Tunis',
      dateFormat: 'DD/MM/YYYY',
      currency: 'TND'
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

  const tabs = [
    { id: 'profile', label: 'Profil', icon: <FaUser /> },
    { id: 'company', label: 'Entreprise', icon: <FaGlobe /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'system', label: 'Système', icon: <FaCog /> }
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
      font-size: 2.5rem;
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
      border-radius: 16px;
      box-shadow: var(--admin-shadow-sm);
      border: 1px solid var(--admin-border);
      overflow: hidden;
      position: sticky;
      top: 2rem;
      padding: 1.5rem;
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
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
      text-align: left;
      border-left: 4px solid transparent;
      border-radius: 8px;
    }

    .nav-item:hover {
      background: var(--admin-bg);
      color: var(--admin-text-primary);
    }

    .nav-item.active {
      background: rgba(37, 99, 235, 0.1);
      color: var(--admin-primary);
      border-left-color: var(--admin-primary);
      font-weight: 600;
    }

    .nav-item svg {
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .settings-content {
      background: var(--admin-card-bg);
      border-radius: 16px;
      box-shadow: var(--admin-shadow-sm);
      border: 1px solid var(--admin-border);
      min-height: 600px;
      padding: 2rem;
      box-sizing: border-box;
    }

    .settings-section {
      padding: 0;
    }

    .section-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--admin-border);
    }

    .section-header h2 {
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--admin-text-primary);
      margin: 0 0 0.5rem 0;
    }

    .section-header p {
      color: var(--admin-text-secondary);
      margin: 0;
      font-size: 1rem;
    }

    .settings-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--admin-text-primary);
    }

    .form-group small {
      font-size: 0.8rem;
      color: var(--admin-text-secondary);
      margin-top: 0.25rem;
    }

    .form-input,
    .form-select,
    .form-textarea {
      padding: 0.75rem;
      border: 1px solid var(--admin-border);
      border-radius: 8px;
      font-size: 0.95rem;
      background: var(--admin-card-bg);
      color: var(--admin-text-primary);
      transition: all 0.3s ease;
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
      min-height: 100px;
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
      transition: all 0.3s ease;
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
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 500;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
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
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: var(--admin-bg);
      color: var(--admin-text-primary);
      border: 1px solid var(--admin-border);
    }

    .btn-secondary:hover:not(:disabled) {
      background: var(--admin-border);
      transform: translateY(-2px);
    }

    .notification-groups {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .notification-group h3 {
      color: var(--admin-text-primary);
      margin-bottom: 1rem;
      font-size: 1.25rem;
    }

    .switch-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .switch-label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      font-size: 0.95rem;
      color: var(--admin-text-primary);
    }

    .switch-input {
      display: none;
    }

    .switch-slider {
      position: relative;
      width: 48px;
      height: 26px;
      background: var(--admin-border);
      border-radius: 13px;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    .switch-slider::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 22px;
      height: 22px;
      background: white;
      border-radius: 50%;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .switch-input:checked + .switch-slider {
      background: var(--admin-primary);
    }

    .switch-input:checked + .switch-slider::before {
      transform: translateX(22px);
    }

    .switch-group small {
      color: var(--admin-text-secondary);
      font-size: 0.8rem;
      margin-left: 3.5rem;
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
        border-bottom: 4px solid transparent;
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
    }

    @media (max-width: 480px) {
      .settings-section {
        padding: 1rem;
      }

      .settings-nav {
        grid-template-columns: 1fr;
      }

      .section-header h2 {
        font-size: 1.5rem;
      }

      .settings-header h1 {
        font-size: 1.75rem;
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;