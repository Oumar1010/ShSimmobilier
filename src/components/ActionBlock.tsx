import { Building2, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const ActionBlock = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-16 bg-gradient-to-b from-primary/5 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Gérez vos projets immobiliers facilement
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Que vous souhaitiez démarrer un nouveau projet ou planifier une rencontre,
            nous sommes là pour vous accompagner à chaque étape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="group">
            <Button
              onClick={() => navigate("/projects/new")}
              className="w-full h-auto py-8 px-6 bg-white hover:bg-primary/5 text-primary border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4 rounded-xl group-hover:scale-105"
              variant="ghost"
            >
              <Building2 className="w-12 h-12" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Créer un Nouveau Projet</h3>
                <p className="text-sm text-gray-600">
                  Lancez votre projet immobilier dès maintenant
                </p>
              </div>
            </Button>
          </div>

          <div className="group">
            <Button
              onClick={() => {
                const element = document.getElementById('appointment');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full h-auto py-8 px-6 bg-white hover:bg-secondary/10 text-primary border border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4 rounded-xl group-hover:scale-105"
              variant="ghost"
            >
              <Calendar className="w-12 h-12" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Prendre Rendez-vous</h3>
                <p className="text-sm text-gray-600">
                  Planifiez une rencontre avec nos experts
                </p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};