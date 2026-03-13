import { Badge } from "@/components/ui/badge";
import { type IncidentStatus, statusLabels } from "@/lib/mock-data";

const variantMap: Record<IncidentStatus, "reported" | "inReview" | "inProgress" | "resolved"> = {
  reported: "reported",
  inReview: "inReview",
  inProgress: "inProgress",
  resolved: "resolved",
};

export function StatusBadge({ status }: { status: IncidentStatus }) {
  return <Badge variant={variantMap[status]}>{statusLabels[status]}</Badge>;
}
