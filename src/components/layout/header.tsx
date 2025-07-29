import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "../icons/logo";
import { Ticket } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-10 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/raspadinhas">Scratch Cards</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/create">Create with AI</Link>
          </Button>
        </nav>
        <Button asChild>
            <Link href="/raspadinhas">
                <Ticket className="mr-2 h-4 w-4"/>
                Play Now
            </Link>
        </Button>
      </div>
    </header>
  );
}
