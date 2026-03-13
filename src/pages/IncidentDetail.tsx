import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { mockIncidents, statusLabels, type IncidentStatus } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, MapPin, Calendar, FileText, CheckCircle2, Clock, AlertCircle, MessageSquare, User
} from "lucide-react";

const timelineIcons: Record<IncidentStatus, typeof CheckCircle2> = {
  reported: AlertCircle,
  inReview: Clock,
  inProgress: Clock,
  resolved: CheckCircle2,
};

const timelineColors: Record<IncidentStatus, string> = {
  reported: "text-primary bg-primary/10",
  inReview: "text-warning bg-warning/10",
  inProgress: "text-warning bg-warning/10",
  resolved: "text-success bg-success/10",
};

export default function IncidentDetail() {
  const { id } = useParams();
  const incident = mockIncidents.find((i) => i.id === id);

  if (!incident) {
    return (
      <AppLayout title="Incidencia no encontrada">
        <div className="text-center py-20">
          <p className="text-muted-foreground">No se encontró la incidencia.</p>
          <Link to="/dashboard"><Button variant="outline" className="mt-4">Volver</Button></Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`Incidencia ${incident.id}`}>
      <div className="max-w-3xl mx-auto space-y-6">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al dashboard
          </Button>
        </Link>

        {/* Header */}
        <Card className="border">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-muted-foreground font-mono">{incident.id}</span>
                  <StatusBadge status={incident.status} />
                </div>
                <h2 className="text-2xl font-bold">{incident.type}</h2>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{incident.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{incident.date}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <h3 className="text-sm font-semibold mb-1 flex items-center gap-2"><FileText className="h-4 w-4" />Descripción</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{incident.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg">Seguimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {incident.timeline.map((entry, i) => {
                const Icon = timelineIcons[entry.status];
                const colors = timelineColors[entry.status];
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${colors}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {i < incident.timeline.length - 1 && <div className="w-0.5 flex-1 bg-border my-1" />}
                    </div>
                    <div className="pb-6">
                      <div className="font-medium text-sm">{statusLabels[entry.status]}</div>
                      <div className="text-xs text-muted-foreground">{entry.date}</div>
                      {entry.note && <p className="mt-1 text-sm text-muted-foreground">{entry.note}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" /> Comentarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            {incident.comments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No hay comentarios aún.</p>
            ) : (
              <div className="space-y-4">
                {incident.comments.map((comment, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{comment.author}</span>
                        <span className="text-xs bg-accent px-2 py-0.5 rounded-full text-muted-foreground">{comment.role}</span>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
