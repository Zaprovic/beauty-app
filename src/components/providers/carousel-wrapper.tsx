"use client";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type props = {
  delay: number;
  children: React.ReactNode;
};

const CarouselWrapper = ({ delay, children }: props) => {
  return (
    <Carousel
      plugins={[Autoplay({ delay, stopOnInteraction: true })]}
      className="mx-auto max-w-5xl"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      {children}
      <div className="mt-8 flex items-center justify-center gap-2">
        <CarouselPrevious className="static mx-1 transform-none" />
        <CarouselNext className="static mx-1 transform-none" />
      </div>
    </Carousel>
  );
};

export default CarouselWrapper;
