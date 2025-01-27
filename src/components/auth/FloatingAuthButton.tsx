import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogIn, User, Settings, LogOut } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const FloatingAuthButton = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error: any) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
      toast.success("Déconnexion réussie");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-0 w-14 h-14 bg-primary hover:bg-primary/90 border-2 border-secondary"
              aria-label="Menu utilisateur"
            >
              <Avatar className="h-full w-full">
                <AvatarImage 
                  src={userProfile?.avatar_url} 
                  alt={userProfile?.full_name || user.email}
                  className="object-cover rounded-full ring-2 ring-secondary ring-offset-2 ring-offset-primary"
                />
                <AvatarFallback className="bg-secondary text-primary text-xl font-semibold animate-in">
                  {(userProfile?.full_name || user.email)?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 mt-2 animate-in fade-in-80 slide-in-from-bottom-5"
          >
            <DropdownMenuItem 
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer hover:bg-primary/10 transition-colors duration-200"
            >
              <User className="mr-2 h-4 w-4" />
              Tableau de bord
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate("/change-password")}
              className="cursor-pointer hover:bg-primary/10 transition-colors duration-200"
            >
              <Settings className="mr-2 h-4 w-4" />
              Changer le mot de passe
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleLogout}
              className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => navigate("/auth")}
        size="lg"
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90 border-2 border-secondary"
        aria-label="Se connecter"
      >
        <LogIn className="mr-2 h-5 w-5" />
        Connexion
      </Button>
    </div>
  );
};