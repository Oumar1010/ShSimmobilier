import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Home,
  FileText,
  Construction,
  Eye,
  Edit2,
  Trash2,
  Plus
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Project = {
  id: string;
  title: string;
  description: string | null;
  project_type: 'construction' | 'purchase' | 'rental';
  status_details: 'en_cours' | 'termine' | 'annule';
  created_at: string;
};

const getProjectTypeIcon = (type: Project['project_type']) => {
  switch (type) {
    case 'construction':
      return Construction;
    case 'purchase':
      return Home;
    case 'rental':
      return FileText;
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

const getStatusColor = (status: Project['status_details']) => {
  switch (status) {
    case 'en_cours':
      return 'text-blue-600 bg-blue-100';
    case 'termine':
      return 'text-green-600 bg-green-100';
    case 'annule':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const ProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('real_estate_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const validatedProjects = (data || []).map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        project_type: project.project_type,
        status_details: project.status_details,
        created_at: project.created_at,
      }));

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

  const handleDelete = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('real_estate_projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Le projet a été supprimé avec succès.",
      });

      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le projet.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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
        <Button 
          onClick={() => navigate("/projects/new")}
          className="mt-4 bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Créer un projet
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Mes Projets</h2>
        <Button 
          onClick={() => navigate("/projects/new")}
          className="bg-primary hover:bg-primary/90 text-white transform transition-transform duration-200 hover:scale-105"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Projet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const ProjectTypeIcon = getProjectTypeIcon(project.project_type);
          const StatusIcon = getStatusIcon(project.status_details);
          const statusColor = getStatusColor(project.status_details);

          return (
            <Card 
              key={project.id}
              className="group hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  <div className="flex items-center space-x-2">
                    <ProjectTypeIcon className="h-5 w-5 text-primary" />
                    <span>{project.title}</span>
                  </div>
                </CardTitle>
                <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center space-x-1 ${statusColor}`}>
                  <StatusIcon className="h-3 w-3" />
                  <span>{getStatusLabel(project.status_details)}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-2">
                <p className="text-sm text-gray-500 line-clamp-2">
                  {project.description || "Aucune description"}
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {getProjectTypeLabel(project.project_type)}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 mr-2"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Voir les détails
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(`/projects/${project.id}/edit`)}
                  >
                    <Edit2 className="h-4 w-4 text-blue-600" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action ne peut pas être annulée. Le projet sera définitivement supprimé.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(project.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};