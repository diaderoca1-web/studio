
'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from '@/services/auth-service';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// This is a mock since we can't import server-side vars directly
const mockUsers: User[] = [
    { id: '0', name: 'Admin', email: 'admin@raspagreen.com', phone: '00000000000' },
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0987654321' },
];


export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [creditAmount, setCreditAmount] = useState('');
    const [creditType, setCreditType] = useState('real');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        // In a real app, you would fetch users from your API
        // For now, we use a mock list
        setUsers(mockUsers);
    }, []);

    const handleAddCredit = (user: User) => {
        setSelectedUser(user);
        setCreditAmount('');
        setCreditType('real');
        setIsDialogOpen(true);
    };

    const handleConfirmAddCredit = () => {
        if (!selectedUser || !creditAmount) return;
        
        const typeLabel = creditType === 'real' ? 'Saldo Real' : 'Saldo de Bônus';
        console.log(`Adding R$ ${creditAmount} of ${typeLabel} to user ${selectedUser.name}`);
        toast({
            title: 'Crédito Adicionado!',
            description: `R$ ${creditAmount} de ${typeLabel} foram adicionados para ${selectedUser.name}.`,
        });

        // Reset state
        setCreditAmount('');
        setSelectedUser(null);
        setIsDialogOpen(false);
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Usuários</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Gerenciar Usuários</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Telefone</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleAddCredit(user)}>
                                            <PlusCircle className="h-4 w-4 text-primary" />
                                        </Button>
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
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicionar Crédito Manual</DialogTitle>
                        <DialogDescription>
                            Adicione um valor à conta de {selectedUser?.name}. Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-2 pb-4">
                        <div className="space-y-2">
                            <Label>Tipo de Saldo</Label>
                            <RadioGroup defaultValue="real" value={creditType} onValueChange={setCreditType} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="real" id="r-real" />
                                    <Label htmlFor="r-real">Saldo Real</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="bonus" id="r-bonus" />
                                    <Label htmlFor="r-bonus">Saldo de Bônus</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="credit-amount">Valor do Crédito</Label>
                             <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-gray-400">R$</span>
                                <Input
                                    id="credit-amount"
                                    type="number"
                                    value={creditAmount}
                                    onChange={(e) => setCreditAmount(e.target.value)}
                                    placeholder="0,00"
                                    className="pl-10"
                                />
                             </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                        <Button onClick={handleConfirmAddCredit}>Confirmar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}
