
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: any;
}

export const ContactModal = ({ isOpen, onClose, listing }: ContactModalProps) => {
  const contacts = {
    Sénégal: "00221769844092",
    France: "+33769316557",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contacter l'agence</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            {Object.entries(contacts).map(([country, number]) => (
              <div key={country} className="space-y-2">
                <h3 className="font-semibold">{country}</h3>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(`tel:${number}`)}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {number}
                </Button>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center">
            Mentionnez l'annonce "{listing?.title}" lors de votre appel
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
