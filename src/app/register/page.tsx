
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { User, Lock, Smartphone } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
  phone: z.string().min(10, { message: 'Por favor, insira um número de WhatsApp válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await register({ name: values.name, phone: values.phone, pass: values.password });
      toast({
        title: 'Sucesso!',
        description: 'Sua conta foi criada com sucesso.',
      });
      router.push('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
      toast({
        title: 'Erro de Registro',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Crie sua conta</h1>
            <p className="text-muted-foreground">É rápido e fácil, vamos começar!</p>
        </div>
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="Nome completo" {...field} className="pl-10" />
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="Seu WhatsApp" {...field} className="pl-10" />
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                            <Input type={showPassword ? "text" : "password"} placeholder="Crie uma senha" {...field} className="pl-10 pr-20" />
                        </FormControl>
                         <Button type="button" variant="link" className="absolute right-1 top-1/2 -translate-y-1/2 h-auto p-0 text-primary" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
            </form>
          </Form>

        <div className="flex items-center space-x-2">
            <div className="flex-1 h-px bg-muted-foreground/20" />
            <span className="text-sm text-muted-foreground">OU</span>
            <div className="flex-1 h-px bg-muted-foreground/20" />
        </div>

        <div className="space-y-4">
             <div className="text-center text-sm">
                Já tem uma conta?{' '}
                <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
                    Entrar
                </Link>
            </div>
            <Button variant="outline" className="w-full">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M43.6113 20.0833H42V20H24V28H35.3033C33.655 31.6367 30.075 34 24 34C17.4 34 12 28.6 12 22C12 15.4 17.4 10 24 10C27.3 10 30.24 11.44 32.27 13.62L38.05 7.84C34.2467 4.41667 29.4267 2 24 2C13.26 2 4.92667 9.41333 4.08333 19.5H3V20V24V24.5H4.08333C4.92667 34.5867 13.26 42 24 42C34.6933 42 43.1 34.7333 43.8333 24.5H44V24V20H43.6113V20.0833Z" fill="#FFC107"/>
                    <path d="M43.6113 20.0833H42V20H24V28H35.3033C33.655 31.6367 30.075 34 24 34C17.4 34 12 28.6 12 22C12 15.4 17.4 10 24 10C27.3 10 30.24 11.44 32.27 13.62L38.05 7.84C34.2467 4.41667 29.4267 2 24 2C13.26 2 4.92667 9.41333 4.08333 19.5H3V20V24V24.5H4.08333C4.92667 34.5867 13.26 42 24 42C30.4333 42 35.8333 38.8333 38.8333 34H24V26H43.8333C44 25.3333 44 24.6667 44 24C44 22.6667 43.8667 21.3333 43.6113 20.0833Z" fill="#FF3D00"/>
                    <path d="M4.08333 19.5H3V20V24V24.5H4.08333C4.92667 34.5867 13.26 42 24 42C27.0533 42 29.8333 41.34 32.25 40.23L26.33 34.31C25.61 34.1333 24.8333 34 24 34C20.4433 34 17.4033 31.8133 16.0467 28.71L10.26 34.49C13.06 39.0733 18.1533 42 24 42C34.6933 42 43.1 34.7333 43.8333 24.5H44V24V20H43.6113V20.0833H42V20H24V28H35.3033C35.0933 28.6733 34.7833 29.3133 34.3767 29.91L28.5967 24.13C28.5567 23.4133 28.5 22.6867 28.5 22C28.5 18.98 30.9167 16.5333 33.9167 16.14L32.27 13.62C30.24 11.44 27.3 10 24 10C18.4667 10 13.6533 13.3133 11.41 17.75L5.63 11.97C8.58667 6.42667 15.68 2 24 2C29.4267 2 34.2467 4.41667 38.05 7.84L32.27 13.62C30.24 11.44 27.3 10 24 10C17.4 10 12 15.4 12 22C12 28.6 17.4 34 24 34C30.075 34 33.655 31.6367 35.3033 28H24V20H42V20.0833H43.6113C43.8667 21.3333 44 22.6667 44 24C44 24.6667 44 25.3333 43.8333 26H24V34H38.8333C35.8333 38.8333 30.4333 42 24 42C13.26 42 4.92667 34.5867 4.08333 24.5Z" fill="#4CAF50"/>
                    <path d="M43.8333 24.5H44V24C44 22.6667 43.8667 21.3333 43.6113 20.0833H42V20H24V28H35.3033C34.4767 30.1433 32.7933 31.7933 30.73 32.65L36.51 38.43C40.6833 35.9133 43.12 30.65 43.12 24.5H43.8333Z" fill="#1976D2"/>
                </svg>
                Continuar com o Google
            </Button>
        </div>
      </div>
    </div>
  );
}
