
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts";

const visitsData = [
  { name: "Jan", desktop: 167, mobile: 145, tablet: 78 },
  { name: "Fév", desktop: 122, mobile: 132, tablet: 58 },
  { name: "Mar", desktop: 143, mobile: 155, tablet: 73 },
  { name: "Avr", desktop: 156, mobile: 190, tablet: 88 },
  { name: "Mai", desktop: 139, mobile: 205, tablet: 98 },
  { name: "Juin", desktop: 145, mobile: 215, tablet: 90 },
  { name: "Juil", desktop: 148, mobile: 222, tablet: 85 },
];

const productsViewsData = [
  { name: "Matériel informatique", value: 35 },
  { name: "Mobilier bureau", value: 25 },
  { name: "Articles papeterie", value: 20 },
  { name: "Accessoires", value: 15 },
  { name: "Services", value: 5 },
];

const trendsData = [
  { name: "Semaine 1", visits: 520 },
  { name: "Semaine 2", visits: 680 },
  { name: "Semaine 3", visits: 750 },
  { name: "Semaine 4", visits: 810 },
  { name: "Semaine 5", visits: 920 },
  { name: "Semaine 6", visits: 1050 },
  { name: "Semaine 7", visits: 1180 },
  { name: "Semaine 8", visits: 1250 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function Stats() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Statistiques</h2>
        <p className="text-muted-foreground">
          Analysez les performances et l'activité de votre plateforme
        </p>
      </div>

      <Tabs defaultValue="visits" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visits">Visites</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visits">
          <Card>
            <CardHeader>
              <CardTitle>Visites par appareil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visitsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="desktop" name="PC" fill="#8884d8" />
                    <Bar dataKey="mobile" name="Mobile" fill="#82ca9d" />
                    <Bar dataKey="tablet" name="Tablette" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Vues par catégorie de produits</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productsViewsData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productsViewsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Tendance des visites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="visits" 
                      name="Visites" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
