
import { notFound } from "next/navigation";
import Image from "next/image";
import { scratchCards } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CoinIcon from "@/components/icons/coin-icon";
import TrophyIcon from "@/components/icons/trophy-icon";
import { CheckCircle } from "lucide-react";
import ScratchGame from "@/components/scratch-game";
import RecentWinners from "@/components/home/recent-winners";

export default function ScratchCardPage({ params }: { params: { slug: string } }) {
  const card = scratchCards.find((c) => c.slug === params.slug);

  if (!card) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto py-8 max-w-2xl">
        <div className="py-4">
            <RecentWinners />
        </div>
        <div className="grid grid-cols-1 gap-8">
          <div>
            <Card className="overflow-hidden border-none shadow-2xl shadow-primary/10">
              <CardHeader className="p-4">
                <CardTitle className="text-2xl">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-0">
                <ScratchGame cardTitle={card.title} />
                <Button size="lg" className="w-full mt-4 text-lg h-14">
                  <div className="flex gap-2 justify-between items-center w-full">
                      <div className="flex gap-2 items-center font-bold">
                          <CoinIcon className="size-6" />
                          <span>Comprar</span>
                      </div>
                      <div className="bg-background/20 rounded-md px-3 py-1.5 flex items-center gap-1.5 text-white text-base font-bold">
                          <span>R$</span>
                          <span>{card.cost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                      </div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
    return scratchCards.map((card) => ({
      slug: card.slug,
    }));
}
