import { Building2, MapPin, Shield, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LandServices = () => {
  return (
    <div className="py-16 bg-white" id="land-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-8">Achat et Vente de Terrains : Réalisez vos Projets au Sénégal</h2>
        <p className="text-lg mb-12 text-gray-600">
          Trouvez les meilleures opportunités d'investissement immobilier au Sénégal avec SHS Immobilier. Que vous cherchiez à acheter un terrain pour construire la maison de vos rêves ou que vous souhaitiez vendre une parcelle, nous sommes là pour vous accompagner à chaque étape.
        </p>

        <h3 className="text-2xl font-semibold text-primary mb-6">Pourquoi choisir SHS Immobilier ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-gray-50 rounded-lg">
            <Search className="h-12 w-12 text-secondary mb-4" />
            <h4 className="text-xl font-semibold mb-3">Un large choix de terrains</h4>
            <p className="text-gray-600">Découvrez une sélection variée de terrains adaptés à tous vos projets, qu'il s'agisse de terrains constructibles, agricoles ou résidentiels.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <MapPin className="h-12 w-12 text-secondary mb-4" />
            <h4 className="text-xl font-semibold mb-3">Des emplacements stratégiques</h4>
            <p className="text-gray-600">Nous proposons des terrains dans des zones en plein essor comme Dakar, Thiès, Mbour, Diamniadio et bien d'autres régions prometteuses.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <Shield className="h-12 w-12 text-secondary mb-4" />
            <h4 className="text-xl font-semibold mb-3">Un accompagnement sur mesure</h4>
            <p className="text-gray-600">De la recherche à la signature des documents, nous vous guidons pour garantir une transaction sécurisée et conforme aux réglementations locales.</p>
          </div>
        </div>

        <div className="bg-primary/5 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold text-primary mb-6">Nos services incluent :</h3>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <Building2 className="h-6 w-6 text-secondary mr-3 mt-1" />
              <span>Recherche personnalisée selon vos critères (localisation, superficie, budget).</span>
            </li>
            <li className="flex items-start">
              <Building2 className="h-6 w-6 text-secondary mr-3 mt-1" />
              <span>Assistance dans les démarches administratives (titre foncier, permis d'occuper).</span>
            </li>
            <li className="flex items-start">
              <Building2 className="h-6 w-6 text-secondary mr-3 mt-1" />
              <span>Conseils pour optimiser votre investissement immobilier.</span>
            </li>
          </ul>
          <Button className="bg-secondary text-primary hover:bg-secondary/90">
            Contactez-nous
          </Button>
        </div>
      </div>
    </div>
  );
};