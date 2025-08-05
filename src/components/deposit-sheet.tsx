
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Flame, QrCode, Copy, Check, Loader2 } from 'lucide-react';
import DepositIcon from './icons/deposit-icon';
import { generatePixQRCode, GeneratePixQRCodeOutput } from '@/ai/flows/generate-pix-qrcode';
import QRCode from 'qrcode.react';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/contexts/settings-context';
import { useAuth } from '@/contexts/auth-context';
import { Label } from './ui/label';


export function DepositSheet() {
    const [amount, setAmount] = useState('30.00');
    const [isLoading, setIsLoading] = useState(false);
    const [qrCodeData, setQrCodeData] = useState<GeneratePixQRCodeOutput | null>(null);
    const [hasCopied, setHasCopied] = useState(false);
    const { toast } = useToast();
    const { settings } = useSettings();
    const { user } = useAuth();

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (!value) {
            setAmount('0.00');
            return;
        }
        value = (parseInt(value, 10) / 100).toFixed(2);
        setAmount(value);
    };

    const handleGenerateQRCode = async () => {
        setIsLoading(true);
        setQrCodeData(null);
        try {
            if (!user) {
                toast({ title: "Erro", description: "Você precisa estar logado.", variant: "destructive" });
                return;
            }
            const numericAmount = parseFloat(amount.replace(',', '.'));
            if (isNaN(numericAmount) || numericAmount < 10) {
                 toast({
                    title: "Erro",
                    description: "O valor mínimo para depósito é R$ 10,00.",
                    variant: "destructive",
                });
                return;
            }
            if (!settings.paymentClientId || !settings.paymentSecretKey) {
                toast({
                   title: "Erro de Configuração",
                   description: "As credenciais do gateway de pagamento não estão configuradas no painel de administração.",
                   variant: "destructive",
               });
               return;
            }
            const data = await generatePixQRCode({ 
                amount: numericAmount,
                clientId: settings.paymentClientId,
                clientSecret: settings.paymentSecretKey,
                name: user.name,
                email: user.email,
                document: user.email,
            });
            setQrCodeData(data);
        } catch (error) {
            console.error("Failed to generate QR Code:", error);
            toast({
                title: "Erro",
                description: `Não foi possível gerar o QR Code. ${error instanceof Error ? error.message : 'Tente novamente.'}`,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }
    
    const handleCopyToClipboard = () => {
        if (!qrCodeData?.qrCode) return;
        navigator.clipboard.writeText(qrCodeData.qrCode).then(() => {
          setHasCopied(true);
          setTimeout(() => setHasCopied(false), 2000);
          toast({
            title: "Copiado!",
            description: "O código PIX foi copiado para a área de transferência.",
          });
        }).catch(err => {
          console.error('Failed to copy: ', err);
           toast({
            title: "Erro",
            description: "Não foi possível copiar o código.",
            variant: "destructive",
          });
        });
    };

    const quickAmounts = [
        { value: '10.00' },
        { value: '30.00', hot: true },
        { value: '50.00' },
        { value: '100.00' },
        { value: '200.00' },
        { value: '500.00' },
    ];

    return (
        <div className="bg-[#1c211d] text-white h-full flex flex-col p-4">
            {qrCodeData ? (
                <div className="flex flex-col items-center justify-center text-center p-4 h-full">
                    <h2 className="text-xl font-bold mb-2">PIX Gerado com Sucesso!</h2>
                    <p className="text-muted-foreground mb-4">Escaneie o QR Code com o app do seu banco.</p>
                    <div className="bg-white p-2 rounded-lg mb-4">
                        <QRCode value={qrCodeData.qrCode} size={200} />
                    </div>
                    <p className="text-muted-foreground mb-2">Ou use o PIX Copia e Cola:</p>
                    <div className="relative w-full">
                        <Input 
                            readOnly 
                            value={qrCodeData.qrCode}
                             className="pr-12 bg-gray-800 border-gray-700 text-white truncate"
                        />
                         <Button type="button" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleCopyToClipboard}>
                            {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            <span className="sr-only">Copiar</span>
                        </Button>
                    </div>
                     <p className="text-xs text-muted-foreground mt-4">O QR Code expira em alguns minutos.</p>
                     <Button variant="outline" className="mt-6" onClick={() => setQrCodeData(null)}>
                        Depositar outro valor
                    </Button>
                </div>
            ) : (
                <>
                    <div className='p-4'>
                        <Image 
                            src="https://raspadinha.click/deposit_bg.jpg"
                            alt="Compre no pix e receba no pix"
                            width={500}
                            height={200}
                            className="rounded-lg w-full h-auto"
                        />
                    </div>
                    
                    <div className="space-y-4 px-4 pb-4 flex-grow flex flex-col">
                        <h2 className="flex items-center gap-3 text-2xl font-bold">
                            <DepositIcon className="size-8" />
                            Depositar
                        </h2>

                        <div className="space-y-2">
                            <Label htmlFor="amount" className="font-medium text-gray-300">
                                Valor:
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-gray-400">
                                    R$
                                </span>
                                <Input
                                    id="amount"
                                    value={amount.replace('.',',')}
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
                                    R$ {q.value.replace('.',',')}
                                </Button>
                            ))}
                        </div>

                        <Button 
                            size="lg" 
                            className="w-full text-lg h-14 bg-lime-400 hover:bg-lime-500 text-black font-bold mt-auto"
                            onClick={handleGenerateQRCode}
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <QrCode className="mr-2" />}
                            {isLoading ? 'Gerando...' : 'Gerar QR Code'}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
