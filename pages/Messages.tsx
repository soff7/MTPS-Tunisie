
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, CheckCircle, ArrowRight, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample messages data
const initialMessages = [
  {
    id: "msg-1",
    from: "Jean Dupont",
    email: "jean.dupont@example.com",
    subject: "Question à propos de vos services",
    message: "Bonjour, j'aimerais en savoir plus sur vos services professionnels. Pouvez-vous me donner plus d'informations ? Merci d'avance.",
    date: "2023-05-10T09:15:00",
    read: true,
    replied: false,
  },
  {
    id: "msg-2",
    from: "Marie Lefèvre",
    email: "marie.lefevre@example.com",
    subject: "Demande de documentation",
    message: "Bonjour, suite à notre conversation téléphonique, je souhaiterais recevoir la documentation complète de vos produits. Bien cordialement.",
    date: "2023-05-09T14:30:00",
    read: true,
    replied: true,
  },
  {
    id: "msg-3",
    from: "Ahmed Ben Ali",
    email: "ahmed.benali@example.com",
    subject: "Problème technique",
    message: "Bonjour, je rencontre un problème technique avec votre application. L'écran se fige après quelques minutes d'utilisation. Pouvez-vous m'aider à résoudre ce problème ? Merci.",
    date: "2023-05-08T11:45:00",
    read: false,
    replied: false,
  },
  {
    id: "msg-4",
    from: "Sophie Martin",
    email: "sophie.martin@example.com",
    subject: "Demande de partenariat",
    message: "Bonjour, notre entreprise souhaiterait établir un partenariat avec vous. Nous pensons que nos services sont complémentaires et pourraient bénéficier à nos clients respectifs. Pourrions-nous organiser une réunion pour en discuter ? Cordialement.",
    date: "2023-05-07T16:20:00",
    read: false,
    replied: false,
  },
  {
    id: "msg-5",
    from: "Thomas Petit",
    email: "thomas.petit@example.com",
    subject: "Demande de devis",
    message: "Bonjour, je souhaiterais obtenir un devis pour l'équipement de notre nouveau bureau (10 postes de travail). Merci de votre réponse.",
    date: "2023-05-06T10:05:00",
    read: true,
    replied: false,
  },
];

