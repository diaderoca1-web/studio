"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { recentWinners } from "@/lib/data";
import Logo from "../icons/logo";

export default function RecentWinners() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, playOnInit: true })
  );

  return (
    <div className="flex items-center">
      <Logo className="w-24 h-auto hidden sm:block" />
      <Carousel
        className="w-full overflow-hidden list-shadow"
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2">
          {recentWinners.map((winner, index) => (
            <CarouselItem key={index} className="basis-auto pl-4">
              <Card className="w-48 cursor-pointer hover:bg-secondary transition-colors">
                <CardContent className="flex items-center gap-3 p-2">
                  <div className="relative size-10 flex-shrink-0">
                    <Image
                      src={winner.imageUrl}
                      alt={winner.prizeName}
                      height={40}
                      width={40}
                      className="object-contain size-full"
                      data-ai-hint={winner.aiHint}
                    />
                  </div>
                  <div className="flex flex-col text-xs overflow-hidden">
                    <span className="font-medium text-amber-500 overflow-hidden text-nowrap text-ellipsis">
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
