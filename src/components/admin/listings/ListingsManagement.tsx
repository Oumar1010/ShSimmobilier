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

export const ListingsManagement = () => {
  const [showNewListingForm, setShowNewListingForm] = useState(false);

  const { data: listings, isLoading, refetch } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      console.log("Fetching listings...");
      const { data, error } = await supabase
        .from("real_estate_listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching listings:", error);
        throw error;
      }

      console.log("Listings fetched:", data);
      return data;
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