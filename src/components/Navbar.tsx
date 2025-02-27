
import { useState } from "react";
import { Menu, X, Home, Briefcase, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    name: "Annonces",
    href: "/listings",
    icon: Search,
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
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleNavigation = (href: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    
    if (href.startsWith('/#')) {
      const elementId = href.substring(2);
      // Si on n'est pas sur la page d'accueil, naviguer d'abord vers celle-ci
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        setIsOpen(false);
      }
    }
  };

  const scrollToAppointment = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#appointment';
      return;
    }
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-[#002E5D] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/14905b3c-b496-4a89-a553-9f9a13204bc6.png"
              alt="shsimmobilier"
              className="h-16 w-auto transform hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:bg-white/20 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            </form>

            {menuItems.map((item) => (
              item.isButton ? (
                <Button 
                  key={item.name}
                  onClick={scrollToAppointment}
                  className="bg-[#FFD700] text-[#002E5D] hover:bg-[#FFD700]/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold"
                  aria-label="Aller au formulaire de prise de rendez-vous"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href.startsWith('/#') ? item.href.substring(1) : item.href}
                  className="flex items-center space-x-2 text-white hover:text-[#FFD700] transition-colors duration-300 group relative"
                  onClick={(e) => item.href.startsWith('/#') && handleNavigation(item.href, e)}
                >
                  <item.icon className="h-5 w-5 group-hover:text-[#FFD700] transition-colors duration-300" />
                  <span className="font-medium after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#FFD700] after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">{item.name}</span>
                </Link>
              )
            ))}
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
          {/* Search bar for mobile */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="search"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:bg-white/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            </div>
          </form>

          <div className="flex-1 space-y-4">
            {menuItems.map((item) => (
              item.isButton ? (
                <Button 
                  key={item.name}
                  onClick={scrollToAppointment}
                  className="w-full bg-[#FFD700] text-[#002E5D] hover:bg-[#FFD700]/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold"
                  aria-label="Aller au formulaire de prise de rendez-vous"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href.startsWith('/#') ? item.href.substring(1) : item.href}
                  className="flex items-center space-x-3 text-white hover:text-[#FFD700] py-3 px-4 rounded-lg transition-colors duration-300"
                  onClick={(e) => {
                    if (item.href.startsWith('/#')) {
                      handleNavigation(item.href, e);
                    }
                    setIsOpen(false);
                  }}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="font-medium text-lg">{item.name}</span>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
