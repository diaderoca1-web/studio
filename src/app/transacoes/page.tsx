
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileSidebar } from "@/components/layout/profile-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Transaction = {
    id: string;
    value: number;
    status: 'pending' | 'completed' | 'failed';
    date: string;
    transactionId: string;
}

const mockDeposits: Transaction[] = [
    { id: 'd1', value: 10.00, status: 'pending', date: '05/08/2025, 12:33:43', transactionId: 'e808b99c-7846-461c-9ab6-039bcac0540e' },
    { id: 'd2', value: 10.00, status: 'pending', date: '05/08/2025, 12:32:00', transactionId: '83818276-db4d-417d-b0ba-dc53598f43bc' },
    { id: 'd3', value: 50.00, status: 'completed', date: '04/08/2025, 18:15:20', transactionId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' },
    { id: 'd4', value: 25.00, status: 'completed', date: '03/08/2025, 09:45:10', transactionId: 'fedcba09-8765-4321-0987-654321fedcba' },
];

const mockWithdrawals: Transaction[] = [
    { id: 'w1', value: 50.00, status: 'completed', date: '02/08/2025, 11:30:00', transactionId: 'abcdef12-3456-7890-abcd-ef1234567890' },
    { id: 'w2', value: 100.00, status: 'failed', date: '01/08/2025, 20:00:50', transactionId: 'fedcba98-7654-3210-fedc-ba9876543210' },
];


const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
        case 'completed':
            return <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">Completo</Badge>;
        case 'pending':
            return <Badge variant="default" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30">Pendente</Badge>;
        case 'failed':
            return <Badge variant="destructive">Falhou</Badge>;
        default:
            return <Badge variant="secondary">Desconhecido</Badge>;
    }
}

const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => (
     <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>ID Transação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {transactions.map((t) => (
                <TableRow key={t.id}>
                    <TableCell className="font-medium text-primary">R$ {t.value.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(t.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{t.date}</TableCell>
                    <TableCell className="text-muted-foreground">{t.transactionId}</TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                <DropdownMenuItem>Relatar Problema</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);


export default function TransactionsPage() {

    return (
        <div className="container mx-auto max-w-6xl py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <ProfileSidebar />
                <main className="md:col-span-3">
                   <Tabs defaultValue="deposits">
                        <Card>
                            <CardHeader className="flex-row items-center justify-between">
                                <CardTitle>Transações</CardTitle>
                                <TabsList>
                                    <TabsTrigger value="deposits">Depósitos</TabsTrigger>
                                    <TabsTrigger value="withdrawals">Saques</TabsTrigger>
                                </TabsList>
                            </CardHeader>
                            <CardContent>
                                <TabsContent value="deposits">
                                    <TransactionsTable transactions={mockDeposits} />
                                </TabsContent>
                                <TabsContent value="withdrawals">
                                     <TransactionsTable transactions={mockWithdrawals} />
                                </TabsContent>

                                <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <span>Mostrar</span>
                                        <Select defaultValue="10">
                                            <SelectTrigger className="w-20 h-8">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="10">10</SelectItem>
                                                <SelectItem value="25">25</SelectItem>
                                                <SelectItem value="50">50</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <span>registros por página</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">Anterior</Button>
                                        <Button variant="default" size="sm" className="w-8 h-8 p-0">1</Button>
                                        <Button variant="outline" size="sm">Próximo</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                   </Tabs>
                </main>
            </div>
        </div>
    );
}
