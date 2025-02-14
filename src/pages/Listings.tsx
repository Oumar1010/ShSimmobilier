
import { Footer } from "@/components/Footer";
import { ListingsGrid } from "@/components/listings/ListingsGrid";

const Listings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-12">
            Nos Annonces Immobilières
          </h1>
          <ListingsGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Listings;
