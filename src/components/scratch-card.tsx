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
    <div className="bg-card text-card-foreground flex flex-col rounded-xl border border-primary/20 p-2 shadow-lg gap-2 group transition-all duration-300 select-none hover:border-primary">
      <div className="w-full aspect-video overflow-hidden rounded-md">
        <Image
          src={card.imageUrl}
          alt={card.title}
          width={400}
          height={225}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={card.aiHint}
        />
      </div>

      <div className="flex flex-col px-1">
        <h1 className="font-semibold text-base">{card.title}</h1>
        <h2 className="text-xs text-amber-400 font-bold opacity-90">
          PRÊMIOS DE ATÉ R$&nbsp;
          {card.prizeAmount.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </h2>
      </div>

      <div className="flex items-center justify-between mt-auto px-1 pb-1">
        <Link href={`/raspadinhas/${card.slug}`} className="flex-1">
          <Button className="h-10 w-full justify-between px-2">
            <div className="flex gap-1.5 items-center font-semibold">
              <CoinIcon className="size-5" />
              <span>Jogar</span>
            </div>
            <div className="bg-black/80 rounded-md px-3 py-1 flex items-center gap-1 text-white text-sm font-bold">
              <span>R$</span>
              <span>{card.cost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
          </Button>
        </Link>
        <Link
          href={`/raspadinhas/${card.slug}#rewards`}
          className="group/rewards-link flex items-center gap-1.5 text-xs font-semibold cursor-pointer hover:text-primary active:text-primary active:scale-95 transition-all duration-200 pl-4 flex-shrink-0"
        >
          <TrophyIcon className="group-hover/rewards-link:animate-wiggle size-4 text-amber-500" />
          <span className="text-muted-foreground group-hover/rewards-link:text-primary">VER PRÊMIOS</span>
          <MoveRight className="size-3 text-muted-foreground group-hover/rewards-link:text-primary" />
        </Link>
      </div>
    </div>
  );
}
