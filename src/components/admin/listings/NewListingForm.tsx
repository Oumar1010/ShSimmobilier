
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface NewListingFormProps {
  onSuccess: () => void;
}

const listingSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  price: z.string().min(1, "Le prix est requis"),
  location: z.string().min(3, "La localisation doit contenir au moins 3 caractères"),
  status: z.string().min(1, "Le statut est requis"),
  images: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof listingSchema>;

export const NewListingForm = ({ onSuccess }: NewListingFormProps) => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      status: "draft",
      images: [],
    },
  });

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
        navigate("/auth", { state: { returnTo: "/listings/admin" } });
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
        navigate("/auth", { state: { returnTo: "/listings/admin" } });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
        navigate("/auth");
        return;
      }

      const uploadedUrls = [];

      for (const file of files) {
        // Vérification de la taille du fichier (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`Le fichier ${file.name} est trop volumineux (max 5MB)`);
          continue;
        }

        // Vérification du type de fichier
        if (!file.type.startsWith('image/')) {
          toast.error(`Le fichier ${file.name} n'est pas une image`);
          continue;
        }

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
        const currentImages = form.getValues("images") || [];
        form.setValue("images", [...currentImages, ...uploadedUrls]);
        toast.success("Images ajoutées avec succès");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Une erreur est survenue lors de l'upload des images");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setSaving(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
        navigate("/auth", { state: { returnTo: "/listings/admin" } });
        return;
      }

      // Vérification que le prix est un nombre valide
      const price = parseFloat(data.price);
      if (isNaN(price) || price <= 0) {
        toast.error("Le prix doit être un nombre positif");
        return;
      }

      const { error } = await supabase.from("real_estate_listings").insert({
        ...data,
        price: price,
        user_id: session.user.id,
      });

      if (error) {
        console.error("Erreur création annonce:", error);
        if (error.code === "42501") {
          toast.error("Vous n'avez pas les permissions nécessaires pour créer une annonce");
        } else if (error.code === "23505") {
          toast.error("Une annonce avec ce titre existe déjà");
        } else {
          toast.error(`Erreur lors de la création de l'annonce: ${error.message}`);
        }
        return;
      }

      toast.success("Annonce créée avec succès");
      form.reset();
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
                <Input {...field} placeholder="Titre de l'annonce" />
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
                <Textarea {...field} placeholder="Description détaillée" rows={4} />
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
                <Input {...field} type="number" placeholder="0" min="0" />
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
                <Input {...field} placeholder="Adresse du bien" />
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

          {/* Preview des images */}
          {form.watch("images")?.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {form.watch("images")?.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-md"
                />
              ))}
            </div>
          )}
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
