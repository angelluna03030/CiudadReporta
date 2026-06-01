import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { FileText, Clock, CheckCircle2, AlertTriangle, PlusCircle, ArrowRight, MapPin, Calendar, Loader2 } from "lucide-react";

interface Incident {
  id: string;
  title?: string;
  type?: string;
  description?: string;
  location?: string;
  addressId?: string;
  status?: string;
  stateId?: string;
  date?: string;
  createdAt?: string;
}

type IncidentStatusKey = "reported" | "inReview" | "inProgress" | "resolved";

function getStatus(status?: string, stateId?: string): IncidentStatusKey {
  const s = (status || stateId || "").toUpperCase();
  const map: Record<string, IncidentStatusKey> = {
    OPEN: "reported",
    IN_REVIEW: "inReview",
    IN_PROGRESS: "inProgress",
    RESOLVED: "resolved",
    REPORTED: "reported",
    INREVIEW: "inReview",
    INPROGRESS: "inProgress",
  };
  return map[s] || "reported";
}

function isInProgress(statusKey: string): boolean {
  return statusKey === "inReview" || statusKey === "inProgress";
}

function isResolved(statusKey: string): boolean {
  return statusKey === "resolved";
}

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No has iniciado sesión.");
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/incidents`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        setIncidents(Array.isArray(data) ? data : data.data ?? []);
      })
      .catch((err) => {
        console.error("Error al cargar incidencias:", err);
        setError(err.message || "Error al cargar las incidencias.");
      })
      .finally(() => setLoading(false));
  }, []);

  const inProgressCount = incidents.filter(
    (i) => isInProgress(getStatus(i.status, i.stateId))
  ).length;

  const resolvedCount = incidents.filter(
    (i) => isResolved(getStatus(i.status, i.stateId))
  ).length;

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
                <div className="text-2xl font-bold">{inProgressCount}</div>
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
                <div className="text-2xl font-bold">{resolvedCount}</div>
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

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Cargando incidencias...
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <Card className="border border-destructive/30">
            <CardContent className="flex items-center gap-3 p-4 text-destructive">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Empty state */}
        {!loading && !error && incidents.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="mx-auto h-12 w-12 mb-3 opacity-40" />
            <p className="font-medium">No hay incidencias registradas</p>
            <p className="text-sm mt-1">Crea tu primera incidencia para hacer seguimiento.</p>
          </div>
        )}

        {/* Incident list */}
        {!loading && !error && incidents.length > 0 && (
          <div className="space-y-3">
            {incidents.map((incident: Incident) => {
              const statusKey = getStatus(incident.status, incident.stateId);
              return (
                <Link key={incident.id} to={`/incidencia/${incident.id}`}>
                  <Card className="border transition-shadow hover:shadow-md cursor-pointer">
                    <CardContent className="flex items-center justify-between gap-4 p-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <AlertTriangle className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium truncate">{incident.title || incident.type}</div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="h-3 w-3 shrink-0" />
                              {incident.location || incident.addressId || incident.description || "Sin ubicación"}
                            </span>
                            <span className="flex items-center gap-1 shrink-0">
                              <Calendar className="h-3 w-3" />
                              {incident.date || incident.createdAt || ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <StatusBadge status={statusKey} />
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}