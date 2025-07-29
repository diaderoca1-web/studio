import { notFound } from "next/navigation";
import Image from "next/image";
import { scratchCards } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CoinIcon from "@/components/icons/coin-icon";
import TrophyIcon from "@/components/icons/trophy-icon";
import { CheckCircle } from "lucide-react";

export default function ScratchCardPage({ params }: { params: { slug: string } }) {
  const card = scratchCards.find((c) => c.slug === params.slug);

  if (!card) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 pb-24">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                <Image 
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className="object-cover"
                  data-ai-hint={card.aiHint}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-4 flex flex-col justify-end">
                    <h2 className="text-white text-2xl font-bold">Scratch Here!</h2>
                 </div>
              </div>
              <Button size="lg" className="w-full mt-6 text-lg h-14">
                <div className="flex gap-2 justify-between items-center w-full">
                    <div className="flex gap-2 items-center font-bold">
                        <CoinIcon className="size-6" />
                        <span>Play Now</span>
                    </div>
                    <div className="bg-background/20 rounded-md px-3 py-1.5 flex items-center gap-1.5 text-white text-base">
                        <span>R$</span>
                        <span>{card.cost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div id="rewards">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><TrophyIcon className="text-amber-500 size-6" /> Prizes</h2>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <CheckCircle className="text-primary size-5" />
                           <span className="font-medium">Prize Level {i + 1}</span>
                        </div>
                        <span className="font-bold text-lg">
                            R$ {(card.prizeAmount / (2**i)).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                    </CardContent>
                </Card>
            ))}
             <Card>
                <CardHeader>
                    <CardTitle>How to Play</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                    <p>1. Click "Play Now" to buy a card.</p>
                    <p>2. Use your mouse or finger to scratch the designated area.</p>
                    <p>3. Match three symbols to win the corresponding prize!</p>
                    <p>4. Winnings are instantly credited to your account.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
    return scratchCards.map((card) => ({
      slug: card.slug,
    }));
}
