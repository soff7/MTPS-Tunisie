
import { Bell, Search, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [notificationsCount, setNotificationsCount] = useState(3);
  const navigate = useNavigate();

  const handleMarkAsRead = () => {
    setNotificationsCount(0);
  };

  return (
    <header className="flex h-16 items-center justify-between border-b px-6 transition-all duration-300 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-4 lg:gap-6">
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden transition-all hover:scale-110"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="w-56 bg-background pl-8 md:w-80 transition-all duration-300 focus:ring-2 focus:ring-primary focus:w-64"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative transition-all hover:scale-110">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {notificationsCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground transition-all animate-pulse">
                  {notificationsCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {notificationsCount > 0 && (
                <Button variant="ghost" size="sm" onClick={handleMarkAsRead} className="h-8 text-xs">
                  Tout marquer comme lu
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notificationsCount > 0 ? (
              <>
                <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 p-3">
                  <p className="font-medium">Nouveau message reçu</p>
                  <p className="text-xs text-muted-foreground">Il y a 10 minutes</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 p-3">
                  <p className="font-medium">Nouvel utilisateur inscrit</p>
                  <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 p-3">
                  <p className="font-medium">Maintenance système prévue</p>
                  <p className="text-xs text-muted-foreground">Demain à 03:00</p>
                </DropdownMenuItem>
              </>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                Aucune nouvelle notification
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer transition-all hover:ring-2 hover:ring-primary">
              <AvatarImage src="/placeholder.svg" alt="Avatar" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/settings")}>
              Paramètres
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive" onClick={() => navigate("/login")}>
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
