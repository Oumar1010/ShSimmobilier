import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "./types";

interface AppointmentTimeFieldProps {
  form: UseFormReturn<AppointmentFormValues>;
}

export function AppointmentTimeField({ form }: AppointmentTimeFieldProps) {
  return (
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
  );
}