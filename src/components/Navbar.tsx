
import { useState } from "react";
import { Menu, X, Home, Briefcase, Calendar, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { DesktopMenu } from "./navbar/DesktopMenu";
import { MobileMenu } from "./navbar/MobileMenu";
import { NavItem } from "./navbar/types";
import { useNavigation } from "@/hooks/useNavigation";

const menuItems: NavItem[] = [
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
  const { handleNavigation, scrollToAppointment } = useNavigation();

  const handleMenuItemClick = (href: string, e?: React.MouseEvent) => {
    const handled = handleNavigation(href, e);
    if (handled) {
      setIsOpen(false);
    }
  };

  const handleAppointmentClick = () => {
    scrollToAppointment();
    setIsOpen(false);
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
          <DesktopMenu 
            menuItems={menuItems} 
            onNavigate={handleMenuItemClick}
            onAppointment={handleAppointmentClick}
          />

          {/* Mobile menu */}
          <MobileMenu 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            menuItems={menuItems}
            onNavigate={handleMenuItemClick}
            onAppointment={handleAppointmentClick}
          />
        </div>
      </div>
    </nav>
  );
};
