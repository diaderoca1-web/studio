'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileSidebar } from "@/components/layout/profile-sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type GameHistoryEntry = {
    id: string;
    value: number;
    action: 'win' | 'loss' | 'purchase';
    game: string;
    dateTime: string;
    roundId: string;
}

const mockGameHistory: GameHistoryEntry[] = [
    { id: 'gh1', value: 50.00, action: 'win', game: 'Sorte Instantânea', dateTime: '05/08/2025, 14:30:15', roundId: 'rnd-1a2b3c' },
    { id: 'gh2', value: -1.00, action: 'purchase', game: 'Sorte Instantânea', dateTime: '05/08/2025, 14:30:10', roundId: 'rnd-1a2b3c' },
    { id: 'gh3', value: 0, action: 'loss', game: 'Centavo da Sorte', dateTime: '05/08/2025, 11:20:05', roundId: 'rnd-d4e5f6' },
    { id: 'gh4', value: -0.50, action: 'purchase', game: 'Centavo da Sorte', dateTime: '05/08/2025, 11:20:01', roundId: 'rnd-d4e5f6' },
    { id: 'gh5', value: 20.00, action: 'win', game: 'Raspadinha Suprema', dateTime: '04/08/2025, 20:10:45', roundId: 'rnd-g7h8i9' },
    { id: 'gh6', value: -2.50, action: 'purchase', game: 'Raspadinha Suprema', dateTime: '04/08/2025, 20:10:40', roundId: 'rnd-g7h8i9' },
];

const getActionBadge = (action: GameHistoryEntry['action']) => {
    switch (action) {
        case 'win':
            return <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">Prêmio</Badge>;
        case 'loss':
            return <Badge variant="secondary">Não Premiado</Badge>;
        case 'purchase':
             return <Badge variant="destructive">Compra</Badge>;
        default:
            return <Badge variant="secondary">Desconhecido</Badge>;
    }
}

const getValueCell = (action: GameHistoryEntry['action'], value: number) => {
    const formattedValue = `R$ ${Math.abs(value).toFixed(2)}`;
    switch (action) {
        case 'win':
            return <span className="font-medium text-green-400">{formattedValue}</span>;
        case 'purchase':
            return <span className="font-medium text-red-400">-{formattedValue}</span>;
        default:
            return <span className="text-muted-foreground">{formattedValue}</span>
    }
};

export default function GameHistoryPage() {
  return (
    <div className="container mx-auto max-w-6xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ProfileSidebar />
            <main className="md:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Histórico de Jogos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Valor</TableHead>
                                    <TableHead>Ação</TableHead>
                                    <TableHead>Jogo</TableHead>
                                    <TableHead>Data/Hora</TableHead>
                                    <TableHead>ID Rodada</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockGameHistory.length > 0 ? mockGameHistory.map((entry) => (
                                    <TableRow key={entry.id}>
                                        <TableCell>{getValueCell(entry.action, entry.value)}</TableCell>
                                        <TableCell>{getActionBadge(entry.action)}</TableCell>
                                        <TableCell className="font-medium">{entry.game}</TableCell>
                                        <TableCell className="text-muted-foreground">{entry.dateTime}</TableCell>
                                        <TableCell className="text-muted-foreground">{entry.roundId}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>Ver Detalhes da Rodada</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                                            Você ainda não jogou nenhuma partida.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
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
            </main>
        </div>
    </div>
  );
}
