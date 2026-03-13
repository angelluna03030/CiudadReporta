import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockIncidents } from "@/lib/mock-data";
import { BarChart3, Users, FolderOpen, FileText, AlertTriangle, Lightbulb, Trash2, Construction } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const byStatus = [
  { name: "Reportado", value: mockIncidents.filter(i => i.status === "reported").length },
  { name: "En revisión", value: mockIncidents.filter(i => i.status === "inReview").length },
  { name: "En proceso", value: mockIncidents.filter(i => i.status === "inProgress").length },
  { name: "Resuelto", value: mockIncidents.filter(i => i.status === "resolved").length },
];

const PIE_COLORS = [
  "hsl(220, 60%, 50%)",
  "hsl(35, 90%, 52%)",
  "hsl(35, 90%, 42%)",
  "hsl(145, 63%, 49%)",
];

const byType = [
  { name: "Huecos", value: mockIncidents.filter(i => i.type.includes("Hueco")).length, icon: AlertTriangle },
  { name: "Luminarias", value: mockIncidents.filter(i => i.type.includes("Luminaria")).length, icon: Lightbulb },
  { name: "Basura", value: mockIncidents.filter(i => i.type.includes("Basura")).length, icon: Trash2 },
  { name: "Infraestructura", value: mockIncidents.filter(i => i.type.includes("Infraestructura")).length, icon: Construction },
];

const summaryCards = [
  { label: "Total incidencias", value: mockIncidents.length, icon: FileText },
  { label: "Usuarios activos", value: 324, icon: Users },
  { label: "Categorías", value: 4, icon: FolderOpen },
  { label: "Tasa resolución", value: `${Math.round(mockIncidents.filter(i => i.status === "resolved").length / mockIncidents.length * 100)}%`, icon: BarChart3 },
];

export default function AdminPanel() {
  return (
    <AppLayout title="Panel de Administrador">
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <Card key={card.label} className="border">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <div className="text-sm text-muted-foreground">{card.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* By status - Bar chart */}
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-lg">Incidencias por estado</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={byStatus}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(220, 60%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* By type - Pie chart */}
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-lg">Incidencias por categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <ResponsiveContainer width="50%" height={200}>
                  <PieChart>
                    <Pie data={byType} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                      {byType.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {byType.map((t, i) => (
                    <div key={t.name} className="flex items-center gap-2 text-sm">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                      <span className="text-muted-foreground">{t.name}</span>
                      <span className="font-semibold">{t.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management sections */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border">
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Users className="h-5 w-5" />Gestión de usuarios</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Administra ciudadanos, funcionarios y roles.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b"><span>Ciudadanos</span><span className="font-semibold">298</span></div>
                <div className="flex justify-between py-2 border-b"><span>Funcionarios</span><span className="font-semibold">22</span></div>
                <div className="flex justify-between py-2"><span>Administradores</span><span className="font-semibold">4</span></div>
              </div>
            </CardContent>
          </Card>
          <Card className="border">
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><FolderOpen className="h-5 w-5" />Categorías</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Gestiona los tipos de incidencias.</p>
              <div className="space-y-2">
                {byType.map(t => (
                  <div key={t.name} className="flex items-center gap-2 py-2 border-b last:border-0 text-sm">
                    <t.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{t.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border">
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5" />Reportes recientes</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Últimas incidencias registradas.</p>
              <div className="space-y-2">
                {mockIncidents.slice(0, 3).map(i => (
                  <div key={i.id} className="flex items-center justify-between py-2 border-b last:border-0 text-sm">
                    <span className="truncate">{i.type}</span>
                    <span className="text-xs text-muted-foreground">{i.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
