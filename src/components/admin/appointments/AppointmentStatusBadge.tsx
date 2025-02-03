import { Badge } from "@/components/ui/badge";

export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

const statusConfig = {
  pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
  confirmed: { label: "Confirmé", className: "bg-green-100 text-green-800 hover:bg-green-100" },
  cancelled: { label: "Annulé", className: "bg-red-100 text-red-800 hover:bg-red-100" },
};

export const AppointmentStatusBadge = ({ status }: { status: AppointmentStatus }) => {
  const config = statusConfig[status];
  
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};