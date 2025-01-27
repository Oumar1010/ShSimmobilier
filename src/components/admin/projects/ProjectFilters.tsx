import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProjectFiltersProps = {
  statusFilter: string;
  projectTypeFilter: string;
  onStatusFilterChange: (value: string) => void;
  onProjectTypeFilterChange: (value: string) => void;
};

export const ProjectFilters = ({
  statusFilter,
  projectTypeFilter,
  onStatusFilterChange,
  onProjectTypeFilterChange,
}: ProjectFiltersProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <div className="w-1/2">
        <Select
          value={statusFilter}
          onValueChange={onStatusFilterChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tous les statuts</SelectItem>
            <SelectItem value="en_cours">En cours</SelectItem>
            <SelectItem value="termine">Terminé</SelectItem>
            <SelectItem value="annule">Annulé</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-1/2">
        <Select
          value={projectTypeFilter}
          onValueChange={onProjectTypeFilterChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filtrer par type de projet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tous les types</SelectItem>
            <SelectItem value="achat">Achat</SelectItem>
            <SelectItem value="vente">Vente</SelectItem>
            <SelectItem value="location">Location</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};