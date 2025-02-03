import { MapPin, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactModal } from "./ContactModal";
import { useState } from "react";

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    images: string[];
  };
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  const [showContactModal, setShowContactModal] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
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
            <div className="flex items-center text-primary font-semibold">
              <span>{formatPrice(listing.price)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={() => setShowContactModal(true)}
          >
            <Phone className="mr-2 h-4 w-4" />
            Contacter
          </Button>
        </CardFooter>
      </Card>

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        listing={listing}
      />
    </>
  );
};