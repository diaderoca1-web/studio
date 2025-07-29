import Link from 'next/link';
import {
  Home,
  Gift,
  CircleUser,
  PlusCircle,
  Ticket,
} from 'lucide-react';
import Logo from '../icons/logo';
import { cn } from '@/lib/utils';

const footerNavItems = [
  {
    href: '/',
    label: 'Início',
    icon: Home,
  },
  {
    href: '/raspadinhas',
    label: 'Raspadinhas',
    icon: Ticket,
  },
  {
    href: '/create',
    label: 'Registrar',
    icon: PlusCircle,
    className:
      'size-16 bg-primary text-primary-foreground rounded-full -translate-y-4 shadow-lg border-4 border-background',
    iconClassName: 'size-8',
  },
  {
    href: '#',
    label: 'Prêmios',
    icon: Gift,
  },
  {
    href: '#',
    label: 'Entrar',
    icon: CircleUser,
  },
];

export function Footer() {
  return (
    <>
      {/* Desktop Footer */}
      <footer className="bg-card text-card-foreground border-t hidden md:block">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="flex-1 flex flex-col items-center md:items-start">
              <Logo className="h-12 w-auto" />
              <p className="mt-2 text-muted-foreground text-sm max-w-xs">
                Your lucky day is just a scratch away! Play responsibly.
              </p>
            </div>
            <div className="flex flex-1 justify-center md:justify-end gap-8 mt-8 md:mt-0">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Games</h3>
                <Link
                  href="/raspadinhas"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  All Scratch Cards
                </Link>
                <Link
                  href="/create"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Create with AI
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Legal</h3>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Lucky Scratch. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-card border-t z-50">
        <nav className="h-full">
          <ul className="flex justify-around items-center h-full">
            {footerNavItems.map((item) => (
              <li key={item.label} className="h-full">
                <Link
                  href={item.href}
                  className="flex flex-col items-center justify-center h-full text-muted-foreground gap-1.5"
                >
                  <div className={cn('flex items-center justify-center', item.className)}>
                    <item.icon className={cn('size-6', item.iconClassName)} />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
      <div className="h-24 md:hidden" />
    </>
  );
}
