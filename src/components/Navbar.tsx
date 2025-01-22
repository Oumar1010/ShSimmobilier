import { useState } from "react";
import { Menu, X, Home, Briefcase, Calendar, User, Mail, Phone, Search, LogIn } from "lucide-react";
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
    name: "Contact",
    href: "/#contact",
    icon: Mail,
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="bg-[#002E5D] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Left section with logo and login */}
          <div className="flex flex-col items-start">
            {/* Logo */}
            <a href="/" className="block pt-2">
              <img
                src="/lovable-uploads/14905b3c-b496-4a89-a553-9f9a13204bc6.png"
                alt="SHS Immobilier"
                className="h-16 w-auto transform hover:scale-105 transition-transform duration-300"
              />
            </a>
            {/* Login Button */}
            <a
              href="/auth"
              className="mt-2 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 group"
            >
              <LogIn className="w-5 h-5 text-[#FFD700] group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Connexion</span>
            </a>
          </div>
          
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
                <a
                  key={item.name}
                  href="https://wa.me/+221772090577"
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
                  className="flex items-center space-x-2 text-white hover:text-[#FFD700] transition-colors duration-300 group relative"
                >
                  <item.icon className="h-5 w-5 group-hover:text-[#FFD700] transition-colors duration-300" />
                  <span className="font-medium after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#FFD700] after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">{item.name}</span>
                </a>
              )
            ))}
            <a href="tel:+221772090577" className="hidden lg:flex">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 hover:text-[#FFD700] transition-all duration-300"
              >
                <Phone className="mr-2 h-4 w-4" />
                +221 77 209 05 77
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
            {/* Login button for mobile */}
            <a
              href="/auth"
              className="flex items-center space-x-3 text-white hover:text-[#FFD700] py-3 px-4 rounded-lg transition-colors duration-300 bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="h-6 w-6 text-[#FFD700]" />
              <span className="font-medium text-lg">Connexion</span>
            </a>

            {menuItems.map((item) => (
              item.isButton ? (
                <a
                  key={item.name}
                  href="https://wa.me/+221772090577"
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
            <a href="tel:+221772090577" className="block">
              <Button 
                variant="ghost"
                className="w-full text-white hover:bg-white/10 hover:text-[#FFD700] transition-all duration-300"
              >
                <Phone className="mr-2 h-4 w-4" />
                +221 77 209 05 77
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};