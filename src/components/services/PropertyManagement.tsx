import { ClipboardCheck, UserCheck, Calculator, Scale, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PropertyManagement = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-16 bg-gray-50" id="property-management">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-8">Gérance et Gestion Locative : Votre Tranquillité d'Esprit</h2>
        <p className="text-lg mb-12 text-gray-600">
          Confiez-nous la gestion de vos biens immobiliers en toute sérénité. Chez SHS Immobilier, nous mettons notre expertise au service des propriétaires pour une gestion professionnelle et personnalisée de leurs biens.
        </p>

        <h3 className="text-2xl font-semibold text-primary mb-6">Nos engagements :</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ClipboardCheck className="h-12 w-12 text-secondary mb-4" />
            <h4 className="text-xl font-semibold mb-3">Gestion administrative complète</h4>
            <p className="text-gray-600">Rédaction des contrats de location, suivi des paiements, gestion des renouvellements et résiliations.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <UserCheck className="h-12 w-12 text-secondary mb-4" />
            <h4 className="text-xl font-semibold mb-3">Sélection rigoureuse des locataires</h4>
            <p className="text-gray-600">Analyse approfondie des dossiers pour garantir des locataires fiables et solvables.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Calculator className="h-12 w-12 text-secondary mb-4" />
            <h4 className="text-xl font-semibold mb-3">Suivi financier</h4>
            <p className="text-gray-600">Encaissement des loyers, gestion des dépôts de garantie et envoi de rapports financiers réguliers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Settings className="h-12 w-12 text-secondary mb-4" />
            <h4 className="text-xl font-semibold mb-3">Entretien et maintenance</h4>
            <p className="text-gray-600">Coordination des réparations, suivi des travaux et gestion des prestataires.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Scale className="h-12 w-12 text-secondary mb-4" />
            <h4 className="text-xl font-semibold mb-3">Conformité légale</h4>
            <p className="text-gray-600">Veille juridique pour garantir le respect des réglementations en vigueur.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-lg mb-6">
            Faire appel à notre service de gérance locative, c'est bénéficier d'un accompagnement sur mesure, d'une tranquillité d'esprit et d'un rendement optimisé pour vos investissements immobiliers.
          </p>
          <Button 
            onClick={scrollToContact}
            className="bg-secondary text-primary hover:bg-secondary/90 transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Contactez-nous
          </Button>
        </div>
      </div>
    </div>
  );
};