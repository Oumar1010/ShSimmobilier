import { Award, Building2, Handshake, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
export const AboutSection = () => {
  return <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              
            </div>
            <div className="absolute -bottom-6 -right-6 bg-secondary p-4 rounded-lg shadow-lg">
              <Star className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-primary">
                Mamadou Seck : Le Pilier de SHS Immobilier
              </h2>
              <p className="text-lg text-gray-600 italic">
                "Avec SHS Immobilier, nous transformons vos ambitions en réalité."
              </p>
            </div>

            <div className="space-y-6">
              {/* Leadership Card */}
              <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Award className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        Un leader expérimenté
                      </h3>
                      <p className="text-gray-600">
                        Fort de plus de 10 ans d'expérience, Mamadou Seck s'est spécialisé dans l'achat, la vente, la gestion locative et l'accompagnement des projets de construction. Sa connaissance approfondie du marché sénégalais lui permet d'anticiper et de répondre aux besoins spécifiques de chaque client.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vision Card */}
              <Card className="border-l-4 border-l-secondary hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Building2 className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        Une vision tournée vers l'excellence
                      </h3>
                      <p className="text-gray-600">
                        Sous sa direction, SHS Immobilier s'est imposée comme une référence dans le secteur immobilier grâce à un suivi rigoureux des projets, une expertise locale solide et un engagement constant envers la satisfaction client.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Partnership Card */}
              <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Handshake className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        Votre partenaire de confiance
                      </h3>
                      <p className="text-gray-600">
                        À la tête de SHS Immobilier, Mamadou Seck a constitué une équipe jeune et dynamique pour offrir un service de qualité et un accompagnement personnalisé. Ensemble, ils transforment vos ambitions immobilières en réalité.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>;
};