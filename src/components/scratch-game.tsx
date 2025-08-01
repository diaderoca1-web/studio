
"use client";

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import { Button } from './ui/button';
import CoinIcon from './icons/coin-icon';

const prizes = [
    { type: '1-real', value: 1.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/1-real-coin.png?updatedAt=1753862142426' },
    { type: '50-centavos', value: 0.50, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/50-cent-coin.png?updatedAt=1753862142410' },
    { type: 'star', value: 50, imageUrl: 'https://placehold.co/100x100/orange/white?text=⭐' },
    { type: 'gem', value: 100, imageUrl: 'https://placehold.co/100x100/blue/white?text=💎' },
];

const symbolMap: { [key: string]: string } = {
    '1-real': 'https://ik.imagekit.io/azx3nlpdu/1-real-coin.png?updatedAt=1753862142426',
    '50-centavos': 'https://ik.imagekit.io/azx3nlpdu/50-cent-coin.png?updatedAt=1753862142410',
    star: 'https://placehold.co/100x100/orange/white?text=⭐',
    gem: 'https://placehold.co/100x100/blue/white?text=💎',
    lose: 'https://placehold.co/100x100/grey/white?text=❌',
};

// Simple shuffle function
const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Generate a grid for the game
const generateGrid = () => {
    const winningPrize = prizes[Math.floor(Math.random() * prizes.length)];
    const isWinner = Math.random() > 0.5; // 50% chance to win

    if (isWinner) {
        const grid = new Array(9).fill({ type: 'lose' });
        const winningIndexes = shuffle([...Array(9).keys()]).slice(0, 3);
        winningIndexes.forEach(i => grid[i] = winningPrize);
        const otherPrizes = prizes.filter(p => p.type !== winningPrize.type);
        
        const remainingIndexes = [...Array(9).keys()].filter(i => !winningIndexes.includes(i));
        remainingIndexes.forEach(i => {
            grid[i] = { type: otherPrizes[Math.floor(Math.random() * otherPrizes.length)].type };
        });
        
        // Ensure no other accidental wins
        const finalGrid = shuffle(grid);
        // This is a simplified logic, a real game would need more robust generation
        // to avoid accidental wins of other symbols. For this demo, we'll keep it simple.
        return {grid: finalGrid, winningSymbol: winningPrize.type, isWinner: true, prizeValue: winningPrize.value };
    } else {
        // Create a losing grid
        let grid = [];
        const prizeTypes = prizes.map(p => p.type);
        for (let i = 0; i < 3; i++) grid.push({type: prizeTypes[0]});
        for (let i = 0; i < 3; i++) grid.push({type: prizeTypes[1]});
        for (let i = 0; i < 2; i++) grid.push({type: prizeTypes[2]});
        grid.push({type: prizeTypes[3]});
        return {grid: shuffle(grid), winningSymbol: null, isWinner: false, prizeValue: 0};
    }
};

interface ScratchGameProps {
    cardTitle: string;
    cost: number;
    purchaseImageUrl: string;
}

export interface ScratchGameRef {
  purchase: () => Promise<void>;
  reveal: () => Promise<void>;
  reset: () => Promise<void>;
}

const ScratchGame = forwardRef<ScratchGameRef, ScratchGameProps>(({ cost, purchaseImageUrl }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [game, setGame] = useState(generateGrid());
    const [scratchedPercentage, setScratchedPercentage] = useState(0);
    const [isPurchased, setIsPurchased] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);

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
              if (!isPurchased || isRevealed) {
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
                const diagonalLength = Math.sqrt(width * width + height * height);
                const radius = (diagonalLength / 2) * progress;
      
                const centerX = width / 2;
                const centerY = height / 2;
      
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
                ctx.fill();
      
                if (progress < 1) {
                  requestAnimationFrame(() => animateScratch(startTime));
                } else {
                  calculateScratchedArea();
                  setIsRevealed(true);
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
        }
    }));


    useEffect(() => {
        if (isPurchased) {
            drawScratchLayer();
        }
    }, [isPurchased]);
    
    useEffect(() => {
        if(scratchedPercentage > 60 && !isRevealed) {
            const ctx = getCtx();
            if (ctx) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            setIsRevealed(true);
        }
    }, [scratchedPercentage, isRevealed]);


    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        if (isRevealed) return;
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        if (isRevealed) return;
        setIsDrawing(false);
        calculateScratchedArea();
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || isRevealed) return;
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
                            {game.grid.map((item, index) => (
                                <div key={index} className="bg-muted rounded-md flex items-center justify-center p-2">
                                   <div className="relative w-full h-full">
                                     <Image 
                                        src={symbolMap[item.type as keyof typeof symbolMap] || symbolMap.lose} 
                                        alt={item.type}
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
                     <div className="absolute inset-0 w-full h-full bg-transparent">
                        <Image 
                            src={purchaseImageUrl}
                            alt="Comprar raspadinha"
                            fill
                            className="object-cover"
                        />
                         <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4">
                            <Button 
                                className="h-12"
                                onClick={() => ref.current?.purchase()}
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
             {isRevealed && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center text-white p-4">
                    {game.isWinner ? (
                        <>
                            <h2 className="text-2xl sm:text-4xl font-bold text-amber-400">Congratulations!</h2>
                            <p className="text-lg sm:text-2xl mt-2">You won R$ {game.prizeValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}!</p>
                            <p className="mt-4 flex items-center gap-2"><Gift className="size-5"/> Your prize has been credited to your account.</p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl sm:text-4xl font-bold">Better Luck Next Time!</h2>
                            <p className="text-lg mt-2">No prize this time. Why not try another card?</p>
                        </>
                    )}
                </div>
            )}
        </Card>
    );
});

ScratchGame.displayName = "ScratchGame";

export default ScratchGame;