export default function Messages() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<typeof initialMessages[0] | null>(null);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("all");

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

  const handleReadMessage = (id: string) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
    const message = messages.find((msg) => msg.id === id);
    if (message) {
      setSelectedMessage(message);
    }
  };

  const handleSendReply = () => {
    if (!selectedMessage || !replyContent.trim()) return;

    setMessages(
      messages.map((msg) =>
        msg.id === selectedMessage.id ? { ...msg, replied: true } : msg
      )
    );
    
    toast.success(`Réponse envoyée à ${selectedMessage.from}`, {
      description: "Votre réponse a été envoyée avec succès.",
    });
    
    setIsReplyOpen(false);
    setReplyContent("");
  };
  
  const handleDeleteMessage = () => {
    if (!selectedMessage) return;
    
    setMessages(messages.filter((msg) => msg.id !== selectedMessage.id));
    
    toast.success("Message supprimé", {
      description: `Le message de ${selectedMessage.from} a été supprimé.`,
    });
    
    setIsDeleteOpen(false);
    setSelectedMessage(null);
  };

  const handleMarkAllRead = () => {
    setMessages(messages.map(msg => ({ ...msg, read: true })));
    toast.success("Tous les messages ont été marqués comme lus");
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.from.toLowerCase().includes(searchTerm.toLowerCase()) || 
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (currentTab === "all") return matchesSearch;
    if (currentTab === "unread") return !msg.read && matchesSearch;
    if (currentTab === "replied") return msg.replied && matchesSearch;
    if (currentTab === "unreplied") return !msg.replied && matchesSearch;
    
    return matchesSearch;
  });

  const unreadCount = messages.filter((msg) => !msg.read).length;
  const unreadFilteredCount = filteredMessages.filter((msg) => !msg.read).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">
            Gérez les messages reçus 
            {unreadCount > 0 && (
              <Badge variant="info" className="ml-2">
                {unreadCount} non lu{unreadCount > 1 ? "s" : ""}
              </Badge>
            )}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleMarkAllRead}
              className="min-h-9"
            >
              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
              Tout marquer comme lu
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 border border-border/40 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-2">
              <CardTitle>Liste des messages</CardTitle>
              <Badge>
                {filteredMessages.length} message{filteredMessages.length > 1 ? "s" : ""}
              </Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" className="w-full mt-3" onValueChange={setCurrentTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all" className="transition-all">
                  Tous
                </TabsTrigger>
                <TabsTrigger value="unread" className="transition-all relative">
                  Non lus
                  {unreadFilteredCount > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 translate-x-1/2 -translate-y-1/3 rounded-full bg-primary"></span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="unreplied" className="transition-all">
                  En attente
                </TabsTrigger>
                <TabsTrigger value="replied" className="transition-all">
                  Répondus
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-380px)] min-h-[300px]">
              {filteredMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-3 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <MessageSquare className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Aucun message</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Aucun message ne correspond à vos critères de recherche.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`cursor-pointer border-b last:border-b-0 p-4 transition-colors ${
                        message.read ? "" : "bg-primary/5"
                      } ${
                        selectedMessage?.id === message.id
                          ? "bg-secondary"
                          : "hover:bg-secondary/50"
                      }`}
                      onClick={() => handleReadMessage(message.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${!message.read ? 'bg-primary/10 text-primary' : 'bg-muted'}`}>
                          {message.from.charAt(0).toUpperCase()}
                        </div>
                        <div className="space-y-1 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-medium truncate ${!message.read ? 'text-primary' : ''}`}>
                              {message.from}
                            </h4>
                            {!message.read && (
                              <span className="inline-block h-2 w-2 rounded-full bg-primary"></span>
                            )}
                          </div>
                          <p className="text-sm font-medium text-muted-foreground truncate">
                            {message.subject}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{formatDate(message.date).split(" à ")[0]}</span>
                            {message.replied ? (
                              <Badge variant="success" className="text-[10px]">Répondu</Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px]">En attente</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border border-border/40 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>
              {selectedMessage ? `Message de ${selectedMessage.from}` : "Aucun message sélectionné"}
            </CardTitle>
            {selectedMessage && (
              <CardDescription>
                {selectedMessage.subject}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-6">
                <div className="flex flex-col space-y-3 border-b pb-4">
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="font-semibold">De:</span>
                    <span>{selectedMessage.from} &lt;{selectedMessage.email}&gt;</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="font-semibold">Date:</span>
                    <span>{formatDate(selectedMessage.date)}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="font-semibold">Statut:</span>
                    <div className="flex items-center">
                      {selectedMessage.replied ? (
                        <Badge variant="success" className="flex items-center">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Répondu
                        </Badge>
                      ) : (
                        <Badge variant="warning" className="flex items-center">
                          <ArrowRight className="mr-1 h-3 w-3" />
                          En attente
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 whitespace-pre-wrap rounded-lg p-4 border">
                  {selectedMessage.message}
                </div>
              </div>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <MessageSquare className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3>Sélectionnez un message pour voir son contenu</h3>
                </div>
              </div>
            )}
          </CardContent>
          {selectedMessage && (
            <CardFooter className="border-t bg-muted/30 flex justify-between items-center py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsDeleteOpen(true);
                }}
                className="text-destructive hover:text-destructive"
              >
                <XCircle className="mr-1 h-4 w-4" />
                Supprimer
              </Button>

              <Button
                size="sm"
                onClick={() => setIsReplyOpen(true)}
                disabled={selectedMessage.replied}
              >
                <ArrowRight className="mr-1 h-4 w-4" />
                {selectedMessage.replied ? 'Déjà répondu' : 'Répondre'}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>
              Répondre à {selectedMessage?.from}
            </DialogTitle>
            <DialogDescription>
              Réponse à: {selectedMessage?.subject}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="bg-muted/30 p-3 rounded-md border border-dashed mb-2">
              <div className="text-sm text-muted-foreground mb-2">Message original:</div>
              <p className="text-sm italic">{selectedMessage?.message}</p>
            </div>
            <Textarea
              placeholder="Écrivez votre réponse ici..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[200px]"
              autoFocus
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsReplyOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleSendReply} 
              disabled={!replyContent.trim()}
              className="min-w-[120px]"
            >
              <CheckCircle className="mr-1 h-4 w-4" />
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-destructive">Supprimer le message</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce message ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="py-4 bg-destructive/5 rounded-lg p-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">De:</span>
                  <span>{selectedMessage.from}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sujet:</span>
                  <span>{selectedMessage.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{formatDate(selectedMessage.date)}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteMessage}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
