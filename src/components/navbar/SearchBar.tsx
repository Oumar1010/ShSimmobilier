
import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  className?: string;
  isMobile?: boolean;
}

export const SearchBar = ({ className, isMobile = false }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className={className}>
      <div className="relative">
        <input
          type="search"
          placeholder="Rechercher..."
          className={`${
            isMobile
              ? "w-full"
              : "pl-10 pr-4 py-2 rounded-full"
          } bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:bg-white/20 transition-all duration-300`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70`}
        />
      </div>
    </form>
  );
};
