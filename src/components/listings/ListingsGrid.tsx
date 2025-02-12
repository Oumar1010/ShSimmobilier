
import { useEffect, useState } from "react";
import { ListingCard } from "./ListingCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const ListingsGrid = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from("real_estate_listings")
          .select("*")
          .eq("status", "published")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching listings:", error);
          return;
        }

        setListings(data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}

      {listings.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">
            Aucune annonce disponible pour le moment
          </p>
        </div>
      )}
    </div>
  );
};
