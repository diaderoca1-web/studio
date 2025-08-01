
'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Landmark, Asterisk, Phone, Mail, User, Building, KeyRound } from 'lucide-react';

const pixKeyTypes = {
  cpf: { icon: User, label: 'CPF' },
  cnpj: { icon: Building, label: 'CNPJ' },
  email: { icon: Mail, label: 'Email' },
  phone: { icon: Phone, label: 'Celular' },
  random: { icon: KeyRound, label: 'Aleatória' },
};

type PixKeyType = keyof typeof pixKeyTypes;

export default function WithdrawPage() {
  const [amount, setAmount] = useState('0,00');
  const [pixKeyType, setPixKeyType] = useState<PixKeyType>('cpf');
  const [pixKey, setPixKey] = useState('');

  const quickAmounts = [30, 50, 100, 200];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (!value) {
        setAmount('0,00');
        return;
    }
    value = (parseInt(value, 10) / 100).toFixed(2).replace('.', ',');
    setAmount(value);
  };

  const SelectedIcon = pixKeyTypes[pixKeyType]?.icon || Asterisk;

  return (
    <div className="container mx-auto max-w-lg py-8">
      <div className="mb-8">
          <Image
            src="https://ik.imagekit.io/azx3nlpdu/SAQUE.jpg?updatedAt=1751798026776"
            alt="Promotional Banner"
            width={600}
            height={200}
            className="rounded-lg object-contain"
            data-ai-hint="promo banner"
          />
      </div>

      <Card className="bg-card/70 border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Landmark className="size-8" />
            Sacar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="amount" className="font-medium">
              Valor:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-muted-foreground">
                R$
              </span>
              <Input
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                className="pl-10 text-lg font-semibold h-12"
                placeholder="0,00"
              />
            </div>
            <p className="text-sm text-red-500">O valor mínimo é R$ 20,00</p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((qAmount) => (
              <Button
                key={qAmount}
                variant="secondary"
                className="h-11"
                onClick={() => setAmount(qAmount.toFixed(2).replace('.', ','))}
              >
                R$ {qAmount},00
              </Button>
            ))}
          </div>

          <div className="space-y-2">
             <label htmlFor="pix-key" className="font-medium">
                Chave PIX
            </label>
            <div className="flex gap-2">
                <Select value={pixKeyType} onValueChange={(value) => setPixKeyType(value as PixKeyType)}>
                    <SelectTrigger className="w-24 h-12">
                         <SelectValue>
                            <div className='flex items-center gap-2'>
                                <SelectedIcon className="size-5" />
                            </div>
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(pixKeyTypes).map(([key, { icon: Icon, label }]) => (
                            <SelectItem key={key} value={key}>
                                <div className="flex items-center gap-2">
                                    <Icon className="size-4" />
                                    <span>{label}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input
                    id="pix-key"
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                    placeholder="Digite sua chave PIX..."
                    className="h-12 flex-1"
                />
            </div>
          </div>
          
          <Button size="lg" className="w-full text-lg h-14 bg-lime-400 hover:bg-lime-500 text-black font-bold">
            <Landmark className="mr-2" />
            Solicitar Saque
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
