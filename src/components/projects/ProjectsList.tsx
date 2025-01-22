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
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
};

const isValidProjectType = (type: string): type is Project['project_type'] => {
  return ['construction', 'purchase', 'rental'].includes(type);
};

const isValidStatus = (status: string): status is Project['status'] => {
  return ['pending', 'in_progress', 'completed'].includes(status);
};

const validateProject = (project: any): Project => {
  if (!isValidProjectType(project.project_type)) {
    throw new Error(`Invalid project type: ${project.project_type}`);
  }
  if (!isValidStatus(project.status)) {
    throw new Error(`Invalid status: ${project.status}`);
  }
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    project_type: project.project_type,
    status: project.status,
    created_at: project.created_at,
  };
};

const getStatusIcon = (status: Project['status']) => {
  switch (status) {
    case 'pending':
      return Clock;
    case 'in_progress':
      return Building2;
    case 'completed':
      return CheckCircle2;
    default:
      return AlertCircle;
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

        // Validate and transform the data
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
        <Button className="mt-4" onClick={() => console.log('Create project')}>
          Nouveau Projet
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const StatusIcon = getStatusIcon(project.status);
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
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {getProjectTypeLabel(project.project_type)}
              </span>
              <Button variant="outline" size="sm">
                Voir détails
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  );
};