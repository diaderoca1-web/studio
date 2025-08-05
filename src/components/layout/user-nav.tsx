
'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, CreditCard, DollarSign, Gamepad2, Landmark, LogOut, ShieldCheck, User, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import DepositIcon from "../icons/deposit-icon";
import { useAuth } from "@/contexts/auth-context";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { DepositSheet } from "../deposit-sheet";
import { useRouter } from "next/navigation";

export function UserNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  // Balances are now managed by AuthContext, with mock values for demonstration
  const realBalance = user?.balance ?? 0.00;
  const bonusBalance = 0.00; // Bonus balance not implemented yet
  const totalBalance = realBalance + bonusBalance;

  if (!user) {
    return null;
  }

  const handleDepositClick = (e: React.MouseEvent) => {
    if (!user) {
        e.preventDefault();
        router.push('/register');
    }
  };


  const isAdmin = user.email === 'admin@raspadinha.click';

  const avatarUrl = user.gender === 'female' 
      ? 'https://placehold.co/40x40/FBCFE8/831843.png'
      : 'https://placehold.co/40x40/BAE6FD/0C4A6E.png';

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <span>R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
            <div className="space-y-3">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Saldo Real</span>
                        <span className="font-semibold">R$ {realBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Bônus</span>
                        <span className="font-semibold">R$ {bonusBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                 <p className="text-xs text-muted-foreground">
                    O saldo total é a soma do seu saldo e bônus.
                </p>
            </div>
        </PopoverContent>
      </Popover>

      <Sheet>
        <SheetTrigger asChild onClick={handleDepositClick}>
          <Button className="bg-primary hover:bg-primary/90 hidden md:flex">
            <DepositIcon className="mr-2 h-4 w-4" />
            Depositar
          </Button>
        </SheetTrigger>
        {user && (
            <SheetContent 
                side="right" 
                className="p-0 bg-card border-l-0 w-full max-w-md"
            >
                <DepositSheet />
            </SheetContent>
        )}
      </Sheet>
      
      <Button asChild className="bg-primary hover:bg-primary/90 hidden md:flex">
        <Link href="/sacar">
            <Landmark className="mr-2 h-4 w-4" />
            Sacar
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.phone}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {isAdmin && (
                <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard">
                        <LayoutDashboard className="mr-2" />
                        <span>Admin Panel</span>
                    </Link>
                </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
                <Link href="/perfil">
                    <User className="mr-2" />
                    <span>Conta</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/sacar">
                    <DollarSign className="mr-2" />
                    <span>Sacar</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/historico">
                    <Gamepad2 className="mr-2" />
                    <span>Histórico de Jogos</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/transacoes">
                    <CreditCard className="mr-2" />
                    <span>Transações</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/seguranca">
                <ShieldCheck className="mr-2" />
                <span>Segurança</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
            <LogOut className="mr-2" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
