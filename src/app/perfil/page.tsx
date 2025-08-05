
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { CreditCard, Edit, Gamepad2, HeartHandshake, LogOut, Mail, Pencil, Phone, ShieldCheck, User as UserIcon, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import DepositIcon from "@/components/icons/deposit-icon";
import CoinIcon from "@/components/icons/coin-icon";


const StatCard = ({ title, value, icon: Icon }: { title: string, value: string, icon: React.ElementType }) => (
    <Card className="bg-card/50">
        <CardContent className="p-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
            </div>
        </CardContent>
    </Card>
);

const InfoRow = ({ label, value, icon: Icon }: { label: string, value: string, icon: React.ElementType }) => (
    <div className="flex items-center justify-between border-b border-border py-4">
        <div className="flex items-center gap-4">
            <Icon className="h-5 w-5 text-muted-foreground" />
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-semibold">{value}</p>
            </div>
        </div>
        <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4 text-primary" />
        </Button>
    </div>
);


export default function ProfilePage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    if (!user) {
        // Or show a loading spinner
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
        <div className="container mx-auto max-w-6xl py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
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
                                    variant={router.pathname === item.href ? 'secondary' : 'ghost'}
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

                {/* Main Content */}
                <main className="md:col-span-3">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Estatísticas</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                               <StatCard title="Total Depositado" value="R$ 0,00" icon={DepositIcon} />
                               <StatCard title="Total Retirado" value="R$ 0,00" icon={Wallet} />
                               <StatCard title="Ganho em Cashback" value="R$ 0,00" icon={CoinIcon} />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">Informações Pessoais</h2>
                             <Card>
                                <CardContent className="p-4">
                                    <InfoRow label="Email" value={user.email} icon={Mail} />
                                    <InfoRow label="Username" value={user.name.replace(/\s+/g, '') + '173'} icon={UserIcon} />
                                    <InfoRow label="Telefone" value={user.phone} icon={Phone} />
                                    <InfoRow label="Documento" value={"000.000.000-00"} icon={Wallet} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
