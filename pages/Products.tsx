
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, Trash2, MoreVertical, Eye, Package, Filter } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

// Sample product data for plastic tube manufacturing
const initialProducts = [
  {
    id: "1",
    name: "Tube PVC 40mm",
    category: "PVC",
    diameter: "40mm",
    length: "6m",
    thickness: "2.5mm",
    inStock: true,
    description: "Tube en PVC de 40mm de diamètre pour applications sanitaires",
    image: "/placeholder.svg",
    status: "Actif",
    price: "12.50",
    material: "PVC",
  },
  {
    id: "2",
    name: "Tube HDPE 63mm",
    category: "HDPE",
    diameter: "63mm",
    length: "6m",
    thickness: "3.8mm",
    inStock: true,
    description: "Tube en polyéthylène haute densité pour distribution d'eau",
    image: "/placeholder.svg",
    status: "Actif",
    price: "28.75",
    material: "HDPE",
  },
  {
    id: "3",
    name: "Tube PP 20mm",
    category: "PP",
    diameter: "20mm",
    length: "4m",
    thickness: "2mm",
    inStock: false,
    description: "Tube en polypropylène pour installations chimiques",
    image: "/placeholder.svg",
    status: "Inactif",
    price: "8.30",
    material: "PP",
  },
  {
    id: "4",
    name: "Tube PEX 16mm",
    category: "PEX",
    diameter: "16mm",
    length: "50m",
    thickness: "1.8mm",
    inStock: true,
    description: "Tube PEX pour chauffage par le sol",
    image: "/placeholder.svg",
    status: "Actif",
    price: "45.20",
    material: "PEX",
  },
  {
    id: "5",
    name: "Tube multicouche 26mm",
    category: "Multicouche",
    diameter: "26mm",
    length: "4m",
    thickness: "3mm",
    inStock: true,
    description: "Tube multicouche pour installations sanitaires et chauffage",
    image: "/placeholder.svg",
    status: "Actif",
    price: "18.90",
    material: "PE-AL-PE",
  },
];

