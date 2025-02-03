import { Building2, Key, Construction, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppointmentForm } from "@/components/AppointmentForm";
import { LandServices } from "@/components/services/LandServices";
import { PropertyManagement } from "@/components/services/PropertyManagement";
import { ConstructionSupport } from "@/components/services/ConstructionSupport";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { HomeSlider } from "@/components/HomeSlider";
import { ActionBlock } from "@/components/ActionBlock";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollToAppointment = () => {
    const element = document.getElementById('appointment');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with New Slider */}
      <HomeSlider />

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
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-lg">
                  Téléphone: <a href="tel:+221772090577" className="text-primary hover:text-secondary">+221 77 209 05 77</a>
                </p>
                <p className="text-lg">
                  Téléphone: <a href="tel:+221769844092" className="text-primary hover:text-secondary">+221 76 984 40 92</a>
                </p>
              </div>
              <p className="text-lg">
                Email: <a href="mailto:contact@shs-immobilier.com" className="text-primary hover:text-secondary">contact@shs-immobilier.com</a>
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <p className="text-lg">
                    <strong className="text-primary">Sénégal :</strong> Arafat, Rufisque
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <p className="text-lg">
                    <strong className="text-primary">France :</strong> 72 R. de Turbigo, 75003 Paris
                  </p>
                </div>
              </div>
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

      {/* Action Block - Only shown when user is not logged in */}
      {!user && <ActionBlock />}

      <Footer />
    </div>
  );
};

export default Index;