import ScratchCard from "@/components/scratch-card";
import { scratchCards } from "@/lib/data";

export default function AllScratchCardsPage() {
  return (
    <>
      <div className="container mx-auto py-12">
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            All Scratch Cards
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Pick your favorite card and start scratching. Good luck!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scratchCards.map((card) => (
            <ScratchCard key={card.slug} card={card} />
          ))}
        </div>
      </div>
      <div className="h-24 md:hidden" />
    </>
  );
}
