import { useState } from "react";
import { Menu, X, Phone, Home, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    name: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    name: "Services",
    href: "/#services",
    icon: Calendar,
  },
  {
    name: "À propos",
    href: "/#about",
    icon: Info,
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex-shrink-0 flex items-center">
            <a href="/">
              <img
                src="/lovable-uploads/14905b3c-b496-4a89-a553-9f9a13204bc6.png"
                alt="SHS Immobilier"
                className="h-20 w-auto transform hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-secondary/10 group
                  ${index === 0 ? 'hover:text-blue-600' : 
                    index === 1 ? 'hover:text-green-600' : 
                    'hover:text-orange-600'}`}
              >
                <item.icon className={`h-5 w-5 transition-colors duration-300
                  ${index === 0 ? 'group-hover:text-blue-600' : 
                    index === 1 ? 'group-hover:text-green-600' : 
                    'group-hover:text-orange-600'}`} />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
            <a href="tel:+33769316558">
              <Button className="bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
                <Phone className="mr-2 h-4 w-4" />
                +33 7 69 31 65 58
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-secondary p-2 transition-colors duration-300"
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
            {menuItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300
                  ${index === 0 ? 'hover:text-blue-600 hover:bg-blue-50' : 
                    index === 1 ? 'hover:text-green-600 hover:bg-green-50' : 
                    'hover:text-orange-600 hover:bg-orange-50'}`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            ))}
            <a href="tel:+33769316558" className="block w-full">
              <Button className="w-full mt-4 bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
                <Phone className="mr-2 h-4 w-4" />
                +33 7 69 31 65 58
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};