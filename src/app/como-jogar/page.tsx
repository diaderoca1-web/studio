
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Landmark, Ticket, Trophy } from "lucide-react";

const steps = [
    {
        icon: Ticket,
        title: "1. Escolha sua Raspadinha",
        description: "Navegue pela nossa seleção de jogos e escolha a raspadinha que mais te agrada. Cada uma tem prêmios e custos diferentes. Clique em 'Jogar' para começar."
    },
    {
        icon: Landmark,
        title: "2. Compre o Bilhete",
        description: "Para jogar, você precisa comprar o bilhete. Certifique-se de ter saldo suficiente. Se não tiver, faça um depósito rápido e seguro via PIX. O valor do bilhete será deduzido do seu saldo."
    },
     {
        icon: Gamepad2,
        title: "3. Raspe e Revele",
        description: "Agora é a parte divertida! Use o mouse ou o dedo para 'raspar' a área indicada na tela e revelar os símbolos escondidos. Se preferir, use o botão 'Revelar Tudo' para ver o resultado instantaneamente."
    },
     {
        icon: Trophy,
        title: "4. Confira o Prêmio",
        description: "Se você encontrar a combinação de 3 símbolos iguais, você ganha! O prêmio (seja em dinheiro ou o valor equivalente de um produto) será creditado automaticamente na sua conta. Você pode sacar seus ganhos via PIX a qualquer momento."
    }
]

export default function HowToPlayPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter">Como Jogar</h1>
            <p className="text-muted-foreground md:text-xl mt-2">É simples, rápido e divertido!</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step) => (
                <Card key={step.title} className="bg-card/50">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <div className="bg-primary/10 p-3 rounded-lg">
                           <step.icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle>{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
