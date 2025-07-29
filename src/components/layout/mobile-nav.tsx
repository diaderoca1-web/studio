"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import HomeIcon from "../icons/home-icon";
import TicketIcon from "../icons/ticket-icon";
import GiftIcon from "../icons/gift-icon";
import UserIcon from "../icons/user-icon";
import { UserPlus } from "lucide-react";

const navItems = [
  { href: "/", icon: HomeIcon, label: "Início" },
  { href: "/raspadinhas", icon: TicketIcon, label: "Raspadinhas" },
  { href: "/create", icon: UserPlus, label: "Criar", isCentral: true },
  { href: "/premios", icon: GiftIcon, label: "Prêmios" },
  { href: "/login", icon: UserIcon, label: "Entrar" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-md border-t border-border/50 p-2 md:hidden z-50">
      <div className="bg-secondary/50 h-full rounded-2xl flex items-center justify-around relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          if (item.isCentral) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="absolute left-1/2 -translate-x-1/2 -top-6 flex flex-col items-center gap-1 text-xs font-medium"
              >
                <div className="bg-primary rounded-full p-3.5 border-4 border-background shadow-lg">
                  <item.icon className="size-7 text-primary-foreground" />
                </div>
                <span className={cn(isActive ? "text-primary" : "text-muted-foreground")}>
                  {item.label}
                </span>
              </Link>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 text-xs font-medium"
            >
              <item.icon
                className={cn(
                  "size-6",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
