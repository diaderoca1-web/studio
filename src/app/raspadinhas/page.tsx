import RecentWinners from "@/components/home/recent-winners";
import ScratchCard from "@/components/scratch-card";
import { scratchCards } from "@/lib/data";

export default function AllScratchCardsPage() {
  return (
    <>
      <div className="container mx-auto py-12">
        <div className="py-4">
          <RecentWinners />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {scratchCards.map((card) => (
            <ScratchCard key={card.slug} card={card} />
          ))}
        </div>
      </div>
    </>
  );
}
