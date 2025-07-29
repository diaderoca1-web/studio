import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "../icons/logo";
import { UserPlus } from "lucide-react";
import { MainNav } from "./main-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-10 w-auto" />
        </Link>
        <MainNav />
        <div className="flex items-center gap-2">
          <Button variant="ghost">Entrar</Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4"/>
            Registrar
          </Button>
        </div>
      </div>
    </header>
  );
}
