
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
      </div>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Loja</CardTitle>
            <CardDescription>
              Gerencie as configurações da sua loja.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">Nome da Loja</Label>
              <Input id="store-name" defaultValue="RaspaGreen" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-email">Email de Contato</Label>
              <Input id="store-email" type="email" defaultValue="contato@raspagreen.com" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aparência</CardTitle>
            <CardDescription>
              Personalize a aparência do seu site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="primary-color">Cor Primária</Label>
                <Input id="primary-color" defaultValue="#2ECC71" />
              </div>
              <div className="w-10 h-10 rounded-full bg-primary border" />
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Mecânica de Jogo</CardTitle>
                <CardDescription>
                    Ajuste as configurações de probabilidade e prêmios.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="win-probability">Probabilidade de Vitória (%)</Label>
                    <div className="flex items-center gap-4">
                        <Slider id="win-probability" defaultValue={[50]} max={100} step={1} className="flex-1" />
                        <span className="w-12 text-right">50%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Gateway de Pagamento</CardTitle>
                <CardDescription>
                    Integre com seu provedor de pagamento (ex: Stripe, PayPal).
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="payment-client-id">Client ID</Label>
                    <Input id="payment-client-id" placeholder="pk_live_..." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="payment-secret-key">Secret Key</Label>
                    <Input id="payment-secret-key" type="password" placeholder="sk_live_..." />
                </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Banco de Dados</CardTitle>
            <CardDescription>
              Gerencie as configurações de conexão com o banco de dados.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="db-service-account">Firebase Service Account JSON</Label>
              <Textarea id="db-service-account" placeholder='{ "type": "service_account", ... }' rows={5}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-database-url">Realtime Database URL</Label>
              <Input id="db-database-url" placeholder="https://<YOUR_PROJECT_ID>.firebaseio.com" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Chaves de API</CardTitle>
                <CardDescription>
                    Gerencie chaves de API para serviços de terceiros.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="analytics-api-key">Google Analytics API Key</Label>
                    <Input id="analytics-api-key" placeholder="G-..." />
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Avançado</CardTitle>
                <CardDescription>
                    Configurações avançadas para administradores.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="maintenance-mode" className="text-base">Modo Manutenção</Label>
                        <p className="text-sm text-muted-foreground">
                            Desative temporariamente o acesso público ao site para manutenção.
                        </p>
                    </div>
                    <Switch id="maintenance-mode" />
                </div>
            </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button>Salvar Alterações</Button>
        </div>
      </div>
    </div>
  );
}
