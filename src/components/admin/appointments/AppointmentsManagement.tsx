import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar, Edit, Trash, Check, X } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AppointmentStatusBadge, AppointmentStatus } from "./AppointmentStatusBadge";
import { EditAppointmentDialog } from "./EditAppointmentDialog";

type Appointment = {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  purpose: string;
  status: AppointmentStatus;
  created_at: string;
};

export const AppointmentsManagement = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      console.log("Fetching appointments...");
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      
      console.log("Fetched appointments:", data);
      // Ensure the status is of type AppointmentStatus
      const typedAppointments = data?.map(appointment => ({
        ...appointment,
        status: appointment.status as AppointmentStatus
      })) || [];
      
      setAppointments(typedAppointments);
    } catch (error: any) {
      console.error("Error fetching appointments:", error);
      toast.error("Erreur lors du chargement des rendez-vous");
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: number, newStatus: AppointmentStatus) => {
    try {
      console.log("Updating appointment status:", { id, newStatus });
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast.success("Statut du rendez-vous mis à jour");
      fetchAppointments();
    } catch (error: any) {
      console.error("Error updating appointment status:", error);
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  const deleteAppointment = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) return;

    try {
      console.log("Deleting appointment:", id);
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success("Rendez-vous supprimé avec succès");
      fetchAppointments();
    } catch (error: any) {
      console.error("Error deleting appointment:", error);
      toast.error("Erreur lors de la suppression du rendez-vous");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Calendar className="h-6 w-6 text-primary" />
        Gestion des Rendez-vous
      </h2>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Heure</TableHead>
              <TableHead>Objet</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.user_name}</TableCell>
                <TableCell>
                  <div>
                    <p>{appointment.email}</p>
                    <p className="text-sm text-gray-500">{appointment.phone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(appointment.appointment_date), 'dd MMMM yyyy', { locale: fr })}
                </TableCell>
                <TableCell>{appointment.appointment_time}</TableCell>
                <TableCell>{appointment.purpose}</TableCell>
                <TableCell>
                  <AppointmentStatusBadge status={appointment.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingAppointment(appointment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {appointment.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600"
                          onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                      onClick={() => deleteAppointment(appointment.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditAppointmentDialog
        appointment={editingAppointment}
        onClose={() => setEditingAppointment(null)}
        onSave={fetchAppointments}
      />
    </div>
  );
};