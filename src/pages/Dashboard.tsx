import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle2, AlertTriangle, PlusCircle, ArrowRight, MapPin, Calendar } from "lucide-react";

export default function Dashboard() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8081/incidents", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
      },
    })
      .then(res => res.json())
      .then(data => setIncidents(data))
      .catch(err => console.error("Error al cargar incidencias:", err));
  }, []);

  return (
    <AppLayout title="Dashboard Ciudadano">
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{incidents.length}</div>
                <div className="text-sm text-muted-foreground">Reportadas</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-warning">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">En proceso</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-success">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Resueltas</div>
              </div>
            </CardContent>
          </Card>
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
          {incidents.map((incident: any) => (
            <Card key={incident.id} className="border transition-shadow hover:shadow-md">
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{incident.title}</div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {incident.description}
                      </span>
                      <span className="flex items-center gap-1 shrink-0">
                        <Calendar className="h-3 w-3" />
                        {incident.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}