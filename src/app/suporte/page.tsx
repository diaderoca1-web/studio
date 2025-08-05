
'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LifeBuoy } from "lucide-react";

export default function SupportPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission,
    // like sending the data to a backend or an email service.
    alert("Ticket de suporte enviado! (Funcionalidade de simulação)");
  };

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <div className="text-center mb-12">
        <LifeBuoy className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter mt-4">Suporte</h1>
        <p className="text-muted-foreground md:text-xl mt-2">
          Precisa de ajuda? Preencha o formulário abaixo para abrir um ticket.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Abrir um Novo Ticket</CardTitle>
            <CardDescription>
              Nossa equipe responderá o mais breve possível.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Seu Nome</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Seu E-mail</Label>
                <Input id="email" type="email" placeholder="voce@exemplo.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Assunto</Label>
              <Input id="subject" placeholder="Ex: Problema com depósito" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                placeholder="Descreva seu problema ou dúvida em detalhes..."
                required
                rows={6}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Enviar Ticket
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
