import { useEffect, useState } from "react";
import { Building2, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Project = {
  id: string;
  title: string;
  description: string | null;
  project_type: 'construction' | 'purchase' | 'rental';
  status_details: 'en_cours' | 'termine' | 'annule';
  created_at: string;
};

const isValidProjectType = (type: string): type is Project['project_type'] => {
  return ['construction', 'purchase', 'rental'].includes(type);
};

const isValidStatus = (status: string): type is Project['status_details'] => {
  return ['en_cours', 'termine', 'annule'].includes(status);
};

const validateProject = (project: any): Project => {
  if (!isValidProjectType(project.project_type)) {
    throw new Error(`Invalid project type: ${project.project_type}`);
  }
  if (!isValidStatus(project.status_details)) {
    throw new Error(`Invalid status: ${project.status_details}`);
  }
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    project_type: project.project_type,
    status_details: project.status_details,
    created_at: project.created_at,
  };
};

const getStatusIcon = (status: Project['status_details']) => {
  switch (status) {
    case 'en_cours':
      return Clock;
    case 'termine':
      return CheckCircle2;
    case 'annule':
      return AlertCircle;
    default:
      return Building2;
  }
};

const getProjectTypeLabel = (type: Project['project_type']) => {
  switch (type) {
    case 'construction':
      return 'Construction';
    case 'purchase':
      return 'Achat';
    case 'rental':
      return 'Location';
    default:
      return type;
  }
};

const getStatusLabel = (status: Project['status_details']) => {
  switch (status) {
    case 'en_cours':
      return 'En cours';
    case 'termine':
      return 'Terminé';
    case 'annule':
      return 'Annulé';
    default:
      return status;
  }
};

export const ProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('real_estate_projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const validatedProjects = (data || []).map(validateProject);
        setProjects(validatedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les projets immobiliers.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Aucun projet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Commencez par créer votre premier projet immobilier.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const StatusIcon = getStatusIcon(project.status_details);
        return (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex-1">
                {project.title}
              </h3>
              <StatusIcon className="h-5 w-5 text-primary flex-shrink-0" />
            </div>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
              {project.description || "Aucune description"}
            </p>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {getProjectTypeLabel(project.project_type)}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {getStatusLabel(project.status_details)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}