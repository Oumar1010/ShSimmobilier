import { Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-4">
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +221 77 209 05 77
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                contact@shs-immobilier.com
              </p>
              <div className="space-y-2">
                <p className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="block text-sm text-white/80">Sénégal :</strong>
                    Arafat, Rufisque
                  </span>
                </p>
                <p className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="block text-sm text-white/80">France :</strong>
                    72 R. de Turbigo, 75003 Paris
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <div className="space-y-2">
              <a href="#services" className="block hover:text-secondary transition-colors">
                Nos Services
              </a>
              <a href="#appointment" className="block hover:text-secondary transition-colors">
                Prendre Rendez-vous
              </a>
              <a href="#contact" className="block hover:text-secondary transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-center md:text-left">
              Votre partenaire immobilier de confiance au Sénégal et en France
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center space-y-4">
          <img
            src="/lovable-uploads/fb3c80c7-008e-4d57-9bc4-3b98f0e8271e.png"
            alt="SHS Immobilier"
            className="h-16 w-auto"
          />
          <p className="text-sm">&copy; {new Date().getFullYear()} SHS Immobilier. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};