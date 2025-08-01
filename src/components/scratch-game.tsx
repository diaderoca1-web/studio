
'use client';

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import CoinIcon from './icons/coin-icon';
import { PrizeType } from '@/lib/data';
import { useSettings } from '@/contexts/settings-context';

// Simple shuffle function
const shuffle = <T,>(array: T[]): T[] => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
};

export type GameResult = {
    grid: { name: string, imageUrl: string }[];
    winningSymbol: string | null;
    isWinner: boolean;
    prizeValue: number;
    prizeName: string | null;
    prizeImageUrl: string | null;
};

interface ScratchGameProps {
    cardTitle: string;
    cost: number;
    purchaseImageUrl: string;
    onPurchaseRequest: () => void;
    onReveal?: (result: GameResult) => void;
    onReset?: () => void;
    prizes: PrizeType[];
}

export interface ScratchGameRef {
  purchase: () => Promise<void>;
  reveal: () => Promise<void>;
  reset: () => Promise<void>;
}

const ScratchGame = forwardRef<ScratchGameRef, ScratchGameProps>(({ cost, purchaseImageUrl, onPurchaseRequest, onReveal, onReset, prizes }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [game, setGame] = useState<GameResult | null>(null);
    const [scratchedPercentage, setScratchedPercentage] = useState(0);
    const [isPurchased, setIsPurchased] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const { settings } = useSettings();
    
    // Generate a grid for the game
    const generateGrid = (): GameResult => {
         if (!prizes || prizes.length === 0) {
            return generateLosingGrid(true); // Force generic grid if no prizes
        }
        
        const isWinner = Math.random() < (settings.winProbability / 100);

        if (isWinner) {
             // Weighted random prize selection to respect RTP
            const totalValue = prizes.reduce((sum, prize) => sum + prize.value, 0);
            const weights = prizes.map(prize => ({
                ...prize,
                // Inverse weight: higher value = lower probability, but ensure non-zero weight
                weight: totalValue / (prize.value || 0.01) 
            }));
            const totalWeight = weights.reduce((sum, prize) => sum + prize.weight, 0);
            
            let random = Math.random() * totalWeight;
            let winningPrize: PrizeType = prizes[0]; // Default fallback

            for (const prize of weights) {
                if (random < prize.weight) {
                    winningPrize = prize;
                    break;
                }
                random -= prize.weight;
            }

            const winningSymbol = { name: winningPrize.name, imageUrl: winningPrize.imageUrl };
            let grid = Array(3).fill(winningSymbol);

            // Get other symbols, ensuring we don't accidentally create another winning set.
            const otherSymbols = prizes.filter(p => p.name !== winningPrize.name);
            let fillerSymbols: { name: string; imageUrl: string }[] = [];
            
            if (otherSymbols.length > 0) {
                let symbolIndex = 0;
                while (fillerSymbols.length < 6) {
                    const symbol = otherSymbols[symbolIndex % otherSymbols.length];
                    fillerSymbols.push({name: symbol.name, imageUrl: symbol.imageUrl});
                    // Ensure not to add more than 2 of the same filler symbol
                    const count = fillerSymbols.filter(s => s.name === symbol.name).length;
                    if(count < 2) {
                       fillerSymbols.push({name: symbol.name, imageUrl: symbol.imageUrl});
                    }
                    symbolIndex++;
                }
            } else {
                 // Handle edge case where there's only one prize type
                fillerSymbols = Array(6).fill({ name: "Losing Symbol", imageUrl: "https://placehold.co/100x100/CCCCCC/000000.png?text=X" });
            }

            grid.push(...fillerSymbols.slice(0, 6));

            return {
                grid: shuffle(grid),
                winningSymbol: winningPrize.name, 
                isWinner: true, 
                prizeValue: winningPrize.value,
                prizeName: winningPrize.name,
                prizeImageUrl: winningPrize.imageUrl
            };
        } else {
             return generateLosingGrid(false);
        }
    };
    
    const generateLosingGrid = (useGeneric: boolean) => {
        let sourcePrizes: PrizeType[] = prizes;
        if(useGeneric || sourcePrizes.length < 5) {
            sourcePrizes = [
                { name: 'Cherry', value: 0, imageUrl: 'https://placehold.co/100x100/f87171/ffffff.png?text=🍒' },
                { name: 'Lemon', value: 0, imageUrl: 'https://placehold.co/100x100/facc15/000000.png?text=🍋' },
                { name: 'Orange', value: 0, imageUrl: 'https://placehold.co/100x100/fb923c/ffffff.png?text=🍊' },
                { name: 'Grape', value: 0, imageUrl: 'https://placehold.co/100x100/a78bfa/ffffff.png?text=🍇' },
                { name: 'Bell', value: 0, imageUrl: 'https://placehold.co/100x100/fde047/000000.png?text=🔔' },
            ];
        }

        let grid: { name: string; imageUrl: string }[] = [];
        const shuffledPrizes = shuffle([...sourcePrizes]);
        
        // Add two of the first four unique prizes
        for(let i = 0; i < 4; i++) {
            const prize = shuffledPrizes[i];
            grid.push({ name: prize.name, imageUrl: prize.imageUrl });
            grid.push({ name: prize.name, imageUrl: prize.imageUrl });
        }
        // Add one of a fifth unique prize
        const lastPrize = shuffledPrizes[4];
        grid.push({ name: lastPrize.name, imageUrl: lastPrize.imageUrl });
        
        return {
            grid: shuffle(grid), 
            winningSymbol: null, 
            isWinner: false, 
            prizeValue: 0,
            prizeName: null,
            prizeImageUrl: null,
        };
    }
    
    const getCtx = () => canvasRef.current?.getContext('2d');

    const drawScratchLayer = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = getCtx();
        if (!ctx) return;

        const rect = canvas.parentElement!.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        ctx.fillStyle = '#a1a1aa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fafafa';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('RASPE AQUI!', canvas.width / 2, canvas.height / 2);
    }
    
    useImperativeHandle(ref, () => ({
        purchase: async () => {
            if (isPurchased) return;
            setIsPurchased(true);
        },
        reveal: () => {
            return new Promise<void>((resolve) => {
              if (!isPurchased || isRevealed || !game) {
                resolve();
                return;
              }
      
              const canvas = canvasRef.current;
              const ctx = getCtx();
              if (!canvas || !ctx) {
                resolve();
                return;
              }
      
              const width = canvas.width;
              const height = canvas.height;
              let progress = 0;
              const duration = 500; 
      
              const animateScratch = (startTime: number) => {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;
                progress = Math.min(elapsedTime / duration, 1);
      
                ctx.globalCompositeOperation = 'destination-out';
                const clearWidth = width * progress;
                const clearHeight = height * progress;
      
                ctx.clearRect(
                    (width - clearWidth) / 2,
                    (height - clearHeight) / 2,
                    clearWidth,
                    clearHeight
                );
      
                if (progress < 1) {
                  requestAnimationFrame(() => animateScratch(startTime));
                } else {
                  calculateScratchedArea();
                  if (!isRevealed) {
                    setIsRevealed(true);
                    onReveal?.(game);
                  }
                  resolve();
                }
              };
      
              requestAnimationFrame(() => animateScratch(Date.now()));
            });
        },
        reset: async () => {
            setIsPurchased(false);
            setIsRevealed(false);
            setScratchedPercentage(0);
            setGame(generateGrid());
            onReset?.();
        }
    }));

    useEffect(() => {
        setGame(generateGrid());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isPurchased) {
            drawScratchLayer();
        }
    }, [isPurchased]);
    
    useEffect(() => {
        if(scratchedPercentage > 60 && !isRevealed && game) {
            const ctx = getCtx();
            if (ctx) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            setIsRevealed(true);
            onReveal?.(game);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scratchedPercentage, isRevealed, onReveal, game]);


    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        if (isRevealed || !isPurchased) return;
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        if (isRevealed || !isPurchased) return;
        setIsDrawing(false);
        calculateScratchedArea();
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || isRevealed || !isPurchased) return;
        const ctx = getCtx();
        if (!ctx) return;

        const canvas = canvasRef.current!;
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2, false);
        ctx.fill();
    };
    
    const calculateScratchedArea = () => {
        const ctx = getCtx();
        if(!ctx) return;
        
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const data = imageData.data;
        let transparentPixels = 0;
        
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] === 0) {
                transparentPixels++;
            }
        }
        
        const totalPixels = data.length / 4;
        const percentage = (transparentPixels / totalPixels) * 100;
        setScratchedPercentage(percentage);
    };

    return (
        <Card className="overflow-hidden relative select-none border-none shadow-2xl shadow-primary/10">
            <CardContent className="p-0 aspect-[4/3] relative bg-card">
                {isPurchased ? (
                    <>
                        <div className="absolute inset-2 grid grid-cols-3 grid-rows-3 gap-2">
                            {game?.grid.map((item, index) => (
                                <div key={index} className="bg-muted rounded-md flex items-center justify-center p-2">
                                   <div className="relative w-full h-full">
                                     {item.imageUrl && (
                                        <Image 
                                            src={item.imageUrl} 
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        />
                                     )}
                                   </div>
                                </div>
                            ))}
                        </div>
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                            onMouseDown={startDrawing}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onMouseMove={draw}
                            onTouchStart={startDrawing}
                            onTouchEnd={stopDrawing}
                            onTouchMove={draw}
                        />
                    </>
                ) : (
                     <div className="absolute inset-0 w-full h-full">
                        <Image 
                            src={purchaseImageUrl}
                            alt="Comprar raspadinha"
                            fill
                            className="object-cover"
                        />
                         <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4">
                            <Button 
                                className="h-12"
                                onClick={onPurchaseRequest}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <CoinIcon />
                                        <span>Comprar</span>
                                    </div>
                                    <div className="bg-black/80 rounded-md px-3 py-1 flex items-center gap-1 text-white text-sm font-bold ml-2 sm:ml-4">
                                        <span>R$</span>
                                        <span>{cost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
});

ScratchGame.displayName = "ScratchGame";

export default ScratchGame;

    