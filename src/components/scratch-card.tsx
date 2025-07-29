"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
import CoinIcon from "./icons/coin-icon";
import TrophyIcon from "./icons/trophy-icon";

interface ScratchCardProps {
  card: {
    slug: string;
    title: string;
    prizeAmount: number;
    cost: number;
    imageUrl: string;
    aiHint?: string;
  };
}

export default function ScratchCard({ card }: ScratchCardProps) {
  return (
    <div className="bg-card text-card-foreground flex flex-col rounded-xl border border-primary/20 p-4 shadow-lg gap-4 group transition-all duration-300 select-none hover:border-primary">
      <div className="w-full aspect-video overflow-hidden rounded-md">
        <Image
          src={card.imageUrl}
          alt={card.title}
          width={400}
          height={160}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={card.aiHint}
        />
      </div>

      <div className="flex flex-col">
        <h1 className="font-semibold text-lg">{card.title}</h1>
        <h2 className="text-xs text-amber-400 font-medium opacity-90 uppercase">
          Prêmios de até R$&nbsp;
          {card.prizeAmount.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </h2>
      </div>

      <div className="flex items-end sm:items-center justify-between mt-auto">
        <Link href={`/raspadinhas/${card.slug}`}>
          <Button className="h-11">
            <div className="flex gap-2 justify-between items-center w-full">
              <div className="flex gap-1 items-center font-semibold">
                <CoinIcon />
                <span>Jogar</span>
              </div>
              <div className="bg-background/20 rounded-md px-2 py-1 flex items-center gap-1 text-white text-xs">
                <span>R$</span>
                {card.cost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </Button>
        </Link>
        <Link
          href={`/raspadinhas/${card.slug}#rewards`}
          className="group/rewards-link sm:pt-3 pb-0.5 sm:pb-0 flex items-center gap-1.5 text-tiny font-semibold cursor-pointer hover:text-primary active:text-primary active:scale-95 transition-all duration-200"
        >
          <TrophyIcon className="group-hover/rewards-link:animate-wiggle size-3 sm:size-4 text-amber-500" />
          <span className="text-muted-foreground group-hover/rewards-link:text-primary">VER PRÊMIOS</span>
          <MoveRight className="size-3 text-muted-foreground group-hover/rewards-link:text-primary" />
        </Link>
      </div>
    </div>
  );
}
