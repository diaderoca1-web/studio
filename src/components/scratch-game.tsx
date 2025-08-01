
"use client";

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import CoinIcon from './icons/coin-icon';
import { PrizeType } from '@/lib/data';

// Simple shuffle function
const shuffle = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
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
    
    // Generate a grid for the game
    const generateGrid = (): GameResult => {
        if (!prizes || prizes.length === 0) {
            // Return a default "empty" or "losing" state if there are no prizes
            return {
                grid: Array(9).fill({ name: 'Empty', imageUrl: '' }),
                winningSymbol: null,
                isWinner: false,
                prizeValue: 0,
                prizeName: null,
                prizeImageUrl: null,
            };
        }
        const isWinner = Math.random() > 0.5; // 50% chance to win
    
        if (isWinner && prizes.length > 0) {
            const winningPrize = prizes[Math.floor(Math.random() * prizes.length)];
            const winningSymbol = { name: winningPrize.name, imageUrl: winningPrize.imageUrl };

            let grid = Array(3).fill(winningSymbol);

            const otherPrizes = prizes.filter(p => p.name !== winningPrize.name);
            for (let i = 0; i < 6; i++) {
                const randomPrize = otherPrizes.length > 0 ? otherPrizes[Math.floor(Math.random() * otherPrizes.length)] : winningPrize;
                grid.push({ name: randomPrize.name, imageUrl: randomPrize.imageUrl });
            }
            
            // This is a simplified logic, a real game would need more robust generation
            // to avoid accidental wins of other symbols. For this demo, we'll keep it simple.
            return {
                grid: shuffle(grid),
                winningSymbol: winningPrize.name, 
                isWinner: true, 
                prizeValue: winningPrize.value,
                prizeName: winningPrize.name,
                prizeImageUrl: winningPrize.imageUrl
            };
        } else {
            // Create a losing grid
            let grid = [];
            let counts: {[key: string]: number} = {};

            while(grid.length < 9) {
                const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
                counts[randomPrize.name] = (counts[randomPrize.name] || 0) + 1;
                if(counts[randomPrize.name] < 3) {
                     grid.push({ name: randomPrize.name, imageUrl: randomPrize.imageUrl });
                } else {
                    // prevent adding a third of the same symbol
                    counts[randomPrize.name]--; 
                }
            }
            
            return {
                grid: shuffle(grid), 
                winningSymbol: null, 
                isWinner: false, 
                prizeValue: 0,
                prizeName: null,
                prizeImageUrl: null,
            };
        }
    };
    
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
                                     <Image 
                                        src={item.imageUrl} 
                                        alt={item.name}
                                        fill
                                        className="object-contain"
                                     />
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
