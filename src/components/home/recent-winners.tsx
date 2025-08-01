
"use client";

import Image from "next/image";
import { recentWinners } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import LiveIcon from "@/components/icons/live-icon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function RecentWinners() {
  return (
    <div className="flex items-center gap-4 overflow-hidden">
      <div className="flex items-center justify-center">
        <LiveIcon className="size-8" />
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {recentWinners.map((winner, index) => (
            <CarouselItem key={index} className="basis-auto md:basis-1/3 lg:basis-1/5">
               <Card className="bg-secondary border-none">
                <CardContent className="p-2 flex items-center gap-3">
                  <div className="relative size-10 flex-shrink-0">
                    {winner.imageUrl && (
                      <Image
                        src={winner.imageUrl}
                        alt={winner.prizeName}
                        fill
                        className="object-contain"
                        data-ai-hint={winner.aiHint}
                      />
                    )}
                  </div>
                  <div className="flex flex-col text-xs overflow-hidden">
                    <span className="font-medium text-amber-400/95 overflow-hidden text-nowrap text-ellipsis">
                      {winner.winnerName}
                    </span>
                    <h1 className="font-medium text-muted-foreground overflow-hidden text-nowrap text-ellipsis">
                      {winner.prizeName}
                    </h1>
                    <span className="font-semibold">
                      <span className="text-primary">R$ </span>
                      {winner.prizeValue.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
