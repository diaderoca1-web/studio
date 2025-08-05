
import { notFound } from "next/navigation";
import Image from "next/image";
import { scratchCards } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Swords } from "lucide-react";

export default function LobbyPage({ params }: { params: { slug: string } }) {
  const card = scratchCards.find((c) => c.slug === params.slug);

  if (!card) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Sala de Espera
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Aguardando seu amigo entrar para começar a partida!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Player 1 */}
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24 border-4 border-primary">
            <AvatarImage src="https://placehold.co/100x100/BAE6FD/0C4A6E.png" />
            <AvatarFallback>P1</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold">Você</h3>
        </div>

        {/* Game Card */}
        <div className="flex flex-col items-center">
             <Card className="overflow-hidden">
                <CardHeader className="p-0">
                    <div className="aspect-video w-full relative">
                        <Image
                            src={card.imageUrl}
                            alt={card.title}
                            fill
                            className="object-contain"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-4 text-center">
                    <CardTitle>{card.title}</CardTitle>
                </CardContent>
            </Card>
        </div>

        {/* Player 2 */}
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24 border-4 border-dashed border-muted-foreground">
             <AvatarImage src="" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold text-muted-foreground">Aguardando...</h3>
        </div>
      </div>

       <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">O jogo começará assim que seu amigo entrar na sala.</p>
            <Button size="lg" disabled>
                <Swords className="mr-2" />
                Começar Jogo
            </Button>
        </div>
    </div>
  );
}
