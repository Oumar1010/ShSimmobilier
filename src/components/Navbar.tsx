import { useState } from "react";
import { Menu, X, Home, Briefcase, Calendar, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    name: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    name: "Nos Services",
    href: "/#services",
    icon: Briefcase,
  },
  {
    name: "Prendre Rendez-vous",
    href: "/#appointment",
    icon: Calendar,
    isButton: true,
  },
  {
    name: "Connexion",
    href: "/auth",
    icon: User,
  },
  {
    name: "Contact",
    href: "/#contact",
    icon: Mail,
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#002E5D] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="block">
              <img
                src="/lovable-uploads/14905b3c-b496-4a89-a553-9f9a13204bc6.png"
                alt="SHS Immobilier"
                className="h-16 w-auto transform hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              item.isButton ? (
                <a
                  key={item.name}
                  href="https://wa.me/+33769316558"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    className="bg-[#FFD700] text-[#002E5D] hover:bg-[#FFD700]/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </a>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-white hover:text-[#FFD700] transition-colors duration-300 group"
                >
                  <item.icon className="h-5 w-5 group-hover:text-[#FFD700] transition-colors duration-300" />
                  <span className="font-medium">{item.name}</span>
                </a>
              )
            ))}
            <a href="tel:+33769316558" className="hidden lg:block">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#002E5D] transition-all duration-300"
              >
                <Phone className="mr-2 h-4 w-4" />
                +33 7 69 31 65 58
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#FFD700] p-2 rounded-md transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-[#002E5D] z-50 transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-4">
          <div className="flex-1 space-y-4">
            {menuItems.map((item) => (
              item.isButton ? (
                <a
                  key={item.name}
                  href="https://wa.me/+33769316558"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  onClick={() => setIsOpen(false)}
                >
                  <Button 
                    className="w-full bg-[#FFD700] text-[#002E5D] hover:bg-[#FFD700]/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </a>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-white hover:text-[#FFD700] py-3 px-4 rounded-lg transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="font-medium text-lg">{item.name}</span>
                </a>
              )
            ))}
          </div>
          <div className="pt-6 border-t border-white/10">
            <a href="tel:+33769316558" className="block">
              <Button 
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-[#002E5D] transition-all duration-300"
              >
                <Phone className="mr-2 h-4 w-4" />
                +33 7 69 31 65 58
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};