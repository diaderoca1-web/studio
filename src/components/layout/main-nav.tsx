import Link from "next/link";

export function MainNav() {
    return (
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/raspadinhas" className="transition-colors hover:text-primary">
                Raspadinhas
            </Link>
            <Link href="/premios" className="transition-colors hover:text-primary text-muted-foreground">
                Prêmios
            </Link>
            <Link href="/create" className="transition-colors hover:text-primary text-muted-foreground">
                Criar com IA
            </Link>
        </nav>
    )
}
