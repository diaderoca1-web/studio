
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Landmark, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SecuritySeals } from '@/components/security-seals';

export default function WithdrawPage() {
  const [pixKeyType, setPixKeyType] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pixKeyType || !pixKey || !amount) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }
    
    console.log({
      pixKeyType,
      pixKey,
      amount,
    });

    toast({
      title: "Saque Solicitado!",
      description: `Seu saque de R$ ${amount} foi enviado para processamento.`,
    });

    setPixKeyType('');
    setPixKey('');
    setAmount('');
  };

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <div className="space-y-4 text-center mb-12">
        <Landmark className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Solicitar Saque
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Transfira seus ganhos para sua conta via PIX.
        </p>
      </div>

      <Card>
        <form onSubmit={handleWithdraw}>
          <CardHeader>
            <CardTitle>Informações do PIX</CardTitle>
            <CardDescription>
              O valor será creditado na conta associada à chave PIX informada.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="pix-key-type">Tipo de Chave</Label>
                    <Select value={pixKeyType} onValueChange={setPixKeyType}>
                        <SelectTrigger id="pix-key-type">
                            <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cpf">CPF</SelectItem>
                            <SelectItem value="cnpj">CNPJ</SelectItem>
                            <SelectItem value="email">E-mail</SelectItem>
                            <SelectItem value="phone">Celular</SelectItem>
                            <SelectItem value="random">Aleatória</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="pix-key">Chave PIX</Label>
                    <Input id="pix-key" value={pixKey} onChange={(e) => setPixKey(e.target.value)} placeholder="Digite sua chave" />
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Valor do Saque</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-gray-400">
                  R$
                </span>
                <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0,00" className="pl-10" />
              </div>
            </div>
            <div className="flex items-start space-x-3 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5"/>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-yellow-300">Atenção</p>
                    <p className="text-xs text-yellow-400/80">
                        O titular da conta bancária deve ser o mesmo titular da conta em nossa plataforma. Saques para contas de terceiros não serão processados.
                    </p>
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" size="lg">
                <Landmark className="mr-2" />
                Confirmar Saque
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="mt-12">
        <SecuritySeals />
      </div>

    </div>
  );
}
