import { useState } from "react";
import { Menu, X, Phone, Building2, Key, Construction } from "lucide-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Achat et Vente de Terrains",
      href: "#land-services",
      icon: Building2,
    },
    {
      name: "Gérance et Gestion Locative",
      href: "#property-management",
      icon: Key,
    },
    {
      name: "Accompagnement Construction",
      href: "#construction-support",
      icon: Construction,
    },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/lovable-uploads/14905b3c-b496-4a89-a553-9f9a13204bc6.png"
              alt="SHS Immobilier"
              className="h-12 w-auto"
            />
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            ))}
            <Button className="bg-primary text-white hover:bg-primary/90">
              <Phone className="mr-2 h-4 w-4" />
              +33 7 69 31 65 58
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-secondary p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-3 py-2 text-primary hover:text-secondary"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            ))}
            <Button className="w-full mt-4 bg-primary text-white hover:bg-primary/90">
              <Phone className="mr-2 h-4 w-4" />
              +33 7 69 31 65 58
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};