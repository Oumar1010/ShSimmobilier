import { Ruler, Map, ClipboardList, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ConstructionSupport = () => {
  return (
    <div className="py-16 bg-white" id="construction-support">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-8">Accompagnement Construction : Donnez Vie à Vos Projets</h2>
        <p className="text-lg mb-12 text-gray-600">
          Réalisez vos projets de construction en toute sérénité grâce à l'expertise locale de SHS Immobilier. Que vous souhaitiez bâtir votre maison, un immeuble ou un local professionnel, nous sommes à vos côtés pour vous guider à chaque étape.
        </p>

        <h3 className="text-2xl font-semibold text-primary mb-6">Pourquoi choisir SHS Immobilier pour votre construction ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-gray-50 rounded-lg">
            <Ruler className="h-12 w-12 text-secondary mb-4" />
            <h4 className="text-xl font-semibold mb-3">Un accompagnement sur mesure</h4>
            <p className="text-gray-600">Nous analysons vos besoins et vous proposons des solutions adaptées à votre budget et à vos objectifs.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <Map className="h-12 w-12 text-secondary mb-4" />
            <h4 className="text-xl font-semibold mb-3">Une expertise locale</h4>
            <p className="text-gray-600">Grâce à notre connaissance approfondie du marché sénégalais, nous vous aidons à choisir les meilleurs prestataires et matériaux.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <ClipboardList className="h-12 w-12 text-secondary mb-4" />
            <h4 className="text-xl font-semibold mb-3">Un suivi rigoureux</h4>
            <p className="text-gray-600">De la conception des plans à la finalisation des travaux, nous veillons au respect des délais, du budget et de la qualité.</p>
          </div>
        </div>

        <div className="bg-primary/5 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold text-primary mb-6">Nos services incluent :</h3>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <HardHat className="h-6 w-6 text-secondary mr-3 mt-1" />
              <span>Assistance dans la conception des plans architecturaux.</span>
            </li>
            <li className="flex items-start">
              <HardHat className="h-6 w-6 text-secondary mr-3 mt-1" />
              <span>Aide au choix des entreprises de construction et artisans qualifiés.</span>
            </li>
            <li className="flex items-start">
              <HardHat className="h-6 w-6 text-secondary mr-3 mt-1" />
              <span>Suivi administratif (permis de construire, conformité réglementaire).</span>
            </li>
            <li className="flex items-start">
              <HardHat className="h-6 w-6 text-secondary mr-3 mt-1" />
              <span>Contrôle qualité tout au long du chantier.</span>
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