// Available categories for filtering specific to plastic tubes
const categories = ["Tous", "PVC", "HDPE", "PP", "PEX", "Multicouche"];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
  const [isViewProductOpen, setIsViewProductOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("Tous");
  const [selectedProduct, setSelectedProduct] = useState<typeof initialProducts[0] | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    diameter: "",
    length: "",
    thickness: "",
    description: "",
    status: "Actif",
    inStock: true,
    price: "",
    material: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter products based on search, tabs and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.diameter.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesTab = 
      currentTab === "all" ||
      (currentTab === "active" && product.status === "Actif") ||
      (currentTab === "inactive" && product.status === "Inactif");
    
    const matchesCategory =
      categoryFilter === "Tous" || 
      product.category === categoryFilter;
    
    return matchesSearch && matchesTab && matchesCategory;
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      ...newProduct,
      id: Math.random().toString(36).slice(2, 11),
      image: "/placeholder.svg",
      inStock: true,
    };
    setProducts([...products, product]);
    toast.success("Produit ajouté avec succès", {
      description: `${product.name} a été ajouté à la liste des produits.`,
    });
    setIsNewProductOpen(false);
    setNewProduct({
      name: "",
      category: "",
      diameter: "",
      length: "",
      thickness: "",
      description: "",
      status: "Actif",
      inStock: true,
      price: "",
      material: "",
    });
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    
    setProducts(products.map((product) => 
      product.id === selectedProduct.id ? selectedProduct : product
    ));
    
    toast.success("Produit modifié avec succès", {
      description: `${selectedProduct.name} a été modifié avec succès.`,
    });
    
    setIsEditProductOpen(false);
    setSelectedProduct(null);
  };

  const handleRemoveProduct = () => {
    if (!selectedProduct) return;
    
    setProducts(products.filter((product) => product.id !== selectedProduct.id));
    
    toast.success("Produit supprimé avec succès", {
      description: `${selectedProduct.name} a été supprimé de la liste des produits.`,
    });
    
    setIsDeleteProductOpen(false);
    setSelectedProduct(null);
  };

  const handleToggleStatus = (product: typeof initialProducts[0]) => {
    const newStatus = product.status === "Actif" ? "Inactif" : "Actif";
    
    setProducts(products.map(p => 
      p.id === product.id ? { ...p, status: newStatus } : p
    ));
    
    toast.success(`Statut mis à jour`, {
      description: `${product.name} est maintenant ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tubes en plastique</h2>
          <p className="text-muted-foreground">
            Gérez votre inventaire de tubes et leurs spécifications
          </p>
        </div>
        
        <Dialog open={isNewProductOpen} onOpenChange={setIsNewProductOpen}>
          <DialogTrigger asChild>
            <Button className="transition-all hover:scale-105" variant="gradient">
              <Plus className="mr-2 h-4 w-4" /> Ajouter un tube
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleAddProduct}>
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau tube</DialogTitle>
                <DialogDescription>
                  Remplissez les spécifications du tube ci-dessous.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nom
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Matériau
                    </Label>
                    <Select 
                      value={newProduct.category} 
                      onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner un matériau" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(cat => cat !== "Tous").map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="diameter" className="text-right">
                      Diamètre
                    </Label>
                    <Input
                      id="diameter"
                      className="col-span-3"
                      value={newProduct.diameter}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, diameter: e.target.value })
                      }
                      required
                      placeholder="ex: 40mm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="length" className="text-right">
                      Longueur
                    </Label>
                    <Input
                      id="length"
                      className="col-span-3"
                      value={newProduct.length}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, length: e.target.value })
                      }
                      required
                      placeholder="ex: 6m"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="thickness" className="text-right">
                      Épaisseur
                    </Label>
                    <Input
                      id="thickness"
                      className="col-span-3"
                      value={newProduct.thickness}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, thickness: e.target.value })
                      }
                      required
                      placeholder="ex: 2.5mm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Prix
                    </Label>
                    <div className="col-span-3 relative">
                      <Input
                        id="price"
                        type="text"
                        className="pl-8"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, price: e.target.value })
                        }
                        placeholder="0.00"
                      />
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Statut
                    </Label>
                    <div className="col-span-3 flex items-center space-x-2">
                      <Switch 
                        id="status"
                        checked={newProduct.status === "Actif"}
                        onCheckedChange={(checked) => 
                          setNewProduct({...newProduct, status: checked ? "Actif" : "Inactif"})
                        }
                      />
                      <Label htmlFor="status">
                        {newProduct.status}
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    className="col-span-3"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    className="col-span-3"
                    ref={fileInputRef}
                    accept="image/*"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsNewProductOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" variant="gradient">Enregistrer</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Catalogue de tubes</CardTitle>
              <CardDescription>
                {filteredProducts.length} tube{filteredProducts.length > 1 ? "s" : ""} disponible{filteredProducts.length > 1 ? "s" : ""}
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un tube..."
                  className="pl-8 pr-4 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filtrer par matériau" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full mt-4" onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-[400px]">
              <TabsTrigger value="all" className="transition-all">
                Tous ({products.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="transition-all">
                Actifs ({products.filter(p => p.status === "Actif").length})
              </TabsTrigger>
              <TabsTrigger value="inactive" className="transition-all">
                Inactifs ({products.filter(p => p.status === "Inactif").length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-3 text-center">
              <div className="rounded-full bg-muted p-3">
                <Package className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Aucun tube trouvé</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Essayez de modifier vos filtres ou d'ajouter un nouveau tube.
                </p>
              </div>
              <Button onClick={() => setIsNewProductOpen(true)}>
                <Plus className="mr-1 h-4 w-4" /> Ajouter un tube
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Tube</TableHead>
                    <TableHead>Matériau</TableHead>
                    <TableHead>Dimensions</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow 
                      key={product.id} 
                      className="group transition-colors hover:bg-secondary/30">
                      <TableCell>
                        <div className="h-12 w-12 rounded-md bg-secondary/30 overflow-hidden border group-hover:border-primary transition-colors">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div>
                          {product.name}
                          <p className="text-xs text-muted-foreground mt-1 truncate max-w-[200px]">
                            {product.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="group-hover:border-primary transition-colors">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-xs"><span className="font-medium">Ø:</span> {product.diameter}</div>
                          <div className="text-xs"><span className="font-medium">L:</span> {product.length}</div>
                          <div className="text-xs"><span className="font-medium">E:</span> {product.thickness}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {product.price} €
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={product.status === "Actif" ? "success" : "secondary"}
                          className="cursor-pointer transition-all hover:scale-105"
                          onClick={() => handleToggleStatus(product)}
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="opacity-70 group-hover:opacity-100 transition-opacity hover:bg-primary/20"
                            >
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Menu d'actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onSelect={() => {
                                setSelectedProduct(product);
                                setIsViewProductOpen(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onSelect={() => {
                                setSelectedProduct(product);
                                setIsEditProductOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onSelect={() => {
                                setSelectedProduct(product);
                                setIsDeleteProductOpen(true);
                              }}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t bg-muted/30 flex justify-between items-center py-4">
          <div className="text-sm text-muted-foreground">
            Affichage de {filteredProducts.length} sur {products.length} tubes
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>Précédent</Button>
            <Button variant="outline" size="sm" className="px-3 min-w-8 bg-primary/10">1</Button>
            <Button variant="outline" size="sm" disabled>Suivant</Button>
          </div>
        </CardFooter>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedProduct && (
            <form onSubmit={handleEditProduct}>
              <DialogHeader>
                <DialogTitle>Modifier le tube</DialogTitle>
                <DialogDescription>
                  Modifiez les spécifications du tube.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">
                      Nom
                    </Label>
                    <Input
                      id="edit-name"
                      className="col-span-3"
                      value={selectedProduct.name}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-category" className="text-right">
                      Matériau
                    </Label>
                    <Select 
                      value={selectedProduct.category} 
                      onValueChange={(value) => setSelectedProduct({...selectedProduct, category: value})}
                    >
                      <SelectTrigger className="col-span-3" id="edit-category">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(cat => cat !== "Tous").map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-diameter" className="text-right">
                      Diamètre
                    </Label>
                    <Input
                      id="edit-diameter"
                      className="col-span-3"
                      value={selectedProduct.diameter}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, diameter: e.target.value })
                      }
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-length" className="text-right">
                      Longueur
                    </Label>
                    <Input
                      id="edit-length"
                      className="col-span-3"
                      value={selectedProduct.length}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, length: e.target.value })
                      }
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-thickness" className="text-right">
                      Épaisseur
                    </Label>
                    <Input
                      id="edit-thickness"
                      className="col-span-3"
                      value={selectedProduct.thickness}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, thickness: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-price" className="text-right">
                      Prix
                    </Label>
                    <div className="col-span-3 relative">
                      <Input
                        id="edit-price"
                        type="text"
                        className="pl-8"
                        value={selectedProduct.price}
                        onChange={(e) =>
                          setSelectedProduct({ ...selectedProduct, price: e.target.value })
                        }
                      />
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-status" className="text-right">
                      Statut
                    </Label>
                    <div className="col-span-3 flex items-center space-x-2">
                      <Switch 
                        id="edit-status"
                        checked={selectedProduct.status === "Actif"}
                        onCheckedChange={(checked) => 
                          setSelectedProduct({...selectedProduct, status: checked ? "Actif" : "Inactif"})
                        }
                      />
                      <Label htmlFor="edit-status">
                        {selectedProduct.status}
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="edit-description"
                    className="col-span-3"
                    value={selectedProduct.description}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-image" className="text-right">
                    Image
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <div className="h-20 w-20 rounded-md overflow-hidden border">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Input
                      id="edit-image"
                      type="file"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditProductOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" variant="gradient">Enregistrer</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* View Product Dialog */}
      <Dialog open={isViewProductOpen} onOpenChange={setIsViewProductOpen}>
        <DialogContent className="sm:max-w-[525px]">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>Détails du tube</DialogTitle>
                <DialogDescription>
                  Spécifications techniques du tube.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex justify-center">
                  <div className="h-32 w-32 rounded-md overflow-hidden border">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <div className="flex justify-between py-1 border-b">
                    <span className="font-medium">Nom:</span>
                    <span>{selectedProduct.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="font-medium">Matériau:</span>
                    <Badge variant="outline">{selectedProduct.category}</Badge>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="font-medium">Diamètre:</span>
                    <span>{selectedProduct.diameter}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="font-medium">Longueur:</span>
                    <span>{selectedProduct.length}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="font-medium">Épaisseur:</span>
                    <span>{selectedProduct.thickness}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="font-medium">Prix:</span>
                    <Badge variant="secondary">{selectedProduct.price} €</Badge>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="font-medium">Statut:</span>
                    <Badge variant={selectedProduct.status === "Actif" ? "success" : "secondary"}>
                      {selectedProduct.status}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-1 py-1">
                    <span className="font-medium">Description:</span>
                    <p className="text-sm text-muted-foreground mt-1">{selectedProduct.description}</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsViewProductOpen(false);
                    setSelectedProduct(null);
                  }}
                >
                  Fermer
                </Button>
                <Button
                  variant="gradient"
                  onClick={() => {
                    setIsViewProductOpen(false);
                    setIsEditProductOpen(true);
                  }}
                >
                  Modifier
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteProductOpen} onOpenChange={setIsDeleteProductOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-destructive">Supprimer le tube</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce tube ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="py-4 bg-destructive/5 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-md overflow-hidden border">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{selectedProduct.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedProduct.category} - {selectedProduct.diameter}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteProductOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleRemoveProduct}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
