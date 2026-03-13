import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { mockIncidents } from "@/lib/mock-data";
import { FileText, Clock, CheckCircle2, AlertTriangle, PlusCircle, ArrowRight, MapPin, Calendar } from "lucide-react";

const summaryCards = [
  { label: "Reportadas", value: mockIncidents.length, icon: FileText, color: "text-primary" },
  { label: "En proceso", value: mockIncidents.filter(i => i.status === "inProgress" || i.status === "inReview").length, icon: Clock, color: "text-warning" },
  { label: "Resueltas", value: mockIncidents.filter(i => i.status === "resolved").length, icon: CheckCircle2, color: "text-success" },
];

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard Ciudadano">
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {summaryCards.map((card) => (
            <Card key={card.label} className="border">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-accent ${card.color}`}>
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

        {/* Actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Mis incidencias</h2>
          <Link to="/crear-incidencia">
            <Button variant="hero" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva incidencia
            </Button>
          </Link>
        </div>

        {/* Incident list */}
        <div className="space-y-3">
          {mockIncidents.map((incident) => (
            <Link key={incident.id} to={`/incidencia/${incident.id}`}>
              <Card className="border transition-shadow hover:shadow-md cursor-pointer">
                <CardContent className="flex items-center justify-between gap-4 p-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium truncate">{incident.type}</div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {incident.location}
                        </span>
                        <span className="flex items-center gap-1 shrink-0">
                          <Calendar className="h-3 w-3" />
                          {incident.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <StatusBadge status={incident.status} />
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
