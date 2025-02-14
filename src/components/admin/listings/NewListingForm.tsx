
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewListingFormProps {
  onSuccess: () => void;
}

type FormValues = {
  title: string;
  description: string;
  price: string;
  location: string;
  status: string;
  images?: string[];
};

export const NewListingForm = ({ onSuccess }: NewListingFormProps) => {
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      status: "draft",
      images: [],
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const uploadedUrls = [];

      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("listing_images")
          .upload(filePath, file);

        if (uploadError) {
          console.error("Erreur upload:", uploadError);
          toast.error(`Erreur lors de l'upload de ${file.name}: ${uploadError.message}`);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from("listing_images")
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      if (uploadedUrls.length > 0) {
        form.setValue("images", uploadedUrls);
        toast.success("Images ajoutées avec succès");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Une erreur est survenue lors de l'upload des images. Veuillez réessayer.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setSaving(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Vous devez être connecté pour créer une annonce");
        return;
      }

      const { error } = await supabase.from("real_estate_listings").insert({
        ...data,
        price: parseFloat(data.price),
        user_id: user.id, // Ajout du user_id
      });

      if (error) {
        console.error("Erreur création annonce:", error);
        if (error.code === "42501") {
          toast.error("Vous n'avez pas les permissions nécessaires pour créer une annonce.");
        } else if (error.code === "23505") {
          toast.error("Une annonce avec ce titre existe déjà.");
        } else {
          toast.error(`Erreur lors de la création de l'annonce: ${error.message}`);
        }
        return;
      }

      toast.success("Annonce créée avec succès");
      onSuccess();
    } catch (error) {
      console.error("Error creating listing:", error);
      if (error instanceof Error) {
        toast.error(`Erreur lors de la création de l'annonce: ${error.message}`);
      } else {
        toast.error("Une erreur inattendue est survenue lors de la création de l'annonce");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix (XOF)</FormLabel>
              <FormControl>
                <Input {...field} type="number" required min="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localisation</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un statut" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="published">Publié</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Images</FormLabel>
          <div className="mt-1">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              {uploading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <Upload className="h-5 w-5 mr-2" />
              )}
              {uploading ? "Upload en cours..." : "Choisir des images"}
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={saving || uploading}>
            {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Créer l'annonce
          </Button>
        </div>
      </form>
    </Form>
  );
};
