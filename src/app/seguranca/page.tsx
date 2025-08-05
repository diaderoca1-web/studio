
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileSidebar } from "@/components/layout/profile-sidebar";
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';

export default function SecurityPage() {
    const { toast } = useToast();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast({
                title: "Erro",
                description: "As novas senhas não coincidem.",
                variant: "destructive",
            });
            return;
        }

        if (newPassword.length < 6) {
             toast({
                title: "Erro",
                description: "A nova senha deve ter pelo menos 6 caracteres.",
                variant: "destructive",
            });
            return;
        }
        
        // Mock password change logic
        console.log("Attempting to change password...");

        toast({
            title: "Sucesso!",
            description: "Sua senha foi alterada com sucesso.",
        });

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="container mx-auto max-w-6xl py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <ProfileSidebar />
                <main className="md:col-span-3">
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Alterar Senha</CardTitle>
                                <CardDescription>
                                    Recomendamos usar uma senha forte que você não esteja usando em outro lugar.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Senha Atual</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            id="current-password"
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="pl-10 pr-20"
                                            placeholder="Sua senha atual"
                                            required
                                        />
                                        <Button type="button" variant="link" className="absolute right-1 top-1/2 -translate-y-1/2 h-auto p-0 text-primary" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                            {showCurrentPassword ? "Ocultar" : "Mostrar"}
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">Nova Senha</Label>
                                     <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            id="new-password"
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="pl-10 pr-20"
                                            placeholder="Pelo menos 6 caracteres"
                                            required
                                        />
                                         <Button type="button" variant="link" className="absolute right-1 top-1/2 -translate-y-1/2 h-auto p-0 text-primary" onClick={() => setShowNewPassword(!showNewPassword)}>
                                            {showNewPassword ? "Ocultar" : "Mostrar"}
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                                     <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            id="confirm-password"
                                            type={showNewPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="pl-10 pr-20"
                                            placeholder="Repita a nova senha"
                                            required
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Salvar Alterações</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </main>
            </div>
        </div>
    );
}
