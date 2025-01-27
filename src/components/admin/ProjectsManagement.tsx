import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Building2, Trash2, CheckCircle2, XCircle } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string | null;
  project_type: string;
  status_details: string | null;
  user?: {
    email: string;
  } | null;
  created_at?: string;
  updated_at?: string;
  status?: string;
  payment_status?: string | null;
  price?: number | null;
  is_admin?: boolean | null;
  user_id?: string | null;
};

export const ProjectsManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('real_estate_projects')
        .select(`
          *,
          user:user_id (
            email
          )
        `);

      if (error) throw error;
      
      // Transform the data to match the Project type
      const transformedData: Project[] = (data || []).map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        project_type: project.project_type,
        status_details: project.status_details,
        user: project.user,
        created_at: project.created_at,
        updated_at: project.updated_at,
        status: project.status,
        payment_status: project.payment_status,
        price: project.price,
        is_admin: project.is_admin,
        user_id: project.user_id
      }));

      setProjects(transformedData);
    } catch (error: any) {
      toast.error("Erreur lors du chargement des projets");
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProjectStatus = async (projectId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('real_estate_projects')
        .update({ status_details: newStatus })
        .eq('id', projectId);

      if (error) throw error;
      toast.success("Statut du projet mis à jour");
      fetchProjects();
    } catch (error: any) {
      toast.error("Erreur lors de la mise à jour du statut");
      console.error("Error updating project status:", error);
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

    try {
      const { error } = await supabase
        .from('real_estate_projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      toast.success("Projet supprimé avec succès");
      fetchProjects();
    } catch (error: any) {
      toast.error("Erreur lors de la suppression du projet");
      console.error("Error deleting project:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Building2 className="h-6 w-6 text-primary" />
        Gestion des Projets
      </h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 bg-gray-50 rounded-lg space-y-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-500">
                  Propriétaire: {project.user?.email}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteProject(project.id)}
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
                onClick={() => updateProjectStatus(project.id, 'termine')}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Marquer comme terminé
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateProjectStatus(project.id, 'annule')}
                className="flex items-center gap-2"
              >
                <XCircle className="h-4 w-4" />
                Annuler
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};