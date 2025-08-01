
import { notFound } from "next/navigation";
import Image from "next/image";
import { scratchCards } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CoinIcon from "@/components/icons/coin-icon";
import TrophyIcon from "@/components/icons/trophy-icon";
import { CheckCircle, Zap, RefreshCw } from "lucide-react";
import ScratchGame from "@/components/scratch-game";

export default function ScratchCardPage({ params }: { params: { slug: string } }) {
  const card = scratchCards.find((c) => c.slug === params.slug);

  if (!card) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 max-w-lg">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <ScratchGame 
            cardTitle={card.title} 
            cost={card.cost} 
            purchaseImageUrl="https://ik.imagekit.io/azx3nlpdu/TELA%202.png?updatedAt=1751849389437"
          />
        </div>

        <div className="flex items-center gap-2">
            <Button size="lg" className="flex-1 text-lg h-14">
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
            <Button variant="secondary" size="icon" className="h-14 w-14">
                <Zap className="size-6" />
            </Button>
            <Button variant="secondary" size="icon" className="h-14 w-14">
                <RefreshCw className="size-6" />
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <p className="text-muted-foreground">Pressione <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">R</kbd> para comprar.</p>
                </div>
                 <div className="flex items-center justify-between text-sm">
                    <p className="text-muted-foreground">Pressione <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">B</kbd> para revelar.</p>
                </div>
                 <div className="flex items-center justify-between text-sm">
                    <p className="text-muted-foreground">Pressione <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Shift</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">B</kbd> para revelar rápido.</p>
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}

export async function generateStaticParams() {
    return scratchCards.map((card) => ({
      slug: card.slug,
    }));
}
