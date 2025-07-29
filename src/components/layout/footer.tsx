import Link from "next/link";
import Logo from "../icons/logo";
import { Button } from "../ui/button";
import { Home, PlusCircle, Search, Trophy, User } from "lucide-react";

export function Footer() {
  return (
    <>
    <footer className="bg-card text-card-foreground border-t md:block hidden">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1">
            <Logo className="h-12 w-auto" />
            <p className="mt-2 text-muted-foreground text-sm max-w-xs">
              Your lucky day is just a scratch away! Play responsibly.
            </p>
          </div>
          <div className="flex-1 flex justify-center md:justify-end gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Games</h3>
              <Link href="/raspadinhas" className="text-sm text-muted-foreground hover:text-primary">
                All Scratch Cards
              </Link>
              <Link href="/create" className="text-sm text-muted-foreground hover:text-primary">
                Create with AI
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Legal</h3>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lucky Scratch. All rights reserved.</p>
        </div>
      </div>
    </footer>
    <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t z-[60]">
        <div className="flex justify-around items-center h-20">
          <Link href="/" className="flex flex-col items-center gap-1 text-primary">
            <Home />
            <span className="text-xs font-medium">Início</span>
          </Link>
          <Link href="/raspadinhas" className="flex flex-col items-center gap-1 text-muted-foreground">
            <Search />
            <span className="text-xs font-medium">Raspadinhas</span>
          </Link>
          <Button asChild size="icon" className="w-16 h-16 rounded-full -translate-y-4 shadow-lg shadow-primary/50">
            <Link href="/create">
              <PlusCircle className="size-8" />
            </Link>
          </Button>
          <Link href="#" className="flex flex-col items-center gap-1 text-muted-foreground">
            <Trophy />
            <span className="text-xs font-medium">Prêmios</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-1 text-muted-foreground">
            <User />
            <span className="text-xs font-medium">Entrar</span>
          </Link>
        </div>
    </footer>
    </>
  );
}