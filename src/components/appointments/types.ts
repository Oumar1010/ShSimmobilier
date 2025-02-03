import { z } from "zod";

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const appointmentFormSchema = z.object({
  userName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(phoneRegex, "Numéro de téléphone invalide"),
  appointmentDate: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  appointmentTime: z.string().min(1, "Veuillez sélectionner une heure"),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;