
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavItem } from "./types";
import { useNavigate } from "react-router-dom";
import { X, Menu as MenuIcon } from "lucide-react";
import { SearchBar } from "./SearchBar";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  menuItems: NavItem[];
  onNavigate: (href: string, e?: React.MouseEvent) => void;
  onAppointment: () => void;
}

export const MobileMenu = ({
  isOpen,
  setIsOpen,
  menuItems,
  onNavigate,
  onAppointment,
}: MobileMenuProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-[#FFD700] p-2 rounded-md transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu slide-in panel */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-[#002E5D] z-50 transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-4">
          {/* Search bar for mobile */}
          <SearchBar className="mb-6" isMobile={true} />

          <div className="flex-1 space-y-4">
            {menuItems.map((item) =>
              item.isButton ? (
                <Button
                  key={item.name}
                  onClick={onAppointment}
                  className="w-full bg-[#FFD700] text-[#002E5D] hover:bg-[#FFD700]/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold"
                  aria-label="Aller au formulaire de prise de rendez-vous"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ) : (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start flex items-center space-x-3 text-white hover:text-[#FFD700] py-3 px-4 rounded-lg transition-colors duration-300"
                  onClick={(e) => {
                    if (item.href.startsWith("/#")) {
                      onNavigate(item.href, e);
                    } else {
                      navigate(item.href);
                      setIsOpen(false);
                    }
                  }}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="font-medium text-lg">{item.name}</span>
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
