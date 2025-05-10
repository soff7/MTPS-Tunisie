
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Search, UserPlus, Pencil, Trash2, UserCheck, UserX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

// Sample user data
const initialUsers = [
  {
    id: "u1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "Administrateur",
    status: "Actif",
    lastActivity: "2023-05-10T09:15:00",
    avatar: "",
  },
  {
    id: "u2",
    name: "Marie Lefèvre",
    email: "marie.lefevre@example.com",
    role: "Rédacteur",
    status: "Actif",
    lastActivity: "2023-05-09T14:30:00",
    avatar: "",
  },
  {
    id: "u3",
    name: "Ahmed Ben Ali",
    email: "ahmed.benali@example.com",
    role: "Éditeur",
    status: "Inactif",
    lastActivity: "2023-04-25T11:45:00",
    avatar: "",
  },
  {
    id: "u4",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    role: "Rédacteur",
    status: "Actif",
    lastActivity: "2023-05-07T16:20:00",
    avatar: "",
  },
  {
    id: "u5",
    name: "Thomas Petit",
    email: "thomas.petit@example.com",
    role: "Éditeur",
    status: "Actif",
    lastActivity: "2023-05-06T10:05:00",
    avatar: "",
  },
  {
    id: "u6",
    name: "Lucie Mercier",
    email: "lucie.mercier@example.com",
    role: "Rédacteur",
    status: "Actif",
    lastActivity: "2023-05-05T13:40:00",
    avatar: "",
  },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [selectedUser, setSelectedUser] = useState<typeof initialUsers[0] | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Rédacteur",
    status: "Actif",
    avatar: "",
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
  
  const handleAddUser = () => {
    const user = {
      ...newUser,
      id: `u${Math.random().toString(36).substring(2, 9)}`,
      lastActivity: new Date().toISOString(),
    };
    setUsers([...users, user]);
    toast.success(`L'utilisateur ${user.name} a été ajouté avec succès`);
    setIsAddUserOpen(false);
    setNewUser({
      name: "",
      email: "",
      role: "Rédacteur",
      status: "Actif",
      avatar: "",
    });
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    setUsers(
      users.map((user) =>
        user.id === selectedUser.id ? { ...selectedUser } : user
      )
    );
    toast.success(`L'utilisateur ${selectedUser.name} a été modifié avec succès`);
    setIsEditUserOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    toast.success(`L'utilisateur ${selectedUser.name} a été supprimé avec succès`);
    setIsDeleteUserOpen(false);
    setSelectedUser(null);
  };

  const handleStatusChange = (id: string, status: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status } : user
      )
    );
    const user = users.find((u) => u.id === id);
    if (user) {
      toast.success(`Le statut de ${user.name} est maintenant ${status}`);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (currentTab === "all") return matchesSearch;
    if (currentTab === "active") return matchesSearch && user.status === "Actif";
    if (currentTab === "inactive") return matchesSearch && user.status === "Inactif";
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Utilisateurs</h2>
          <p className="text-muted-foreground">
            Gérez les comptes utilisateurs et leurs permissions
          </p>
        </div>
        
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="transition-all hover:scale-105">
              <UserPlus className="mr-2 h-4 w-4" /> Ajouter un utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour créer un nouveau compte utilisateur.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="col-span-3"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Rôle
                </Label>
                <Select 
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrateur">Administrateur</SelectItem>
                    <SelectItem value="Éditeur">Éditeur</SelectItem>
                    <SelectItem value="Rédacteur">Rédacteur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Statut
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch
                    id="status"
                    checked={newUser.status === "Actif"}
                    onCheckedChange={(checked) =>
                      setNewUser({
                        ...newUser,
                        status: checked ? "Actif" : "Inactif",
                      })
                    }
                  />
                  <Label htmlFor="status" className="cursor-pointer">
                    {newUser.status}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddUser} disabled={!newUser.name || !newUser.email}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="transition-all hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Liste des utilisateurs</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un utilisateur..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Tabs defaultValue="all" className="w-full mt-4" onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-[400px]">
              <TabsTrigger value="all" className="transition-all">
                Tous ({users.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="transition-all">
                Actifs ({users.filter(u => u.status === "Actif").length})
              </TabsTrigger>
              <TabsTrigger value="inactive" className="transition-all">
                Inactifs ({users.filter(u => u.status === "Inactif").length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <UserX className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Aucun utilisateur trouvé</h3>
              <p className="text-muted-foreground">
                Aucun utilisateur ne correspond à votre recherche.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernière activité</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow 
                      key={user.id}
                      className="transition-colors hover:bg-secondary/30 group"
                    >
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "Administrateur" ? "default" : "outline"}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="cursor-pointer transition-all"
                          variant={user.status === "Actif" ? "success" : "secondary"}
                          onClick={() => handleStatusChange(
                            user.id,
                            user.status === "Actif" ? "Inactif" : "Actif"
                          )}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.lastActivity)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="transition-all opacity-70 group-hover:opacity-100 hover:bg-primary/20"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsEditUserOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="transition-all opacity-70 group-hover:opacity-100 hover:bg-destructive/20"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDeleteUserOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'utilisateur.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="edit-name"
                  className="col-span-3"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  className="col-span-3"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Rôle
                </Label>
                <Select 
                  value={selectedUser.role}
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrateur">Administrateur</SelectItem>
                    <SelectItem value="Éditeur">Éditeur</SelectItem>
                    <SelectItem value="Rédacteur">Rédacteur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Statut
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch
                    id="edit-status"
                    checked={selectedUser.status === "Actif"}
                    onCheckedChange={(checked) =>
                      setSelectedUser({
                        ...selectedUser,
                        status: checked ? "Actif" : "Inactif",
                      })
                    }
                  />
                  <Label htmlFor="edit-status" className="cursor-pointer">
                    {selectedUser.status}
                  </Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleEditUser}
              disabled={!selectedUser || !selectedUser.name || !selectedUser.email}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-destructive">Supprimer l'utilisateur</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4 bg-destructive/5 rounded-lg p-3">
              <p className="text-center font-medium">{selectedUser.name}</p>
              <p className="text-center text-sm text-muted-foreground">{selectedUser.email}</p>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteUserOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
