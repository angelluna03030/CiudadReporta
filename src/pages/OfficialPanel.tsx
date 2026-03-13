import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { mockIncidents, statusLabels, type IncidentStatus } from "@/lib/mock-data";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Search, Filter, MapPin, Calendar, ArrowRight } from "lucide-react";

export default function OfficialPanel() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = mockIncidents.filter((i) => {
    if (statusFilter !== "all" && i.status !== statusFilter) return false;
    if (search && !i.type.toLowerCase().includes(search.toLowerCase()) && !i.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <AppLayout title="Panel de Funcionario">
      <div className="space-y-6">
        {/* Filters */}
        <Card className="border">
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por tipo o ubicación..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="reported">Reportado</SelectItem>
                <SelectItem value="inReview">En revisión</SelectItem>
                <SelectItem value="inProgress">En proceso</SelectItem>
                <SelectItem value="resolved">Resuelto</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-mono text-sm">{incident.id}</TableCell>
                    <TableCell className="font-medium">{incident.type}</TableCell>
                    <TableCell className="text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{incident.location}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{incident.date}</span>
                    </TableCell>
                    <TableCell><StatusBadge status={incident.status} /></TableCell>
                    <TableCell className="text-right">
                      <Link to={`/incidencia/${incident.id}`}>
                        <Button variant="ghost" size="sm">
                          Ver <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No se encontraron incidencias.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
