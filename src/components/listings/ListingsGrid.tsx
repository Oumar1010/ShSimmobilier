
import { useEffect, useState } from "react";
import { ListingCard } from "./ListingCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export const ListingsGrid = () => {
  const { data: listings, isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      try {
        // Avec les nouvelles politiques RLS, nous n'avons plus besoin de filtrer explicitement
        // par status car la politique RLS s'en charge
        const { data, error } = await supabase
          .from("real_estate_listings")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching listings:", error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error("Error:", error);
        return [];
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings && listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">
            Aucune annonce disponible pour le moment
          </p>
        </div>
      )}
    </div>
  );
};
