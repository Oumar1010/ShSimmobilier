import { Building2, Key, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const services = [
  {
    icon: Building2,
    title: "Achat et Vente de Terrains",
    description: "Trouvez le terrain idéal pour vos projets ou vendez en toute sérénité grâce à notre expertise.",
  },
  {
    icon: Key,
    title: "Gérance et Gestion Locative",
    description: "Simplifiez la gestion de vos biens locatifs avec notre service professionnel et personnalisé.",
  },
  {
    icon: Construction,
    title: "Accompagnement Construction",
    description: "De l'idée à la réalisation, nous vous guidons pour concrétiser vos rêves immobiliers.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Votre Partenaire de Confiance
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Vous avez un projet immobilier en tête ? SHS Immobilier est à vos côtés pour vous accompagner à chaque étape.
            </p>
            <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90">
              Prendre Rendez-vous
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white p-6 rounded-lg shadow-lg">
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Nous Contacter</h2>
            <div className="space-y-4">
              <p className="text-lg">
                Téléphone: <a href="tel:+33769316558" className="text-primary hover:text-secondary">+33 7 69 31 65 58</a>
              </p>
              <p className="text-lg">
                Email: <a href="mailto:contact@shs-immobilier.com" className="text-primary hover:text-secondary">contact@shs-immobilier.com</a>
              </p>
              <Button size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90">
                Nous contacter sur WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;