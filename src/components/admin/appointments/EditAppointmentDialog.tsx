import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Appointment = {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  purpose: string;
  status: string;
};

type EditAppointmentDialogProps = {
  appointment: Appointment | null;
  onClose: () => void;
  onSave: () => void;
};

export const EditAppointmentDialog = ({
  appointment,
  onClose,
  onSave,
}: EditAppointmentDialogProps) => {
  const [formData, setFormData] = useState<Partial<Appointment>>({});

  useEffect(() => {
    if (appointment) {
      setFormData(appointment);
    }
  }, [appointment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('appointments')
        .update(formData)
        .eq('id', appointment?.id);

      if (error) throw error;

      toast.success("Rendez-vous mis à jour avec succès");
      onSave();
      onClose();
    } catch (error: any) {
      console.error("Error updating appointment:", error);
      toast.error("Erreur lors de la mise à jour du rendez-vous");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={!!appointment} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le rendez-vous</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="user_name">Nom du client</Label>
              <Input
                id="user_name"
                value={formData.user_name || ""}
                onChange={(e) => handleChange("user_name", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="appointment_date">Date</Label>
              <Input
                id="appointment_date"
                type="date"
                value={formData.appointment_date || ""}
                onChange={(e) => handleChange("appointment_date", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="appointment_time">Heure</Label>
              <Input
                id="appointment_time"
                type="time"
                value={formData.appointment_time || ""}
                onChange={(e) => handleChange("appointment_time", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="purpose">Objet</Label>
              <Select
                value={formData.purpose}
                onValueChange={(value) => handleChange("purpose", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner l'objet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="visite">Visite de propriété</SelectItem>
                  <SelectItem value="signature">Signature de contrat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="confirmed">Confirmé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};