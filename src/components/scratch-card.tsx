"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
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
    <div className="bg-card text-card-foreground flex flex-col rounded-xl border border-primary/20 shadow-lg group transition-all duration-300 select-none hover:border-primary overflow-hidden">
      <div className="w-full aspect-video">
        <Image
          src={card.imageUrl}
          alt={card.title}
          width={400}
          height={225}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={card.aiHint}
        />
      </div>

      <div className="flex flex-col p-4 flex-grow">
        <div className="flex-grow">
          <h1 className="font-semibold text-base leading-tight truncate">{card.title}</h1>
          <h2 className="text-xs text-amber-400 font-bold opacity-90 leading-tight">
            PRÊMIOS DE ATÉ R$&nbsp;
            {card.prizeAmount.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>

        <div className="flex items-center justify-between mt-4 gap-2">
          <Link href={`/raspadinhas/${card.slug}`} className="flex-1">
            <Button className="h-9 w-full justify-between px-2">
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
            className="group/rewards-link flex items-center gap-1 text-xs font-semibold cursor-pointer hover:text-primary active:text-primary active:scale-95 transition-all duration-200"
          >
            <TrophyIcon className="group-hover/rewards-link:animate-wiggle size-4 text-amber-500" />
            <span className="text-muted-foreground group-hover/rewards-link:text-primary text-tiny whitespace-nowrap">VER PRÊMIOS</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
