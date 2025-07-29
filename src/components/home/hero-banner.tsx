"use client";

import Image from "next/image";
import Link from "next/link";
import { heroBanners } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HeroBanner() {
  return (
    <section className="relative group/hero">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {heroBanners.map((banner, index) => (
            <CarouselItem key={index}>
              <Link href="/raspadinhas">
                <div className="aspect-video w-full relative overflow-hidden rounded-lg">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.alt}
                    fill
                    className="object-contain"
                    data-ai-hint={banner.aiHint}
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="opacity-0 group-hover/hero:opacity-100 transition-opacity left-4" />
        <CarouselNext className="opacity-0 group-hover/hero:opacity-100 transition-opacity right-4" />
      </Carousel>
    </section>
  );
}
