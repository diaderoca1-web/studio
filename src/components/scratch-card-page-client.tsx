
'use client';
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Play, Square, WandSparkles } from "lucide-react";
import ScratchGame, { ScratchGameRef } from "@/components/scratch-game";
import type { ScratchCardType } from "@/lib/data";
import CoinIcon from "./icons/coin-icon";
import RecentWinners from "./home/recent-winners";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const prizes = [
  { name: '1.000 Reais', value: 1000.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/1K.png?updatedAt=1752865094958' },
  { name: '700 Reais', value: 700.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/700.png?updatedAt=1752856623225' },
  { name: '500 Reais', value: 500.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/500-REAIS.png?updatedAt=1752856623150' },
  { name: '200 Reais', value: 200.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/200-REAIS.png?updatedAt=1752865094953' },
  { name: 'Smartwatch D20 Shock', value: 80.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/item_smartwatch_d20_shock.png?updatedAt=1751634892443' },
  { name: '100 Reais', value: 100.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/100%20REAIS.png?updatedAt=1752047821876' },
  { name: 'PowerBank', value: 70.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/banner/01K0F5KTMSEJBQF1STFZ4BCKXM.png' },
  { name: '50 Reais', value: 50.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/50%20REAIS.png?updatedAt=1752047821745' },
  { name: '20 Reais', value: 20.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/20%20REAIS.png?updatedAt=1752047821716' },
  { name: '15 Reais', value: 15.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/15%20REAIS.png?updatedAt=1752047821835' },
  { name: '10 Reais', value: 10.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/10%20REAIS.png?updatedAt=1752047821681' },
  { name: '5 Reais', value: 5.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/5%20REAIS.png?updatedAt=1752047821734' },
  { name: '4 Reais', value: 4.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/4%20REAIS.png?updatedAt=1752047821875' },
  { name: '3 Reais', value: 3.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/3%20REAIS.png?updatedAt=1752047821897' },
  { name: '2 Reais', value: 2.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/2%20REAIS.png?updatedAt=1752047821644' },
  { name: '1 Real', value: 1.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/1%20REAL.png?updatedAt=1752047821586' },
  { name: '50 Centavos', value: 0.50, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/50-CENTAVOS-2.png?updatedAt=1752864509979' },
];


export default function ScratchCardPageClient({ card }: { card: ScratchCardType }) {
  const scratchGameRef = useRef<ScratchGameRef>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleAutoPlay = async () => {
    if (!scratchGameRef.current) return;
    
    await scratchGameRef.current.purchase();
    await sleep(200);
    await scratchGameRef.current.reveal();
    await sleep(1000); // Wait for the win/loss message to be visible
    await scratchGameRef.current.reset();
  };
  
  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  }

  useEffect(() => {
    const startAutoPlay = () => {
        handleAutoPlay(); // Run once immediately
        autoPlayIntervalRef.current = setInterval(handleAutoPlay, 5000);
    }
  
    const stopAutoPlay = () => {
       if (autoPlayIntervalRef.current) {
          clearInterval(autoPlayIntervalRef.current);
          autoPlayIntervalRef.current = null;
          scratchGameRef.current?.reset();
        }
    }

    if (isAutoPlaying) {
        startAutoPlay();
    } else {
        stopAutoPlay();
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlaying]);


  return (
    <div className="container mx-auto p-4 max-w-6xl">
        <div className="py-4">
            <RecentWinners />
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="md:col-span-1">
          <ScratchGame
            ref={scratchGameRef}
            cardTitle={card.title}
            cost={card.cost}
            purchaseImageUrl="https://ik.imagekit.io/azx3nlpdu/TELA%202.png?updatedAt=1751849389437"
            onReveal={() => {
                // After revealing, wait a bit then reset, only if we are NOT in auto-play mode
                 if (!isAutoPlaying) {
                    setTimeout(() => {
                        scratchGameRef.current?.reset();
                    }, 4000);
                }
            }}
          />
        </div>
        <div className="hidden md:block">
            <div className="aspect-[4/3] w-full relative overflow-hidden rounded-lg">
                <Image 
                    src="https://ik.imagekit.io/azx3nlpdu/PIX%20NA%20HORA!.png?updatedAt=1752535505054"
                    alt="Pix na Hora"
                    fill
                    className="object-contain"
                />
            </div>
        </div>
      </div>
      <div className="w-full flex justify-start mt-6">
        <div className="flex items-center gap-2 flex-wrap">
            <Button className="h-12" onClick={() => scratchGameRef.current?.purchase()} disabled={isAutoPlaying}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <CoinIcon />
                        <span>Comprar</span>
                    </div>
                    <div className="bg-black/80 rounded-md px-3 py-1 flex items-center gap-1 text-white text-sm font-bold ml-2 sm:ml-4">
                        <span>R$</span>
                        <span>{card.cost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </Button>
            <Button variant="secondary" size="icon" className="h-12 w-12" onClick={() => scratchGameRef.current?.reveal()} disabled={isAutoPlaying}>
                <Zap className="size-6" />
            </Button>
            <Button variant="secondary" className="h-12 px-4" onClick={toggleAutoPlay}>
                {isAutoPlaying ? <Square className="size-6" /> : <Play className="size-6" />}
                <span className="text-sm font-bold ml-2">
                      {isAutoPlaying ? 'Parar' : 'Auto'}
                </span>
            </Button>
        </div>
      </div>
       <Card className="bg-card/50 mt-6">
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <WandSparkles className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                        <span className="font-bold text-primary">Reúna 3 imagens iguais e conquiste seu prêmio!</span>
                        <br />
                        O valor correspondente será creditado automaticamente na sua conta. Se preferir receber o produto físico, basta entrar em contato com o nosso suporte.
                    </p>
                </div>
            </CardContent>
        </Card>

        <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Prêmios da Raspadinha:</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {prizes.map((prize, index) => (
                    <Card key={index} className="bg-card/70 border-none flex flex-col items-center p-4 text-center">
                        <div className="relative w-24 h-24 mb-4">
                            <Image src={prize.imageUrl} alt={prize.name} fill className="object-contain" />
                        </div>
                        <p className="font-semibold text-sm mb-2 h-10 flex items-center">{prize.name}</p>
                        <div className="mt-auto w-full">
                           <div className="bg-white text-background font-semibold py-1 px-1.5 rounded-sm text-sm">
                                R$ {prize.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                           </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>

    </div>
  );
}
