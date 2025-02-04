import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=1920&q=80",
    title: "Votre Partenaire Immobilier au Sénégal",
    subtitle: "Expertise et confiance depuis plus de 10 ans",
  },
  {
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&q=80",
    title: "Des Terrains d'Exception",
    subtitle: "Investissez dans les meilleures zones du Sénégal",
  },
  {
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1920&q=80",
    title: "Construction & Rénovation",
    subtitle: "Réalisez vos projets immobiliers avec excellence",
  },
  {
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=1920&q=80",
    title: "Architecture Moderne",
    subtitle: "Des projets innovants adaptés à vos besoins",
  },
];

export function HomeSlider() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const plugin = Autoplay({ delay: 5000, stopOnInteraction: true });

  return (
    <div className="w-full relative">
      <Carousel
        plugins={[plugin]}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative">
              <div className="relative h-[70vh] w-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transform scale-105 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center animate-fade-in">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-center max-w-2xl animate-fade-in opacity-90">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 border-none text-white" />
        <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 border-none text-white" />
      </Carousel>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}