import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AppointmentFormValues } from "./types";

export function useAppointmentSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAppointment = async (values: AppointmentFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting appointment form:", values);

      const { data: appointment, error } = await supabase
        .from("appointments")
        .insert([
          {
            user_name: values.userName,
            email: values.email,
            phone: values.phone,
            appointment_date: format(values.appointmentDate, "yyyy-MM-dd"),
            appointment_time: values.appointmentTime,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error creating appointment:", error);
        throw error;
      }

      console.log("Appointment created:", appointment);

      const emailResponse = await supabase.functions.invoke("send-email", {
        body: {
          to: [values.email],
          subject: "Confirmation de rendez-vous - SHS Immobilier",
          html: `
            <h1>Confirmation de votre rendez-vous</h1>
            <p>Cher(e) ${values.userName},</p>
            <p>Votre rendez-vous avec SHS Immobilier a été confirmé pour le ${format(
              values.appointmentDate,
              "d MMMM yyyy",
              { locale: fr }
            )} à ${values.appointmentTime}.</p>
            <p>Nous avons hâte de vous rencontrer !</p>
            <p>Cordialement,<br>L'équipe SHS Immobilier</p>
          `,
        },
      });

      if (emailResponse.error) {
        console.error("Error sending confirmation email:", emailResponse.error);
        throw emailResponse.error;
      }

      console.log("Confirmation email sent successfully");

      const whatsappMessage = encodeURIComponent(
        `Bonjour, je confirme mon rendez-vous pour le ${format(
          values.appointmentDate,
          "d MMMM yyyy",
          { locale: fr }
        )} à ${values.appointmentTime}. Mon nom est ${values.userName}. Email: ${
          values.email
        }`
      );
      const whatsappLink = `https://wa.me/+33769316558?text=${whatsappMessage}`;

      toast.success(
        <div className="flex flex-col gap-4">
          <p>Rendez-vous confirmé !</p>
          <Button
            onClick={() => window.open(whatsappLink, "_blank")}
            className="bg-[#25D366] hover:bg-[#25D366]/90"
          >
            Confirmer sur WhatsApp
          </Button>
        </div>
      );

      return true;
    } catch (error: any) {
      console.error("Error submitting appointment form:", error);
      toast.error(
        "Une erreur est survenue lors de la prise de rendez-vous. Veuillez réessayer."
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitAppointment, isSubmitting };
}