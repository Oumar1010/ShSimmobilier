import { MapPin, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContactModal } from "./ContactModal";
import { useState } from "react";

interface ListingsGridProps {
  listings: any[];
}

export const ListingsGrid = ({ listings }: ListingsGridProps) => {
  const [selectedListing, setSelectedListing] = useState<any>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="flex flex-col h-full">
            <CardHeader className="p-0">
              {listing.images && listing.images.length > 0 && (
                <div className="relative h-48 w-full">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle className="text-xl mb-2">{listing.title}</CardTitle>
              <CardDescription className="line-clamp-2 mb-4">
                {listing.description}
              </CardDescription>
              <div className="space-y-2">
                <div className="flex items-center text-primary">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center text-primary">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span className="font-semibold">
                    {formatPrice(listing.price)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full"
                onClick={() => setSelectedListing(listing)}
              >
                Contacter
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {listings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune annonce disponible pour le moment</p>
        </div>
      )}

      <ContactModal
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        listing={selectedListing}
      />
    </>
  );
};