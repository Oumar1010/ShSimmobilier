import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  userName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(phoneRegex, "Numéro de téléphone invalide"),
  appointmentDate: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  appointmentTime: z.string().min(1, "Veuillez sélectionner une heure"),
});

export function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      phone: "",
      appointmentTime: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Insert appointment into Supabase
      const { data: appointment, error } = await supabase
        .from("appointments")
        .insert([
          {
            user_name: values.userName,
            email: values.email,
            phone: values.phone,
            appointment_date: format(values.appointmentDate, "yyyy-MM-dd"),
            appointment_time: values.appointmentTime,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Send confirmation email
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

      if (emailResponse.error) throw emailResponse.error;

      // Generate WhatsApp link
      const whatsappMessage = encodeURIComponent(
        `Bonjour, je confirme mon rendez-vous pour le ${format(
          values.appointmentDate,
          "d MMMM yyyy",
          { locale: fr }
        )} à ${values.appointmentTime}. Mon nom est ${
          values.userName
        }. Email: ${values.email}`
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

      form.reset();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(
        "Une erreur est survenue lors de la prise de rendez-vous. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        Prendre un rendez-vous
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="+221 XX XXX XX XX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="appointmentDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date du rendez-vous</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span>Choisir une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="appointmentTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heure du rendez-vous</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "En cours..." : "Prendre rendez-vous"}
          </Button>
        </form>
      </Form>
    </div>
  );
}