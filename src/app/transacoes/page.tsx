
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export default function TransactionsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
        <div className="space-y-4 text-center mb-12">
            <CreditCard className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Transações
            </h1>
            <p className="text-muted-foreground md:text-xl">
                Acompanhe seus depósitos, saques e prêmios.
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
