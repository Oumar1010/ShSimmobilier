import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { UserManagement } from "@/components/admin/UserManagement";
import { ProjectsManagement } from "@/components/admin/ProjectsManagement";
import { toast } from "sonner";
import { Building2, Shield } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/auth");
          return;
        }

        setUser(user);

        // Check if user is admin
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (roleError) throw roleError;
        setIsAdmin(roleData?.role === 'admin');
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <Shield className="h-8 w-8 text-primary" />
              ) : (
                <Building2 className="h-8 w-8 text-primary" />
              )}
              <h1 className="text-3xl font-bold text-gray-900">
                {isAdmin ? "Tableau de Bord Administrateur" : "Mes Projets Immobiliers"}
              </h1>
            </div>
            <Button onClick={handleLogout} variant="outline">Se déconnecter</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {isAdmin ? (
            <div className="space-y-8">
              <UserManagement />
              <ProjectsManagement />
            </div>
          ) : (
            <>
              <div className="mb-8">
                <Button 
                  onClick={() => navigate("/projects/new")} 
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Nouveau Projet
                </Button>
              </div>
              <ProjectsList />
            </>
          )}
        </div>
      </main>
    </div>
  );
}