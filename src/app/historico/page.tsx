
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2 } from "lucide-react";

export default function GameHistoryPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
        <div className="space-y-4 text-center mb-12">
            <Gamepad2 className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Histórico de Jogos
            </h1>
            <p className="text-muted-foreground md:text-xl">
                Veja seus jogos recentes e seus resultados.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Em Breve</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Esta página está em construção. Volte em breve para mais novidades!</p>
            </CardContent>
        </Card>
    </div>
  );
}
