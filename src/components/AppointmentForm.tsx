import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AppointmentDateField } from "./appointments/AppointmentDateField";
import { AppointmentTimeField } from "./appointments/AppointmentTimeField";
import { ContactFields } from "./appointments/ContactFields";
import { appointmentFormSchema } from "./appointments/types";
import { useAppointmentSubmit } from "./appointments/useAppointmentSubmit";

export function AppointmentForm() {
  const form = useForm({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      userName: "",
      email: "",
      phone: "",
      appointmentTime: "",
    },
  });

  const { submitAppointment, isSubmitting } = useAppointmentSubmit();

  const onSubmit = async (values: z.infer<typeof appointmentFormSchema>) => {
    const success = await submitAppointment(values);
    if (success) {
      form.reset();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        Prendre un rendez-vous
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ContactFields form={form} />
          <AppointmentDateField form={form} />
          <AppointmentTimeField form={form} />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                En cours...
              </>
            ) : (
              "Prendre rendez-vous"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}