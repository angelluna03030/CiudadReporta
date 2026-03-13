export type IncidentStatus = "reported" | "inReview" | "inProgress" | "resolved";

export interface Incident {
  id: string;
  type: string;
  typeIcon: string;
  description: string;
  location: string;
  status: IncidentStatus;
  date: string;
  image?: string;
  timeline: { status: IncidentStatus; date: string; note?: string }[];
  comments: { author: string; role: string; text: string; date: string }[];
}

export const statusLabels: Record<IncidentStatus, string> = {
  reported: "Reportado",
  inReview: "En revisión",
  inProgress: "En proceso",
  resolved: "Resuelto",
};

export const statusBadgeVariant: Record<IncidentStatus, string> = {
  reported: "reported",
  inReview: "inReview",
  inProgress: "inProgress",
  resolved: "resolved",
};

export const mockIncidents: Incident[] = [
  {
    id: "INC-001",
    type: "Hueco en la calle",
    typeIcon: "alert-triangle",
    description: "Hueco grande en la esquina de la Calle 45 con Carrera 7. Peligroso para vehículos y peatones.",
    location: "Calle 45 #7-32, Zona Centro",
    status: "inProgress",
    date: "2026-03-10",
    timeline: [
      { status: "reported", date: "2026-03-10", note: "Reporte creado por ciudadano." },
      { status: "inReview", date: "2026-03-11", note: "Asignado al departamento de obras." },
      { status: "inProgress", date: "2026-03-12", note: "Equipo de reparación en camino." },
    ],
    comments: [
      { author: "María López", role: "Funcionario", text: "Se ha programado la reparación para esta semana.", date: "2026-03-11" },
    ],
  },
  {
    id: "INC-002",
    type: "Luminaria dañada",
    typeIcon: "lightbulb",
    description: "Luminaria sin funcionar en el parque central. La zona queda completamente oscura en la noche.",
    location: "Parque Central, Sector Norte",
    status: "inReview",
    date: "2026-03-09",
    timeline: [
      { status: "reported", date: "2026-03-09" },
      { status: "inReview", date: "2026-03-10", note: "En evaluación por el área de alumbrado." },
    ],
    comments: [],
  },
  {
    id: "INC-003",
    type: "Basura acumulada",
    typeIcon: "trash-2",
    description: "Acumulación de basura en la esquina desde hace 3 días. Genera malos olores.",
    location: "Av. Principal #12-45",
    status: "resolved",
    date: "2026-03-05",
    timeline: [
      { status: "reported", date: "2026-03-05" },
      { status: "inReview", date: "2026-03-05" },
      { status: "inProgress", date: "2026-03-06" },
      { status: "resolved", date: "2026-03-07", note: "Zona limpiada por equipo de aseo." },
    ],
    comments: [
      { author: "Carlos Ruiz", role: "Funcionario", text: "El equipo de aseo ha limpiado la zona.", date: "2026-03-07" },
    ],
  },
  {
    id: "INC-004",
    type: "Infraestructura",
    typeIcon: "construction",
    description: "Banca del parque rota y con partes oxidadas. Riesgo para niños.",
    location: "Parque Los Álamos, Zona Sur",
    status: "reported",
    date: "2026-03-12",
    timeline: [
      { status: "reported", date: "2026-03-12" },
    ],
    comments: [],
  },
  {
    id: "INC-005",
    type: "Hueco en la calle",
    typeIcon: "alert-triangle",
    description: "Bache en la vía principal cerca del semáforo.",
    location: "Carrera 15 #80-10",
    status: "resolved",
    date: "2026-03-01",
    timeline: [
      { status: "reported", date: "2026-03-01" },
      { status: "inReview", date: "2026-03-02" },
      { status: "inProgress", date: "2026-03-03" },
      { status: "resolved", date: "2026-03-04" },
    ],
    comments: [],
  },
];
