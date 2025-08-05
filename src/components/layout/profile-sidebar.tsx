
'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { CreditCard, Gamepad2, LogOut, ShieldCheck, User as UserIcon } from "lucide-react";
import { useEffect } from "react";

export function ProfileSidebar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        // Render nothing while the redirect is happening
        return null;
    }

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const navItems = [
        { href: '/perfil', label: 'Conta', icon: UserIcon },
        { href: '/historico', label: 'Histórico de Jogos', icon: Gamepad2 },
        { href: '/transacoes', label: 'Transações', icon: CreditCard },
        { href: '/seguranca', label: 'Segurança', icon: ShieldCheck },
    ];

    return (
        <aside className="md:col-span-1">
            <Card className="p-4">
                <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24 border-4 border-primary">
                        <AvatarImage src="https://placehold.co/100x100.png" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <p className="text-sm text-muted-foreground">Entrou em Jul 31, 2025</p>
                    </div>
                </div>
                <nav className="mt-8 space-y-2">
                    {navItems.map(item => (
                        <Button
                            key={item.href}
                            variant={pathname === item.href ? 'secondary' : 'ghost'}
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href={item.href}>
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.label}
                            </Link>
                        </Button>
                    ))}
                     <Button
                        variant='ghost'
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sair
                    </Button>
                </nav>
            </Card>
        </aside>
    );
}
