import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { UserManagement } from "@/components/admin/UserManagement";
import { ProjectsManagement } from "@/components/admin/ProjectsManagement";
import { toast } from "sonner";
import { Building2, Shield, Home, Calendar, User, LogOut } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <Shield className="h-8 w-8 text-primary" />
              ) : (
                <Building2 className="h-8 w-8 text-primary" />
              )}
              <h1 className="text-xl font-bold text-gray-900">
                {isAdmin ? "Tableau de Bord Administrateur" : "Mes Projets Immobiliers"}
              </h1>
            </div>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className={navigationMenuTriggerStyle()}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Accueil
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/dashboard"
                    className={navigationMenuTriggerStyle()}
                  >
                    <Building2 className="mr-2 h-4 w-4" />
                    Mes Projets
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/#appointment"
                    className={navigationMenuTriggerStyle()}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Rendez-vous
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[200px] p-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Se déconnecter
                      </Button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
            <ProjectsList />
          )}
        </div>
      </main>
    </div>
  );
}