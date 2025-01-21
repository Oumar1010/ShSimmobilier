import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/lovable-uploads/fb3c80c7-008e-4d57-9bc4-3b98f0e8271e.png"
              alt="SHS Immobilier"
              className="h-12 w-auto"
            />
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-primary hover:text-secondary transition-colors">
              Nos Services
            </a>
            <a href="#contact" className="text-primary hover:text-secondary transition-colors">
              Contact
            </a>
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
            <a
              href="#services"
              className="block px-3 py-2 text-primary hover:text-secondary"
            >
              Nos Services
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-primary hover:text-secondary"
            >
              Contact
            </a>
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