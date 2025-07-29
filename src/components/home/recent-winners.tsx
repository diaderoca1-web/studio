import Image from "next/image";
import { recentWinners } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Dot } from "lucide-react";

export default function RecentWinners() {
    const winnersToDisplay = recentWinners.slice(0, 2);
  return (
    <div className="flex items-center gap-4">
        <div className="flex items-center text-primary font-bold">
            <Dot className="size-10 animate-ping" />
            <span>AO VIVO</span>
        </div>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {winnersToDisplay.map((winner, index) => (
          <Card key={index} className="bg-secondary border-none">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="relative size-12 flex-shrink-0">
                <Image
                  src={winner.imageUrl}
                  alt={winner.prizeName}
                  fill
                  className="object-contain"
                  data-ai-hint={winner.aiHint}
                />
              </div>
              <div className="flex flex-col text-sm overflow-hidden">
                <span className="font-medium text-amber-400/95 overflow-hidden text-nowrap text-ellipsis">
                  {winner.winnerName}
                </span>
                <h1 className="font-medium text-muted-foreground overflow-hidden text-nowrap text-ellipsis">
                  {winner.prizeName}
                </h1>
                <span className="font-semibold">
                  <span className="text-primary">R$ </span>
                  {winner.prizeValue.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
