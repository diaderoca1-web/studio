import { Gift, Home, Ticket } from "lucide-react";
import Link from "next/link";

export function MainNav() {
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
            <Link href="/indique" className="flex items-center gap-2 transition-colors hover:text-primary text-muted-foreground">
                <Gift className="size-4" />
                Indique e Ganhe
            </Link>
        </nav>
    )
}
