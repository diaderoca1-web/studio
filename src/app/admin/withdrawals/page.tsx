
'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle } from 'lucide-react';

type WithdrawalRequest = {
  id: string;
  userName: string;
  amount: number;
  pixKeyType: string;
  pixKey: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: Date;
};

const mockWithdrawals: WithdrawalRequest[] = [
    { id: 'w1', userName: 'John Doe', amount: 50.00, pixKeyType: 'CPF', pixKey: '123.456.789-00', status: 'pending', requestedAt: new Date() },
    { id: 'w2', userName: 'Jane Smith', amount: 125.50, pixKeyType: 'E-mail', pixKey: 'jane.smith@example.com', status: 'pending', requestedAt: new Date(Date.now() - 3600 * 1000) },
    { id: 'w3', userName: 'Admin', amount: 1000.00, pixKeyType: 'Aleatória', pixKey: 'abc-123-def-456', status: 'pending', requestedAt: new Date(Date.now() - 86400 * 1000) },
];


export default function WithdrawalsPage() {
    const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(mockWithdrawals);
    const { toast } = useToast();

    const handleWithdrawalAction = (id: string, newStatus: 'approved' | 'rejected') => {
        setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status: newStatus } : w));
        toast({
            title: `Saque ${newStatus === 'approved' ? 'Aprovado' : 'Rejeitado'}`,
            description: `O pedido de saque foi atualizado.`,
        });
    };
    
    const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Saques</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Aprovação de Saques Pendentes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Usuário</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>Tipo de Chave</TableHead>
                                <TableHead>Chave PIX</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingWithdrawals.length > 0 ? pendingWithdrawals.map((w) => (
                                <TableRow key={w.id}>
                                    <TableCell className="font-medium">{w.userName}</TableCell>
                                    <TableCell>R$ {w.amount.toFixed(2)}</TableCell>
                                    <TableCell><Badge variant="outline">{w.pixKeyType}</Badge></TableCell>
                                    <TableCell>{w.pixKey}</TableCell>
                                    <TableCell>{w.requestedAt.toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleWithdrawalAction(w.id, 'approved')}>
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleWithdrawalAction(w.id, 'rejected')}>
                                            <XCircle className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                                        Nenhum saque pendente no momento.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
