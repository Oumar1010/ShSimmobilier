import { Building2, Key, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppointmentForm } from "@/components/AppointmentForm";
import { LandServices } from "@/components/services/LandServices";
import { PropertyManagement } from "@/components/services/PropertyManagement";
import { ConstructionSupport } from "@/components/services/ConstructionSupport";
import { AboutSection } from "@/components/AboutSection";

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
  const scrollToAppointment = () => {
    const element = document.getElementById('appointment');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left space-y-6">
              <h2 className="text-blue-600 text-xl font-semibold">Votre partenaire de confiance !</h2>
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                SHS Immobilier
              </h1>
              <p className="text-xl text-gray-600 font-medium">
                Experts, Visionnaires, Partenaires de Confiance
              </p>
              <div className="space-y-3">
                <p className="text-lg">
                  <a href="tel:+221772090577" className="text-primary hover:text-secondary transition-colors">
                    +221 77 209 05 77
                  </a>
                </p>
                <p className="text-lg">
                  <a href="https://www.shsimmobilier.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors">
                    www.shsimmobilier.com
                  </a>
                </p>
              </div>
              <Button 
                size="lg" 
                className="bg-secondary text-primary hover:bg-secondary/90 mt-4"
                onClick={scrollToAppointment}
              >
                Prendre Rendez-vous
              </Button>
            </div>
            <div className="relative">
              <img
                src="/lovable-uploads/166ef7af-36f9-4995-9b17-e85b15bcbfd2.png"
                alt="SHS Immobilier Sénégal"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Services Overview Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={scrollToAppointment}
                >
                  Prendre Rendez-vous
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services Sections */}
      <LandServices />
      <PropertyManagement />
      <ConstructionSupport />

      {/* Appointment Section */}
      <section id="appointment" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Prendre Rendez-vous</h2>
          <AppointmentForm />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
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
              <Button 
                size="lg" 
                className="bg-[#25D366] hover:bg-[#25D366]/90"
                onClick={() => window.open('https://wa.me/+33769316558', '_blank')}
              >
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
