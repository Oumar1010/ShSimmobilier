
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Shield, UserMinus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  email: string;
  role: string;
};

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Veuillez vous connecter pour accéder à cette page");
        navigate("/auth");
        return;
      }
      fetchUsers();
    };

    checkSession();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const { data: usersData, error: usersError } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          role,
          users:user_id (
            email
          )
        `);

      if (usersError) throw usersError;

      const formattedUsers = usersData.map((user: any) => ({
        id: user.user_id,
        email: user.users.email,
        role: user.role,
      }));

      setUsers(formattedUsers);
    } catch (error: any) {
      toast.error("Erreur lors du chargement des utilisateurs");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role: newRole });

      if (error) throw error;

      toast.success(`Rôle mis à jour avec succès`);
      fetchUsers();
    } catch (error: any) {
      toast.error("Erreur lors de la mise à jour du rôle");
      console.error("Error updating role:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        Gestion des Utilisateurs
      </h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-gray-500">Rôle: {user.role}</p>
            </div>
            <div className="flex gap-2">
              {user.role === 'user' ? (
                <Button
                  onClick={() => updateUserRole(user.id, 'admin')}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Promouvoir Admin
                </Button>
              ) : (
                <Button
                  onClick={() => updateUserRole(user.id, 'user')}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <UserMinus className="h-4 w-4" />
                  Rétrograder
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
