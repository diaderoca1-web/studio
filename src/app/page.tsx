import Link from "next/link";
import { Flame, MoveRight } from "lucide-react";
import { scratchCards } from "@/lib/data";
import HeroBanner from "@/components/home/hero-banner";
import RecentWinners from "@/components/home/recent-winners";
import ScratchCard from "@/components/scratch-card";

export default function Home() {
  const highlightedCards = scratchCards.slice(0, 6);

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="flex flex-col">
        <HeroBanner />
        <div className="py-2">
            <RecentWinners />
        </div>

        <section className="flex flex-col gap-2 pt-2">
          <div className="flex justify-between items-center">
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <Flame className="text-primary animate-bounce" />
              Destaques
            </h1>
            <Link
              href="/raspadinhas"
              className="flex items-center gap-2 font-medium text-sm hover:text-primary transition-colors"
            >
              Ver mais
              <MoveRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightedCards.map((card) => (
              <ScratchCard key={card.slug} card={card} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
