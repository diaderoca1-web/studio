
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Flame, QrCode } from 'lucide-react';
import DepositIcon from './icons/deposit-icon';

export function DepositSheet() {
    const [amount, setAmount] = useState('30,00');

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (!value) {
            setAmount('0,00');
            return;
        }
        value = (parseInt(value, 10) / 100).toFixed(2).replace('.', ',');
        setAmount(value);
    };

    const quickAmounts = [
        { value: '10,00' },
        { value: '30,00', hot: true },
        { value: '50,00' },
        { value: '100,00' },
        { value: '500,00' },
    ];

    return (
        <div className="container mx-auto max-w-lg py-4">
            <div className="space-y-4">
                <div className="text-center bg-primary/20 text-primary font-bold py-2 rounded-lg">
                    CAIXA DE BÔNUS LIBERADA
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                        src="https://ik.imagekit.io/azx3nlpdu/NOVOS-BANNER-RASPA.png?updatedAt=1753474399329"
                        alt="Promo Banner"
                        fill
                        className="object-contain"
                        data-ai-hint="promo banner"
                    />
                </div>

                <div className="space-y-4">
                    <h2 className="flex items-center gap-3 text-2xl font-bold">
                        <DepositIcon className="size-8" />
                        Depositar
                    </h2>

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
                        <p className="text-sm text-red-500">O valor mínimo é R$ 10,00</p>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {quickAmounts.map((q) => (
                            <Button
                                key={q.value}
                                variant={amount === q.value ? 'default' : 'secondary'}
                                className={`h-12 relative ${amount === q.value ? 'border-2 border-yellow-400' : ''}`}
                                onClick={() => setAmount(q.value)}
                            >
                                {q.hot && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                                        <Flame className="size-3" />
                                        QUENTE
                                    </div>
                                )}
                                R$ {q.value}
                            </Button>
                        ))}
                    </div>

                    <Button size="lg" className="w-full text-lg h-14 bg-lime-400 hover:bg-lime-500 text-black font-bold">
                        <QrCode className="mr-2" />
                        Gerar QR Code
                    </Button>
                </div>
            </div>
        </div>
    );
}
