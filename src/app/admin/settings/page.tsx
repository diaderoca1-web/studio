
'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("RaspaGreen");
  const [storeEmail, setStoreEmail] = useState("contato@raspagreen.com");
  const [primaryColor, setPrimaryColor] = useState("#2ECC71");
  const [winProbability, setWinProbability] = useState([50]);
  const [paymentClientId, setPaymentClientId] = useState("");
  const [paymentSecretKey, setPaymentSecretKey] = useState("");
  const [dbServiceAccount, setDbServiceAccount] = useState("");
  const [dbDatabaseUrl, setDbDatabaseUrl] = useState("");
  const [analyticsApiKey, setAnalyticsApiKey] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseAnonKey, setSupabaseAnonKey] = useState("");
  const [googleClientId, setGoogleClientId] = useState("");
  const [googleClientSecret, setGoogleClientSecret] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const settings = {
      storeName,
      storeEmail,
      primaryColor,
      winProbability: winProbability[0],
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
    };
    console.log("Saving settings:", settings);
    alert("Configurações salvas! Verifique o console do navegador.");
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
                    Ajuste as configurações de probabilidade e prêmios.
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
