import { Building2, Key, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppointmentForm } from "@/components/AppointmentForm";
import { LandServices } from "@/components/services/LandServices";
import { PropertyManagement } from "@/components/services/PropertyManagement";
import { ConstructionSupport } from "@/components/services/ConstructionSupport";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsList } from "@/components/projects/ProjectsList";

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
      <section className="relative bg-primary h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/lovable-uploads/fb3c80c7-008e-4d57-9bc4-3b98f0e8271e.png"
            alt="Immobilier au Sénégal"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Votre Avenir Immobilier au Sénégal
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Expertise locale, vision internationale
          </p>
          <Button 
            size="lg" 
            className="bg-secondary text-primary hover:bg-secondary/90 animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
            onClick={() => {
              const servicesSection = document.getElementById('services');
              servicesSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Découvrez nos services
          </Button>
        </div>
      </section>

      {/* Services Overview Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.title} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={scrollToAppointment}
                >
                  En savoir plus
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Presentation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/lovable-uploads/166ef7af-36f9-4995-9b17-e85b15bcbfd2.png"
                alt="SHS Immobilier Présentation"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                SHS Immobilier
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Experts, Visionnaires, Partenaires de Confiance
              </p>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Contactez-nous au{" "}
                  <a href="tel:+221772090577" className="text-primary hover:text-secondary transition-colors">
                    +221 77 209 05 77
                  </a>
                </p>
                <Button 
                  size="lg" 
                  className="bg-secondary text-primary hover:bg-secondary/90"
                  onClick={scrollToAppointment}
                >
                  Prendre Rendez-vous
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Projets Immobiliers</h2>
          <ProjectsList />
        </div>
      </section>

      {/* Detailed Services Sections */}
      <LandServices />
      <PropertyManagement />
      <ConstructionSupport />

      {/* About Section */}
      <AboutSection />

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
                Téléphone: <a href="tel:+221772090577" className="text-primary hover:text-secondary">+221 77 209 05 77</a>
              </p>
              <p className="text-lg">
                Email: <a href="mailto:contact@shs-immobilier.com" className="text-primary hover:text-secondary">contact@shs-immobilier.com</a>
              </p>
              <Button 
                size="lg" 
                className="bg-[#25D366] hover:bg-[#25D366]/90"
                onClick={() => window.open('https://wa.me/+221772090577', '_blank')}
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
