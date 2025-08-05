'use client';

import { Gift, Home, Ticket } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export function MainNav() {
    const { user } = useAuth();
    const router = useRouter();

    const handleProtectedClick = (e: React.MouseEvent, href: string) => {
        if (!user) {
            e.preventDefault();
            router.push('/register');
        } else {
            router.push(href);
        }
    };


    return (
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="flex items-center gap-2 transition-colors hover:text-primary">
                <Home className="size-4" />
                Início
            </Link>
            <Link href="/raspadinhas" className="flex items-center gap-2 transition-colors hover:text-primary">
                <Ticket className="size-4" />
                Raspadinhas
            </Link>
            <Link 
                href="/indique" 
                onClick={(e) => handleProtectedClick(e, '/indique')}
                className="flex items-center gap-2 transition-colors hover:text-primary text-muted-foreground"
            >
                <Gift className="size-4" />
                Indique e Ganhe
            </Link>
        </nav>
    )
}
