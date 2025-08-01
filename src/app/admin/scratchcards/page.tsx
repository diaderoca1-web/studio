
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { scratchCards } from "@/lib/data";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function ScratchcardsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Raspadinhas</h2>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Criar Nova
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Gerenciar Raspadinhas</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Custo</TableHead>
                                <TableHead>Prêmio Máximo</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {scratchCards.map((card) => (
                                <TableRow key={card.slug}>
                                    <TableCell className="font-medium">{card.title}</TableCell>
                                    <TableCell>R$ {card.cost.toFixed(2)}</TableCell>
                                    <TableCell>R$ {card.prizeAmount.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
