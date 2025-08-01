
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
        { value: '200,00' },
        { value: '500,00' },
    ];

    return (
        <div className="bg-[#1c211d] text-white h-full flex flex-col p-4">
            <div className="text-center py-2 text-sm font-bold tracking-widest text-primary">
                CAIXA DE BÔNUS LIBERADA
            </div>
            <div className='p-4'>
                <Image 
                    src="https://raspagreen.com/deposit_bg.jpg"
                    alt="Compre no pix e receba no pix"
                    width={500}
                    height={200}
                    className="rounded-lg w-full h-auto"
                />
            </div>
            
            <div className="space-y-4 px-4 pb-4 flex-grow">
                <h2 className="flex items-center gap-3 text-2xl font-bold">
                    <DepositIcon className="size-8" />
                    Depositar
                </h2>

                <div className="space-y-2">
                    <label htmlFor="amount" className="font-medium text-gray-300">
                        Valor:
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-gray-400">
                            R$
                        </span>
                        <Input
                            id="amount"
                            value={amount}
                            onChange={handleAmountChange}
                            className="pl-10 text-lg font-semibold h-12 bg-gray-800 border-gray-700 text-white"
                            placeholder="0,00"
                        />
                    </div>
                    <p className="text-sm text-red-500">O valor mínimo é R$ 10,00</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {quickAmounts.map((q) => (
                        <Button
                            key={q.value}
                            variant={amount === q.value ? 'default' : 'secondary'}
                            className={`h-12 relative text-white font-bold text-base bg-green-900/50 border border-green-700 hover:bg-green-800/50 ${amount === q.value ? 'bg-green-700 border-yellow-400' : ''}`}
                            onClick={() => setAmount(q.value)}
                        >
                            {q.hot && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                                    <Flame className="size-3" />
                                    QUENTE
                                </div>
                            )}
                            R$ {q.value}
                        </Button>
                    ))}
                </div>

                <Button size="lg" className="w-full text-lg h-14 bg-lime-400 hover:bg-lime-500 text-black font-bold mt-auto">
                    <QrCode className="mr-2" />
                    Gerar QR Code
                </Button>
            </div>
        </div>
    );
}
