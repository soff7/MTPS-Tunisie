
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function Settings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Admin Dashboard",
    siteDescription: "Tableau de bord d'administration pour la gestion des produits et services",
    supportEmail: "support@example.com",
    allowRegistration: true,
    maintenanceMode: false,
  });

  const [userSettings, setUserSettings] = useState({
    accountName: "Admin",
    accountEmail: "admin@mtps.tn",
    password: "",
    confirmPassword: "",
    receiveNotifications: true,
    twoFactorEnabled: false,
  });

  const handleSaveGeneralSettings = () => {
    toast.success("Paramètres généraux enregistrés avec succès");
  };

  const handleSaveAccountSettings = () => {
    if (userSettings.password && userSettings.password !== userSettings.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    toast.success("Paramètres du compte enregistrés avec succès");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
        <p className="text-muted-foreground">
          Gérez les paramètres de votre tableau de bord
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="account">Compte</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>
                Configurez les paramètres généraux de votre plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nom du site</Label>
                <Input 
                  id="site-name" 
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Description du site</Label>
                <Textarea 
                  id="site-description" 
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Email de support</Label>
                <Input 
                  id="support-email" 
                  type="email"
                  value={generalSettings.supportEmail}
                  onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                />
              </div>
              <div className="flex items-center justify-between space-y-0 pt-2">
                <Label htmlFor="allow-registration">Permettre les inscriptions</Label>
                <Switch 
                  id="allow-registration" 
                  checked={generalSettings.allowRegistration}
                  onCheckedChange={(checked) => setGeneralSettings({...generalSettings, allowRegistration: checked})}
                />
              </div>
              <div className="flex items-center justify-between space-y-0 pt-2">
                <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                <Switch 
                  id="maintenance-mode" 
                  checked={generalSettings.maintenanceMode}
                  onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneralSettings}>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du compte</CardTitle>
              <CardDescription>
                Gérez les informations de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account-name">Nom</Label>
                <Input 
                  id="account-name" 
                  value={userSettings.accountName}
                  onChange={(e) => setUserSettings({...userSettings, accountName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-email">Email</Label>
                <Input 
                  id="account-email" 
                  type="email"
                  value={userSettings.accountEmail}
                  onChange={(e) => setUserSettings({...userSettings, accountEmail: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Nouveau mot de passe</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={userSettings.password}
                  onChange={(e) => setUserSettings({...userSettings, password: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  value={userSettings.confirmPassword}
                  onChange={(e) => setUserSettings({...userSettings, confirmPassword: e.target.value})}
                />
              </div>
              <div className="flex items-center justify-between space-y-0 pt-2">
                <Label htmlFor="notifications">Recevoir les notifications</Label>
                <Switch 
                  id="notifications" 
                  checked={userSettings.receiveNotifications}
                  onCheckedChange={(checked) => setUserSettings({...userSettings, receiveNotifications: checked})}
                />
              </div>
              <div className="flex items-center justify-between space-y-0 pt-2">
                <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
                <Switch 
                  id="two-factor" 
                  checked={userSettings.twoFactorEnabled}
                  onCheckedChange={(checked) => setUserSettings({...userSettings, twoFactorEnabled: checked})}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAccountSettings}>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
