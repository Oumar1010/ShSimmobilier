import { Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img
              src="/lovable-uploads/14905b3c-b496-4a89-a553-9f9a13204bc6.png"
              alt="SHS Immobilier"
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm">
              Votre partenaire immobilier de confiance au Sénégal
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +33 7 69 31 65 58
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                contact@shs-immobilier.com
              </p>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Dakar, Sénégal
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <div className="space-y-2">
              <a href="#services" className="block hover:text-secondary transition-colors">
                Nos Services
              </a>
              <a href="#contact" className="block hover:text-secondary transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SHS Immobilier. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};