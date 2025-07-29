"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { heroBanners } from "@/lib/data";

export default function HeroCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
      )

  return (
    <section className="group/hero relative">
      <Carousel 
        className="md:rounded-lg overflow-hidden"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
            loop: true,
        }}
      >
        <CarouselContent>
          {heroBanners.map((banner, index) => (
            <CarouselItem key={index}>
              <Link href="/raspadinhas">
                <div className="aspect-[7/2] w-full relative overflow-hidden rounded-lg">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.alt}
                    fill
                    className="object-cover transition-all"
                    data-ai-hint={banner.aiHint}
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/hero:opacity-100 transition-opacity" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/hero:opacity-100 transition-opacity" />
      </Carousel>
    </section>
  );
}
