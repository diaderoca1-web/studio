
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-2xl py-12">
        <div className="space-y-4 text-center mb-12">
            <User className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Minha Conta
            </h1>
            <p className="text-muted-foreground md:text-xl">
                Gerencie suas informações pessoais e de segurança.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Em Breve</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Esta página está em construção. Volte em breve para mais novidades!</p>
            </CardContent>
        </Card>
    </div>
  );
}
