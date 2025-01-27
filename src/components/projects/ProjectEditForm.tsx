import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Loader2 } from "lucide-react";

interface ProjectEditFormProps {
  project: {
    id: string;
    title: string;
    description: string | null;
    project_type: string;
    status_details: string | null;
  };
  onClose: () => void;
  onUpdate: () => void;
}

export const ProjectEditForm = ({ project, onClose, onUpdate }: ProjectEditFormProps) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description || "");
  const [projectType, setProjectType] = useState(project.project_type);
  const [status, setStatus] = useState(project.status_details || "en_cours");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('project_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project_images')
        .getPublicUrl(filePath);

      await supabase.from('project_images').insert({
        project_id: project.id,
        image_url: publicUrl
      });

      toast.success("Image ajoutée avec succès");
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Erreur lors de l'upload de l'image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const { error } = await supabase
        .from('real_estate_projects')
        .update({
          title,
          description,
          project_type: projectType,
          status_details: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', project.id);

      if (error) throw error;

      toast.success("Projet mis à jour avec succès");
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error("Erreur lors de la mise à jour du projet");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
      <div>
        <label className="text-sm font-medium">Titre</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1"
          rows={4}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Type de projet</label>
        <Select value={projectType} onValueChange={setProjectType}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Résidentiel</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="land">Terrain</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">Statut</label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en_cours">En cours</SelectItem>
            <SelectItem value="termine">Terminé</SelectItem>
            <SelectItem value="annule">Annulé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">Ajouter une image</label>
        <div className="mt-1">
          <Input
            type="file"
            accept="image/*"
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
            {uploading ? "Upload en cours..." : "Choisir une image"}
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Enregistrer
        </Button>
      </div>
    </form>
  );
};