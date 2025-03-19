
import { Button } from "@/components/ui/button";
import { NavItem } from "./types";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";

interface DesktopMenuProps {
  menuItems: NavItem[];
  onNavigate: (href: string, e?: React.MouseEvent) => void;
  onAppointment: () => void;
}

export const DesktopMenu = ({ menuItems, onNavigate, onAppointment }: DesktopMenuProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="hidden md:flex items-center space-x-6">
      {/* Search bar */}
      <SearchBar className="relative" />

      {menuItems.map((item) =>
        item.isButton ? (
          <Button
            key={item.name}
            onClick={onAppointment}
            className="bg-[#FFD700] text-[#002E5D] hover:bg-[#FFD700]/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold"
            aria-label="Aller au formulaire de prise de rendez-vous"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Button>
        ) : (
          <Button
            key={item.name}
            variant="ghost"
            className="flex items-center space-x-2 text-white hover:text-[#FFD700] hover:bg-black transition-all duration-300 group relative"
            onClick={(e) =>
              item.href.startsWith("/#")
                ? onNavigate(item.href, e)
                : navigate(item.href)
            }
          >
            <item.icon className="h-5 w-5 group-hover:text-[#FFD700] transition-colors duration-300" />
            <span className="font-medium after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#FFD700] after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
              {item.name}
            </span>
          </Button>
        )
      )}
    </div>
  );
};
