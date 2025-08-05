
'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Ticket, UserPlus, User } from "lucide-react";
import { cn } from "@/lib/utils";
import DepositIcon from "../icons/deposit-icon";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { DepositSheet } from "../deposit-sheet";
import { useAuth } from "@/contexts/auth-context";

export function MobileFooter() {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();

    const navItems = [
        { href: '/', label: 'Início', icon: Home },
        { href: '/raspadinhas', label: 'Raspadinhas', icon: Ticket },
        { href: '/depositar', label: 'Depósitar', icon: DepositIcon, isCentral: true },
        { href: '/indique', label: 'Indique', icon: UserPlus },
        { href: '/perfil', label: 'Perfil', icon: User },
    ];
    
    const handleProtectedClick = (e: React.MouseEvent, href: string) => {
        if (!user) {
            e.preventDefault();
            router.push('/register');
        } else {
            router.push(href);
        }
    };
    
    const handleDepositClick = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            router.push('/register');
        }
    };

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-card border-t h-20 md:hidden z-50">
            <nav className="flex items-center justify-around h-full">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    if (item.isCentral) {
                        return (
                            <Sheet key={item.href}>
                                <SheetTrigger asChild onClick={handleDepositClick}>
                                    <div className="relative">
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                                            <div className={cn(
                                                "size-16 rounded-full flex items-center justify-center text-white transition-all duration-300",
                                                isActive ? 'bg-primary' : 'bg-primary/90'
                                            )}>
                                                <item.icon className="size-8" />
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium text-primary mt-12 block">
                                            {item.label}
                                        </span>
                                    </div>
                                </SheetTrigger>
                                {user && (
                                    <SheetContent 
                                        side="bottom" 
                                        className="p-0 bg-card border-t-0"
                                    >
                                        <DepositSheet />
                                    </SheetContent>
                                )}
                            </Sheet>
                        );
                    }
                    
                    const isProtected = ['/perfil', '/indique'].includes(item.href);

                    return (
                        <Link 
                            key={item.href} 
                            href={item.href} 
                            className="flex flex-col items-center gap-1"
                            onClick={(e) => isProtected && handleProtectedClick(e, item.href)}
                        >
                            <item.icon className={cn("size-6", isActive ? "text-primary" : "text-muted-foreground")} />
                            <span className={cn("text-xs font-medium", isActive ? "text-primary" : "text-muted-foreground")}>
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
            </nav>
        </footer>
    );
}
