import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Calendar, TrendingUp } from "lucide-react";
import { toast } from "sonner";

type AdminStats = {
  total_users: number;
  total_projects: number;
  total_appointments: number;
  new_projects_last_week: number;
};

export const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log("Fetching admin statistics...");
      const { data, error } = await supabase
        .from("admin_statistics")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching admin statistics:", error);
        throw error;
      }

      console.log("Admin statistics:", data);
      setStats(data);
    } catch (error: any) {
      console.error("Error in fetchStats:", error);
      toast.error("Erreur lors du chargement des statistiques");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Utilisateurs Total",
      value: stats?.total_users || 0,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Projets Total",
      value: stats?.total_projects || 0,
      icon: Building2,
      color: "text-green-600",
    },
    {
      title: "Rendez-vous Total",
      value: stats?.total_appointments || 0,
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "Nouveaux Projets (7j)",
      value: stats?.new_projects_last_week || 0,
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};