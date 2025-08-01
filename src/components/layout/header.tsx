
'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "../icons/logo";
import { UserPlus } from "lucide-react";
import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";
import { useAuth } from "@/contexts/auth-context";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-12 w-40" />
        </Link>
        <div className="hidden md:flex flex-1 justify-center">
            <MainNav />
        </div>
        <div className="flex items-center gap-2">
            {user ? (
                <UserNav />
            ) : (
                <>
                    <Button variant="ghost" asChild>
                      <Link href="/login">Entrar</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">
                            <UserPlus className="mr-2 h-4 w-4"/>
                            Registrar
                        </Link>
                    </Button>
                </>
            )}
        </div>
      </div>
    </header>
  );
}
