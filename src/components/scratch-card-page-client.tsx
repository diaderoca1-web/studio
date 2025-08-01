
'use client';
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, RefreshCw, WandSparkles } from "lucide-react";
import ScratchGame, { ScratchGameRef } from "@/components/scratch-game";
import type { ScratchCardType } from "@/lib/data";
import CoinIcon from "./icons/coin-icon";

export default function ScratchCardPageClient({ card }: { card: ScratchCardType }) {
  const scratchGameRef = useRef<ScratchGameRef>(null);

  const handlePurchaseClick = () => {
    scratchGameRef.current?.purchase();
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="md:col-span-1">
          <ScratchGame
            ref={scratchGameRef}
            cardTitle={card.title}
            cost={card.cost}
            purchaseImageUrl="https://ik.imagekit.io/azx3nlpdu/TELA%202.png?updatedAt=1751849389437"
          />
        </div>

        <div className="md:col-span-1 space-y-6">
            <div className="hidden md:block w-full aspect-video relative rounded-lg overflow-hidden">
                <Image 
                    src="https://raspagreen.com/deposit_bg.jpg"
                    alt="Pix na Hora"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
      </div>
       <div className="w-full flex justify-start mt-6">
            <div className="flex items-center gap-2 flex-wrap">
                <Button size="lg" className="h-12 bg-lime-400 hover:bg-lime-500 text-black font-bold" onClick={handlePurchaseClick}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <CoinIcon />
                            <span>Comprar</span>
                        </div>
                        <div className="bg-black/80 rounded-md px-3 py-1 hidden sm:flex items-center gap-1 text-white text-sm font-bold ml-4">
                            <span>R$</span>
                            <span>{card.cost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </Button>
                <Button variant="secondary" size="icon" className="h-12 w-12">
                    <Zap className="size-6" />
                </Button>
                <Button variant="secondary" className="h-12 px-4">
                    <RefreshCw className="size-6" />
                    <span className="text-sm font-bold ml-2">Auto</span>
                </Button>
            </div>
        </div>

        <Card className="bg-card/50 mt-6">
            <CardContent className="p-4">
                <div className="flex items-center gap-2">
                    <WandSparkles className="size-5 text-primary" />
                    <p className="text-sm text-muted-foreground"><span className="font-bold text-foreground">Reúna 3 imagens iguais e conquiste seu prêmio!</span> O valor correspondente será creditado automaticamente na sua conta. Se preferir receber o produto físico, basta entrar em contato com o nosso suporte.</p>
                </div>
            </CardContent>
        </Card>

        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Prêmios da Raspadinha:</h2>
            {/* Placeholder for prizes grid */}
        </div>

    </div>
  );
}
