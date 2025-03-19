
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page introuvable</h1>
          <p className="text-lg text-gray-600 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="space-y-4">
            <Button asChild size="lg" className="w-full">
              <Link to="/">Retour à l'accueil</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="/listings">Voir nos annonces</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
