
'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { Copy, Check, Gift } from "lucide-react";
import { SecuritySeals } from "@/components/security-seals";
import { useRouter } from "next/navigation";

export default function ReferAndEarnPage() {
    const [inviteLink, setInviteLink] = useState("");
    const [hasCopied, setHasCopied] = useState(false);
    const { toast } = useToast();
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setInviteLink(`${window.location.origin}/register?ref=${user.id}`);
        } else {
            // Redirect if not logged in, though navigation should prevent this.
            router.push('/login');
        }
    }, [user, router]);


    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink).then(() => {
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
        toast({
            title: "Sucesso!",
            description: "Link de convite copiado para a área de transferência.",
        });
        }).catch(err => {
        console.error('Failed to copy: ', err);
        toast({
            title: "Erro",
            description: "Não foi possível copiar o link.",
            variant: "destructive",
        });
        });
    };

    if (!user) {
        return null; // Or a loading spinner
    }

    return (
        <div className="container mx-auto max-w-2xl py-12">
             <div className="space-y-4 text-center mb-12">
                <Gift className="mx-auto h-12 w-12 text-primary" />
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                    Indique e Ganhe
                </h1>
                <p className="text-muted-foreground md:text-xl">
                    Convide seus amigos e ganhe recompensas incríveis!
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Desafie um Amigo e Ganhe!</CardTitle>
                    <CardDescription>
                        Envie o link para seus amigos e chame-os para a diversão!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="my-4 p-4 bg-secondary border border-border rounded-lg text-center">
                        <p className="text-muted-foreground">A cada 5 amigos que se cadastrarem e jogarem, <span className="text-white">você ganha</span></p>
                        <p className="text-3xl font-bold text-primary mt-1">R$10 no PIX!</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                value={inviteLink}
                                readOnly
                            />
                        </div>
                            <Button type="button" size="icon" className="h-9 w-9" onClick={handleCopyToClipboard}>
                            {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            <span className="sr-only">Copiar</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-12">
                <SecuritySeals />
            </div>
        </div>
    );
}
