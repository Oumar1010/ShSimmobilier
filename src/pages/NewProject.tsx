import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Building2 } from "lucide-react";

export default function NewProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [status, setStatus] = useState("en_cours");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      }
    };

    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour créer un projet");
        navigate("/auth");
        return;
      }

      console.log("Checking user dashboard for user:", user.id);
      
      // Vérifier si l'utilisateur a un profil dans user_dashboard
      const { data: userDashboard, error: userDashboardError } = await supabase
        .from("user_dashboard")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      console.log("User dashboard response:", { userDashboard, userDashboardError });

      if (userDashboardError) {
        console.error("Erreur lors de la vérification du profil:", userDashboardError);
        toast.error("Erreur lors de la vérification du profil utilisateur");
        return;
      }

      // Si le profil n'existe pas, on le crée
      if (!userDashboard) {
        console.log("Creating user dashboard for user:", user.id);
        const { error: createError } = await supabase
          .from("user_dashboard")
          .insert([
            {
              id: user.id,
              full_name: user.user_metadata.full_name
            }
          ]);

        if (createError) {
          console.error("Erreur lors de la création du profil:", createError);
          toast.error("Erreur lors de la création du profil utilisateur");
          return;
        }
      }

      console.log("Creating project for user:", user.id);
      
      const { error } = await supabase
        .from("real_estate_projects")
        .insert([
          {
            title,
            description,
            project_type: projectType,
            status_details: status,
            user_id: user.id,
          },
        ]);

      if (error) {
        console.error("Erreur lors de la création du projet:", error);
        throw error;
      }

      toast.success("Projet créé avec succès");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Erreur:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Nouveau Projet</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Nom du projet
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
                Type de projet
              </label>
              <Select onValueChange={setProjectType} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="purchase">Achat</SelectItem>
                  <SelectItem value="rental">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Statut du projet
              </label>
              <Select onValueChange={setStatus} defaultValue="en_cours">
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionnez un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en_cours">En cours</SelectItem>
                  <SelectItem value="termine">Terminé</SelectItem>
                  <SelectItem value="annule">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Création..." : "Créer le projet"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}