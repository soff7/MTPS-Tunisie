
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Demo login - in a real app this would be an actual authentication
      if (email === "admin@mtps.tn" && password === "password") {
        // Simulating network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Connexion réussie");
        navigate("/dashboard");
      } else {
        throw new Error("Identifiants invalides");
      }
    } catch (error) {
      toast.error("Échec de la connexion. Veuillez vérifier vos identifiants.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Darker gradient background */}
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-br from-[#050c1d] via-[#0c1633] to-[#101c39]"
        style={{willChange: "transform"}}
      />
      
      {/* Enhanced animated orbs with darker manufacturing colors */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-manufacturing-primary/20 animate-pulse-slow" 
             style={{filter: "blur(100px)", willChange: "transform"}}></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-manufacturing-secondary/20 animate-pulse-slow animation-delay-400" 
             style={{filter: "blur(90px)", willChange: "transform"}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-manufacturing-accent/20 animate-pulse-slow animation-delay-200" 
             style={{filter: "blur(85px)", willChange: "transform"}}></div>
      </div>
      
      {/* Improved grid pattern overlay with animation */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-grid opacity-5"></div>
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Enhanced animated lines with manufacturing colors */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-manufacturing-primary/40 to-transparent animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-manufacturing-accent/40 to-transparent animate-pulse-slow animation-delay-200"></div>
        <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-transparent via-manufacturing-primary/40 to-transparent animate-pulse-slow animation-delay-400"></div>
        <div className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-transparent via-manufacturing-accent/40 to-transparent animate-pulse-slow animation-delay-600"></div>
      </div>
      
      {/* Login card with darker glassmorphism that matches dashboard */}
      <div className="w-full max-w-md space-y-6 z-10 animate-fade-in">
        <div className="rounded-xl bg-black/40 p-8 backdrop-blur-xl shadow-xl border border-white/5 transition-all duration-500 hover:shadow-manufacturing-primary/20 hover:border-white/10">
          <div className="text-center mb-8 space-y-2 animate-scale-up" style={{animationDuration: "600ms"}}>
            <div className="w-24 h-24 mx-auto mb-4 relative animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-manufacturing-primary/70 to-manufacturing-accent/70 animate-pulse-slow"></div>
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#050c1d] via-[#0c1633] to-background/90 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">MTPS</span>
              </div>
            </div>
            
            
            <p className="text-gray-400">
              Entrez vos identifiants pour accéder au tableau de bord
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5 stagger-animation">
            <div className="space-y-2 group animate-fade-in" style={{animationDelay: "200ms"}}>
              <label htmlFor="email" className="text-sm font-medium text-white/80 group-focus-within:text-manufacturing-primary transition-colors">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="votre-email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/5 backdrop-blur-sm focus:border-manufacturing-primary/50 input-glow text-white transition-all duration-300"
              />
            </div>
            
            <div className="space-y-2 group animate-fade-in" style={{animationDelay: "300ms"}}>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-white/80 group-focus-within:text-manufacturing-primary transition-colors">
                  Mot de passe
                </label>
                <a href="#" className="text-sm font-medium text-manufacturing-primary hover:text-manufacturing-accent transition-colors">
                  Mot de passe oublié?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/5 backdrop-blur-sm focus:border-manufacturing-primary/50 input-glow text-white transition-all duration-300"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-manufacturing-primary to-manufacturing-secondary hover:from-manufacturing-primary/80 hover:to-manufacturing-secondary/80 text-white font-medium transition-all shadow-lg hover:shadow-manufacturing-primary/20 animate-fade-in"
              disabled={loading}
              size="lg"
              style={{animationDelay: "400ms"}}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>
          
          <div className="mt-6 text-center animate-fade-in" style={{animationDelay: "500ms"}}>
            <p className="text-white/50 text-sm mb-4">Ou continuer avec</p>
            <Button 
              variant="outline" 
              className="w-full border border-white/5 bg-white/5 hover:bg-white/10 text-white transition-all duration-300"
              type="button"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="mr-2 h-4 w-4" />
              Se connecter avec Google
            </Button>
          </div>
          
          <div className="mt-6 text-center text-sm animate-fade-in" style={{animationDelay: "600ms"}}>
            <p className="font-medium text-manufacturing-primary">admin@mtps.tn / password</p>
          </div>
          
          
        </div>
        
        {/* Brand logo with enhanced animation */}
        <div className="text-center animate-fade-in" style={{animationDelay: "800ms"}}>
          <div className="inline-flex items-center justify-center space-x-2 mb-2">
            <span className="h-0.5 w-8 bg-manufacturing-primary/30 rounded-full"></span>
            <span className="text-white/60 font-medium">TP Manufacturing</span>
            <span className="h-0.5 w-8 bg-manufacturing-primary/30 rounded-full"></span>
          </div>
          <p className="text-white/30 text-xs">© 2025 Tubes Plastiques Manufacturing</p>
        </div>
      </div>
    </div>
  );
}
