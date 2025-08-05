
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Mail, MessageSquare } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter">Suporte</h1>
            <p className="text-muted-foreground md:text-xl mt-2">
                Estamos aqui para ajudar!
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
             <Card className="flex flex-col items-center justify-center text-center p-8">
                <Mail className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Suporte por E-mail</h3>
                <p className="text-muted-foreground mb-4">
                    Envie-nos um e-mail com sua dúvida, sugestão ou problema. Responderemos o mais breve possível.
                </p>
                 <p className="text-lg font-bold text-primary">contato@raspadinha.click</p>
            </Card>

            <Card className="flex flex-col items-center justify-center text-center p-8">
                <MessageSquare className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Chat ao Vivo</h3>
                <p className="text-muted-foreground mb-4">
                    Fale com um de nossos atendentes em tempo real para um suporte mais rápido.
                </p>
                <Button disabled>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    Chat Indisponível no Momento
                </Button>
            </Card>
        </div>
    </div>
  );
}
