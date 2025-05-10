import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Simuler une vérification de token pour la démo
        // Dans un environnement réel, vous feriez une requête API
        const userString = localStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          setUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to authenticate token', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Pour la démonstration, simulons une API avec des identifiants fixes
      if (email === "admin@mtps.tn" && password === "password") {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: "1",
          name: "Administrateur",
          email: "admin@mtps.tn",
          role: "admin"
        };
        
        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('userRole', mockUser.role);
        
        setUser(mockUser);
        setIsAuthenticated(true);
        toast.success("Connexion réussie");
        return;
      }
      
      throw new Error("Identifiants invalides");
    } catch (error: any) {
      toast.error(error.message || "Erreur de connexion");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    setUser(null);
    setIsAuthenticated(false);
    toast.info("Déconnexion réussie");
  };

  const isAdmin = !!user && ['admin', 'superadmin', 'manager'].includes(user.role);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      isAuthenticated, 
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;