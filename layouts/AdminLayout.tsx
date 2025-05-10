
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useState, useEffect } from "react";

export default function AdminLayout() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSidebarCompact, setIsSidebarCompact] = useState(false);
  const [isMainContentAnimated, setIsMainContentAnimated] = useState(false);

  useEffect(() => {
    // Create a staged animation effect
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    const contentTimer = setTimeout(() => {
      setIsMainContentAnimated(true);
    }, 300);
    
    return () => {
      clearTimeout(loadTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  // Toggle sidebar compact mode
  const toggleSidebarCompact = () => {
    setIsSidebarCompact(!isSidebarCompact);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-background/95">
      <Sidebar />
      
      <div 
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-500 ease-in-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <Header />
        <main 
          className={`flex-1 overflow-auto p-4 md:p-6 bg-gradient-to-b from-transparent to-background/30 backdrop-blur-sm transition-all duration-500 ${
            isMainContentAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div 
            className="max-w-[1600px] mx-auto animate-fade-in"
            style={{
              animationDelay: '400ms',
              animationDuration: '500ms',
              animationFillMode: 'both'
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
