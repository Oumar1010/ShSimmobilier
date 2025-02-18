
import { useState } from "react";
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

  const { data: listings, isLoading, refetch } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      try {
        console.log("Fetching listings...");
        const { data, error } = await supabase
          .from("real_estate_listings")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          if (error.code === "PGRST116") {
            // Unauthorized error
            toast.error("Vous n'avez pas les permissions nécessaires");
            navigate("/auth");
            return [];
          }
          console.error("Error fetching listings:", error);
          throw error;
        }

        console.log("Listings fetched:", data);
        return data;
      } catch (error) {
        console.error("Error in query:", error);
        toast.error("Une erreur est survenue lors du chargement des annonces");
        return [];
      }
    },
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
