
'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useSettings } from "@/contexts/settings-context";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { settings, setSettings } = useSettings();
  const { toast } = useToast();

  // Local state to manage form inputs
  const [storeName, setStoreName] = useState(settings.storeName);
  const [storeEmail, setStoreEmail] = useState(settings.storeEmail);
  const [primaryColor, setPrimaryColor] = useState(settings.primaryColor);
  const [winProbability, setWinProbability] = useState([settings.winProbability]);
  const [rtp, setRtp] = useState([settings.rtp]);
  const [minWithdrawal, setMinWithdrawal] = useState(settings.minWithdrawal);
  const [withdrawalFee, setWithdrawalFee] = useState([settings.withdrawalFee]);
  const [processingTime, setProcessingTime] = useState(settings.processingTime);
  const [minDeposit, setMinDeposit] = useState(settings.minDeposit);
  const [firstDepositBonus, setFirstDepositBonus] = useState([settings.firstDepositBonus]);
  const [paymentClientId, setPaymentClientId] = useState(settings.paymentClientId);
  const [paymentSecretKey, setPaymentSecretKey] = useState(settings.paymentSecretKey);
  const [dbServiceAccount, setDbServiceAccount] = useState(settings.dbServiceAccount);
  const [dbDatabaseUrl, setDbDatabaseUrl] = useState(settings.dbDatabaseUrl);
  const [analyticsApiKey, setAnalyticsApiKey] = useState(settings.analyticsApiKey);
  const [maintenanceMode, setMaintenanceMode] = useState(settings.maintenanceMode);
  const [supabaseUrl, setSupabaseUrl] = useState(settings.supabaseUrl);
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(settings.supabaseAnonKey);
  const [googleClientId, setGoogleClientId] = useState(settings.googleClientId);
  const [googleClientSecret, setGoogleClientSecret] = useState(settings.googleClientSecret);

  // Update local state if context changes
  useEffect(() => {
    setStoreName(settings.storeName);
    setStoreEmail(settings.storeEmail);
    setPrimaryColor(settings.primaryColor);
    setWinProbability([settings.winProbability]);
    setRtp([settings.rtp]);
    setMinWithdrawal(settings.minWithdrawal);
    setWithdrawalFee([settings.withdrawalFee]);
    setProcessingTime(settings.processingTime);
    setMinDeposit(settings.minDeposit);
    setFirstDepositBonus([settings.firstDepositBonus]);
    setPaymentClientId(settings.paymentClientId);
    setPaymentSecretKey(settings.paymentSecretKey);
    setDbServiceAccount(settings.dbServiceAccount);
    setDbDatabaseUrl(settings.dbDatabaseUrl);
    setAnalyticsApiKey(settings.analyticsApiKey);
    setMaintenanceMode(settings.maintenanceMode);
    setSupabaseUrl(settings.supabaseUrl);
    setSupabaseAnonKey(settings.supabaseAnonKey);
    setGoogleClientId(settings.googleClientId);
    setGoogleClientSecret(settings.googleClientSecret);
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings({
      storeName,
      storeEmail,
      primaryColor,
      winProbability: winProbability[0],
      rtp: rtp[0],
      minWithdrawal,
      withdrawalFee: withdrawalFee[0],
      processingTime,
      minDeposit,
      firstDepositBonus: firstDepositBonus[0],
      paymentClientId,
      paymentSecretKey,
      dbServiceAccount,
      dbDatabaseUrl,
      analyticsApiKey,
      maintenanceMode,
      supabaseUrl,
      supabaseAnonKey,
      googleClientId,
      googleClientSecret,
    });
    toast({
        title: "Configurações Salvas!",
        description: "Suas alterações foram salvas com sucesso.",
    });
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
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
              <Input id="store-name" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-email">Email de Contato</Label>
              <Input id="store-email" type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} />
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
                <Input id="primary-color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
              </div>
              <div className="w-10 h-10 rounded-full border" style={{ backgroundColor: primaryColor }} />
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Mecânica da Plataforma</CardTitle>
                <CardDescription>
                    Ajuste as configurações de probabilidade, retorno e prêmios.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="win-probability">Probabilidade de Acerto (%)</Label>
                    <div className="flex items-center gap-4">
                        <Slider id="win-probability" value={winProbability} onValueChange={setWinProbability} max={100} step={1} className="flex-1" />
                        <span className="w-12 text-right">{winProbability[0]}%</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="rtp">Return to Player (RTP %)</Label>
                    <div className="flex items-center gap-4">
                        <Slider id="rtp" value={rtp} onValueChange={setRtp} max={100} step={1} className="flex-1" />
                        <span className="w-12 text-right">{rtp[0]}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Porcentagem média do dinheiro apostado que retornará aos jogadores.
                    </p>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Configurações de Depósito</CardTitle>
                <CardDescription>
                    Defina as regras para depósitos na plataforma.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="min-deposit">Valor Mínimo de Depósito (R$)</Label>
                    <Input id="min-deposit" type="number" value={minDeposit} onChange={(e) => setMinDeposit(e.target.value)} placeholder="10.00" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="first-deposit-bonus">Bônus de Primeiro Depósito (%)</Label>
                     <div className="flex items-center gap-4">
                        <Slider id="first-deposit-bonus" value={firstDepositBonus} onValueChange={setFirstDepositBonus} max={200} step={5} className="flex-1" />
                        <span className="w-12 text-right">{firstDepositBonus[0]}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Bônus percentual que novos usuários recebem no primeiro depósito.
                    </p>
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Configurações de Saque</CardTitle>
                <CardDescription>
                    Gerencie as regras e taxas para retiradas.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="min-withdrawal">Valor Mínimo de Saque (R$)</Label>
                    <Input id="min-withdrawal" type="number" value={minWithdrawal} onChange={(e) => setMinWithdrawal(e.target.value)} placeholder="50.00" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="withdrawal-fee">Taxa de Saque (%)</Label>
                     <div className="flex items-center gap-4">
                        <Slider id="withdrawal-fee" value={withdrawalFee} onValueChange={setWithdrawalFee} max={10} step={0.5} className="flex-1" />
                        <span className="w-12 text-right">{withdrawalFee[0]}%</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="processing-time">Tempo Estimado de Processamento</Label>
                    <Input id="processing-time" value={processingTime} onChange={(e) => setProcessingTime(e.target.value)} placeholder="Ex: 24 horas úteis" />
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
                    <Input id="payment-client-id" placeholder="pk_live_..." value={paymentClientId} onChange={(e) => setPaymentClientId(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="payment-secret-key">Secret Key</Label>
                    <Input id="payment-secret-key" type="password" placeholder="sk_live_..." value={paymentSecretKey} onChange={(e) => setPaymentSecretKey(e.target.value)} />
                </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supabase</CardTitle>
            <CardDescription>
              Configure a integração com o Supabase.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supabase-url">Supabase URL</Label>
              <Input id="supabase-url" placeholder="https://<YOUR_PROJECT_ID>.supabase.co" value={supabaseUrl} onChange={(e) => setSupabaseUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supabase-anon-key">Supabase Anon Key</Label>
              <Input id="supabase-anon-key" type="password" placeholder="eyJhbGciOi..." value={supabaseAnonKey} onChange={(e) => setSupabaseAnonKey(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Google Login</CardTitle>
            <CardDescription>
              Configure as credenciais do Google para login social.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="google-client-id">Google Client ID</Label>
              <Input id="google-client-id" placeholder="<YOUR_CLIENT_ID>.apps.googleusercontent.com" value={googleClientId} onChange={(e) => setGoogleClientId(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="google-client-secret">Google Client Secret</Label>
              <Input id="google-client-secret" type="password" placeholder="GOCSPX-..." value={googleClientSecret} onChange={(e) => setGoogleClientSecret(e.target.value)} />
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
              <Textarea id="db-service-account" placeholder='{ "type": "service_account", ... }' rows={5} value={dbServiceAccount} onChange={(e) => setDbServiceAccount(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-database-url">Realtime Database URL</Label>
              <Input id="db-database-url" placeholder="https://<YOUR_PROJECT_ID>.firebaseio.com" value={dbDatabaseUrl} onChange={(e) => setDbDatabaseUrl(e.target.value)} />
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
                    <Input id="analytics-api-key" placeholder="G-..." value={analyticsApiKey} onChange={(e) => setAnalyticsApiKey(e.target.value)} />
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
                    <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                </div>
            </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </div>
  );
}
