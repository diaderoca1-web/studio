
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, CreditCard, DollarSign, Gamepad2, Landmark, LogOut, Plus, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import DepositIcon from "../icons/deposit-icon";
import { DepositSheet } from "../deposit-sheet";

export function UserNav() {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <span>R$ 0,00</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
            <div className="space-y-3">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Saldo</span>
                        <span className="font-semibold">R$ 0,00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Bônus</span>
                        <span className="font-semibold">R$ 0,00</span>
                    </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>R$ 0,00</span>
                </div>
                 <p className="text-xs text-muted-foreground">
                    O saldo total é a soma do seu saldo e bônus.
                </p>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href="/sacar">
                        <Landmark className="mr-2 h-4 w-4" />
                        Sacar
                    </Link>
                </Button>
            </div>
        </PopoverContent>
      </Popover>

      <Sheet>
        <SheetTrigger asChild>
            <Button size="icon" className="bg-lime-400 hover:bg-lime-500 text-black">
                <DepositIcon className="h-6 w-6"/>
            </Button>
        </SheetTrigger>
        <SheetContent 
            side="bottom" 
            className="p-0 bg-transparent border-t border-primary/20"
            style={{
                backgroundImage: 'url(https://raspagreen.com/deposit_bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="bg-card/85 backdrop-blur-sm h-full w-full">
                 <DepositSheet />
            </div>
        </SheetContent>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://placehold.co/40x40.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Usuário</p>
              <p className="text-xs leading-none text-muted-foreground">
                usuario@exemplo.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2" />
              <span>Conta</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/sacar">
                    <DollarSign className="mr-2" />
                    <span>Sacar</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Gamepad2 className="mr-2" />
              <span>Histórico de Jogos</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2" />
              <span>Transações</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShieldCheck className="mr-2" />
              <span>Segurança</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <LogOut className="mr-2" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
