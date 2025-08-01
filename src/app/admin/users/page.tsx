
'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, getAllUsers } from '@/services/auth-service';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/auth-context';


export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [creditAmount, setCreditAmount] = useState('');
    const [creditType, setCreditType] = useState('real');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();
    const { addBalance, updateUserInContext, user: loggedInUser } = useAuth();


    const fetchUsers = async () => {
        const userList = await getAllUsers();
        setUsers(userList);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddCredit = (user: User) => {
        setSelectedUser(user);
        setCreditAmount('');
        setCreditType('real');
        setIsDialogOpen(true);
    };

    const handleConfirmAddCredit = async () => {
        if (!selectedUser || !creditAmount) return;

        const amount = parseFloat(creditAmount.replace(',', '.'));
        if (isNaN(amount) || amount <= 0) {
            toast({ title: "Erro", description: "Por favor, insira um valor válido.", variant: "destructive" });
            return;
        }
        
        const success = await addBalance(selectedUser.id, amount);
        
        if (success) {
            const typeLabel = creditType === 'real' ? 'Saldo Real' : 'Saldo de Bônus';
            toast({
                title: 'Crédito Adicionado!',
                description: `R$ ${amount.toFixed(2)} de ${typeLabel} foram adicionados para ${selectedUser.name}.`,
            });
            // Re-fetch users to show updated balance, though it's client-side only
            fetchUsers();
            if (loggedInUser && loggedInUser.id === selectedUser.id) {
                const newBalance = (loggedInUser.balance || 0) + amount;
                updateUserInContext({ ...loggedInUser, balance: newBalance });
            }

        } else {
             toast({
                title: "Erro",
                description: "Não foi possível adicionar o crédito.",
                variant: "destructive",
            });
        }


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
                                <TableHead>Saldo</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>R$ {(user.balance || 0).toFixed(2)}</TableCell>
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
