import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Building2 } from "lucide-react";
import { ProjectCard } from "./projects/ProjectCard";
import { ProjectFilters } from "./projects/ProjectFilters";

type Project = {
  id: string;
  title: string;
  description: string | null;
  project_type: string;
  status_details: string | null;
  user?: {
    full_name: string | null;
  } | null;
};

export const ProjectsManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("");

  useEffect(() => {
    fetchProjects();
  }, [statusFilter, projectTypeFilter]);

  const fetchProjects = async () => {
    try {
      console.log("Fetching projects with filters:", { statusFilter, projectTypeFilter });
      let query = supabase
        .from('real_estate_projects')
        .select(`
          id,
          title,
          description,
          project_type,
          status_details,
          user:user_dashboard!real_estate_projects_user_id_fkey (
            full_name
          )
        `);

      if (statusFilter) {
        query = query.eq('status_details', statusFilter);
      }

      if (projectTypeFilter) {
        query = query.eq('project_type', projectTypeFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
      
      console.log("Fetched projects:", data);
      setProjects(data || []);
    } catch (error: any) {
      console.error("Error in fetchProjects:", error);
      toast.error("Erreur lors du chargement des projets");
    } finally {
      setLoading(false);
    }
  };

  const updateProjectStatus = async (projectId: string, newStatus: string) => {
    try {
      console.log("Updating project status:", { projectId, newStatus });
      const { error } = await supabase
        .from('real_estate_projects')
        .update({ status_details: newStatus })
        .eq('id', projectId);

      if (error) throw error;
      
      toast.success("Statut du projet mis à jour");
      fetchProjects();
    } catch (error: any) {
      console.error("Error in updateProjectStatus:", error);
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

    try {
      console.log("Deleting project:", projectId);
      const { error } = await supabase
        .from('real_estate_projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      
      toast.success("Projet supprimé avec succès");
      fetchProjects();
    } catch (error: any) {
      console.error("Error in deleteProject:", error);
      toast.error("Erreur lors de la suppression du projet");
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

      <ProjectFilters
        statusFilter={statusFilter}
        projectTypeFilter={projectTypeFilter}
        onStatusFilterChange={setStatusFilter}
        onProjectTypeFilterChange={setProjectTypeFilter}
      />

      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={deleteProject}
            onUpdateStatus={updateProjectStatus}
          />
        ))}
      </div>
    </div>
  );
};