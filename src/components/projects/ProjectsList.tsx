import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Building2,
  Home,
  Landmark,
  PlusCircle,
  Store,
  Trash2,
} from "lucide-react";
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

export const ProjectsList = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case "residential":
        return <Home className="h-6 w-6" />;
      case "commercial":
        return <Store className="h-6 w-6" />;
      case "land":
        return <Landmark className="h-6 w-6" />;
      default:
        return <Building2 className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "en_cours":
        return "bg-yellow-500";
      case "termine":
        return "bg-green-500";
      case "annule":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const fetchProjects = async () => {
    try {
      console.log("Fetching projects...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("No user found");
        setLoading(false);
        return;
      }

      console.log("User ID:", user.id);
      const { data, error } = await supabase
        .from("real_estate_projects")
        .select(`
          id,
          title,
          description,
          project_type,
          status_details,
          created_at
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching projects:', error);
        toast.error("Erreur lors du chargement des projets");
        return;
      }

      console.log("Projects fetched:", data);
      setProjects(data || []);
    } catch (error) {
      console.error('Error in fetchProjects:', error);
      toast.error("Une erreur est survenue lors du chargement des projets");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("real_estate_projects")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setProjects((prev) => prev.filter((project) => project.id !== id));
      toast.success("Projet supprimé avec succès");
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error("Erreur lors de la suppression du projet");
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mes Projets</h2>
        <Button onClick={() => navigate("/projects/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouveau Projet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getProjectTypeIcon(project.project_type)}
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      {new Date(project.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  className={`${getStatusColor(
                    project.status_details
                  )} text-white capitalize`}
                >
                  {project.status_details?.replace("_", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 line-clamp-3">
                {project.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. Le projet sera définitivement
                      supprimé.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteProject(project.id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">Aucun projet pour le moment</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate("/projects/new")}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Créer mon premier projet
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};