
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ListingsTable } from "./ListingsTable";
import { NewListingForm } from "./NewListingForm";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const ListingsManagement = () => {
  const navigate = useNavigate();
  const [showNewListingForm, setShowNewListingForm] = useState(false);

  // Vérification initiale du rôle admin via la fonction RPC
  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const session = await supabase.auth.getSession();
        if (!session.data.session) {
          navigate("/auth");
          return;
        }

        // Utilisation de la fonction RPC check_if_admin
        const { data: isAdmin, error } = await supabase.rpc('check_if_admin');

        if (error || !isAdmin) {
          console.error("Error checking admin role:", error);
          toast.error("Accès non autorisé");
          navigate("/");
        }
      } catch (error) {
        console.error("Error in admin check:", error);
        toast.error("Une erreur est survenue");
        navigate("/");
      }
    };

    checkAdminRole();
  }, [navigate]);

  const { data: listings, isLoading, refetch } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      try {
        const session = await supabase.auth.getSession();
        if (!session.data.session) {
          navigate("/auth");
          return [];
        }

        const { data, error } = await supabase
          .from("real_estate_listings")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching listings:", error);
          if (error.code === "PGRST116") {
            toast.error("Vous n'avez pas les permissions nécessaires");
            navigate("/auth");
            return [];
          }
          toast.error("Une erreur est survenue lors du chargement des annonces");
          return [];
        }

        return data || [];
      } catch (error) {
        console.error("Error in query:", error);
        toast.error("Une erreur est survenue lors du chargement des annonces");
        return [];
      }
    },
    retry: false,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Annonces</h2>
        <Button onClick={() => setShowNewListingForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Annonce
        </Button>
      </div>

      <Dialog open={showNewListingForm} onOpenChange={setShowNewListingForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle annonce</DialogTitle>
          </DialogHeader>
          <NewListingForm
            onSuccess={() => {
              setShowNewListingForm(false);
              refetch();
            }}
          />
        </DialogContent>
      </Dialog>

      <ListingsTable listings={listings || []} isLoading={isLoading} onUpdate={refetch} />
    </div>
  );
};
