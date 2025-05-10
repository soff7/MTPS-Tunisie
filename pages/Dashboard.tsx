
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area } from "recharts";
import { ArrowUpRight, Users, Package, MessageSquare, BarChart3, Activity, Calendar, PieChart, TrendingUp } from "lucide-react";

const visitData = [
  {
    name: "Jan",
    total: 167,
  },
  {
    name: "Fév",
    total: 122,
  },
  {
    name: "Mar",
    total: 143,
  },
  {
    name: "Avr",
    total: 224,
  },
  {
    name: "Mai",
    total: 185,
  },
  {
    name: "Juin",
    total: 162,
  },
  {
    name: "Juil",
    total: 209,
  },
];

const activityData = [
  { name: "Lun", value: 40 },
  { name: "Mar", value: 30 },
  { name: "Mer", value: 45 },
  { name: "Jeu", value: 50 },
  { name: "Ven", value: 65 },
  { name: "Sam", value: 35 },
  { name: "Dim", value: 25 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        <p className="text-muted-foreground">
          Bienvenue à votre tableau de bord administratif
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 hover:scale-[1.01] group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
            <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="text-2xl font-bold">1,254</div>
              <div className="flex items-center pt-1 space-x-1">
                <Badge variant="success" className="text-[10px]">
                  <ArrowUpRight className="mr-1 h-3 w-3" /> +12%
                </Badge>
                <span className="text-xs text-muted-foreground">
                  depuis le mois dernier
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 hover:scale-[1.01] group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits actifs</CardTitle>
            <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <Package className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="text-2xl font-bold">324</div>
              <div className="flex items-center pt-1 space-x-1">
                <Badge variant="success" className="text-[10px]">
                  +7 
                </Badge>
                <span className="text-xs text-muted-foreground">
                  nouveaux cette semaine
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 hover:scale-[1.01] group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages non lus</CardTitle>
            <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <MessageSquare className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="text-2xl font-bold">28</div>
              <div className="flex items-center pt-1 space-x-1">
                <Badge variant="warning" className="text-[10px]">
                  14
                </Badge>
                <span className="text-xs text-muted-foreground">
                  nouveaux aujourd'hui
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 hover:scale-[1.01] group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visites cette semaine</CardTitle>
            <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <Activity className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="text-2xl font-bold">3,271</div>
              <div className="flex items-center pt-1 space-x-1">
                <Badge variant="success" className="text-[10px]">
                  <ArrowUpRight className="mr-1 h-3 w-3" /> +18%
                </Badge>
                <span className="text-xs text-muted-foreground">
                  par rapport à la semaine dernière
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border border-border/40 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Statistiques de visites</CardTitle>
              <CardDescription>Vue d'ensemble des visites mensuelles</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-8">
                <Calendar className="mr-1 h-3.5 w-3.5" />
                Ce mois
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <PieChart className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={visitData} margin={{ top: 10, right: 15, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  cursor={{fill: 'hsl(var(--primary) / 0.1)'}}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                />
                <Bar
                  dataKey="total"
                  fill="url(#colorTotal)"
                  radius={[4, 4, 0, 0]}
                  className="hover:opacity-80 cursor-pointer transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 border border-border/40 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Activité récente</CardTitle>
              <CardDescription>Vue d'ensemble de l'activité hebdomadaire</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              <TrendingUp className="mr-1 h-3.5 w-3.5" />
              Tendances
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <YAxis tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorActivity)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Dernières actions</h3>
              <div className="space-y-4">
                {[
                  { icon: <Users className="h-3 w-3" />, title: "Nouvel utilisateur inscrit", time: "il y a 5 minutes" },
                  { icon: <Package className="h-3 w-3" />, title: "Nouveau produit ajouté", time: "il y a 2 heures" },
                  { icon: <MessageSquare className="h-3 w-3" />, title: "Nouveau message reçu", time: "il y a 3 heures" },
                  { icon: <Users className="h-3 w-3" />, title: "Compte utilisateur mis à jour", time: "il y a 5 heures" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-background shadow-sm transition-colors group-hover:border-primary">
                      {item.icon}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
