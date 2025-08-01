
'use client';
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Play, Square, WandSparkles, Users, Copy, Check } from "lucide-react";
import ScratchGame, { ScratchGameRef } from "@/components/scratch-game";
import type { ScratchCardType } from "@/lib/data";
import CoinIcon from "./icons/coin-icon";
import RecentWinners from "./home/recent-winners";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function ScratchCardPageClient({ card }: { card: ScratchCardType }) {
  const scratchGameRef = useRef<ScratchGameRef>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [inviteLink, setInviteLink] = useState("");
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();
  const { user, deductBalance, addBalance } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInviteLink(`${window.location.origin}/lobby/${card.slug}?gameId=${Math.random().toString(36).substring(7)}`);
    }
  }, [card.slug]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
      toast({
        title: "Sucesso!",
        description: "Link de convite copiado para a área de transferência.",
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
       toast({
        title: "Erro",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    });
  };

  const handlePurchase = async () => {
    if (deductBalance(card.cost)) {
        await scratchGameRef.current?.purchase();
    } else {
        toast({
            title: "Saldo Insuficiente",
            description: "Você não tem saldo suficiente para comprar esta raspadinha.",
            variant: "destructive"
        });
    }
  }

  const handleReveal = (result: { isWinner: boolean; prizeValue: number }) => {
    if (result.isWinner) {
        addBalance(result.prizeValue);
        toast({
            title: "Você Ganhou!",
            description: `R$ ${result.prizeValue.toFixed(2)} foi adicionado ao seu saldo.`,
        });
    }

    if (!isAutoPlaying) {
        setTimeout(() => {
            scratchGameRef.current?.reset();
        }, 4000);
    }
  };

  const handleAutoPlay = async () => {
    if (!scratchGameRef.current) return false;
    
    if (!deductBalance(card.cost)) {
        toast({
            title: "Saldo Insuficiente",
            description: "Autoplay parado por falta de saldo.",
            variant: "destructive"
        });
        setIsAutoPlaying(false);
        return false;
    }

    await scratchGameRef.current.purchase();
    await sleep(200);
    await scratchGameRef.current.reveal();
    await sleep(1000); 
    await scratchGameRef.current.reset();
    return true;
  };
  
  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  }

  useEffect(() => {
    if (isAutoPlaying) {
      const runAutoPlay = async () => {
        const canContinue = await handleAutoPlay();
        if (canContinue) {
          autoPlayIntervalRef.current = setTimeout(runAutoPlay, 2000);
        }
      };
      runAutoPlay();
    } else {
      if (autoPlayIntervalRef.current) {
        clearTimeout(autoPlayIntervalRef.current);
        scratchGameRef.current?.reset();
      }
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearTimeout(autoPlayIntervalRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            onPurchaseRequest={handlePurchase}
            onReveal={handleReveal}
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
            <Button className="h-12" onClick={handlePurchase} disabled={isAutoPlaying || !user}>
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
            <Button variant="secondary" size="icon" className="h-12 w-12" onClick={() => scratchGameRef.current?.reveal()} disabled={isAutoPlaying || !user}>
                <Zap className="size-6" />
            </Button>
            <Button variant="secondary" className="h-12 px-4" onClick={toggleAutoPlay} disabled={!user}>
                {isAutoPlaying ? <Square className="size-6" /> : <Play className="size-6" />}
                <span className="text-sm font-bold ml-2">
                      {isAutoPlaying ? 'Parar' : 'Auto'}
                </span>
            </Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="h-12 px-4" disabled={!user}>
                        <Users className="size-6" />
                        <span className="text-sm font-bold ml-2">
                            Jogar com amigo
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Desafie um Amigo e Ganhe!</DialogTitle>
                         <DialogDescription className="text-muted-foreground">
                           Envie o link para seus amigos e chame-os para a diversão!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-4 p-4 bg-secondary border border-border rounded-lg text-center">
                        <p className="text-muted-foreground">A cada 5 amigos que se cadastrarem e jogarem, <span className="text-white">você ganha</span></p>
                        <p className="text-3xl font-bold text-primary mt-1">R$10 no PIX!</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                value={inviteLink}
                                readOnly
                            />
                        </div>
                         <Button type="button" size="icon" className="h-9 w-9" onClick={handleCopyToClipboard}>
                            {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            <span className="sr-only">Copiar</span>
                        </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                       <p className="text-xs text-muted-foreground">O link de convite é válido por 24 horas.</p>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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
                {card.prizes.map((prize, index) => (
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

