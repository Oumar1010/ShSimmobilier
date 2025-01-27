import { Building2, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Project = {
  id: string;
  title: string;
  description: string | null;
  project_type: string;
  status_details: string | null;
  user?: {
    email: string;
  } | null;
};

type ProjectCardProps = {
  project: Project;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: string) => void;
};

export const ProjectCard = ({ project, onDelete, onUpdateStatus }: ProjectCardProps) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{project.title}</h3>
          <p className="text-sm text-gray-500">
            Propriétaire: {project.user?.email || "Non assigné"}
          </p>
          <p className="text-sm text-gray-500">
            Type: {project.project_type}
          </p>
          <p className="text-sm text-gray-500">
            Statut: {project.status_details || "Non défini"}
          </p>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(project.id)}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Supprimer
        </Button>
      </div>
      <p className="text-sm">{project.description}</p>
      <div className="flex gap-2 mt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateStatus(project.id, 'termine')}
          className="flex items-center gap-2"
        >
          <CheckCircle2 className="h-4 w-4" />
          Marquer comme terminé
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateStatus(project.id, 'annule')}
          className="flex items-center gap-2"
        >
          <XCircle className="h-4 w-4" />
          Annuler
        </Button>
      </div>
    </div>
  );
};