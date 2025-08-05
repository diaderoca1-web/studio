
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Política de Privacidade</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
            <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

            <h2>1. Introdução</h2>
            <p>
                A sua privacidade é importante para nós. É política do raspadinha.click respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site raspadinha.click, e outros sites que possuímos e operamos.
            </p>

            <h2>2. Informações que Coletamos</h2>
            <p>
                Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
            </p>
            <ul>
                <li><strong>Informações de Cadastro:</strong> Nome, e-mail, número de telefone.</li>
                <li><strong>Informações de Transação:</strong> Detalhes sobre depósitos e saques.</li>
                <li><strong>Dados de Uso:</strong> Como você interage com nossa plataforma.</li>
            </ul>

            <h2>3. Como Usamos Suas Informações</h2>
            <p>
                Usamos as informações que coletamos para operar, manter e fornecer os recursos e a funcionalidade da nossa plataforma, incluindo:
            </p>
            <ul>
                <li>Para processar suas transações.</li>
                <li>Para fornecer suporte ao cliente.</li>
                <li>Para nos comunicarmos com você sobre sua conta.</li>
                <li>Para monitorar e melhorar nossos serviços.</li>
            </ul>

            <h2>4. Segurança dos Dados</h2>
            <p>
                Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
            </p>

            <h2>5. Links para Sites de Terceiros</h2>
            <p>
                O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
            </p>

            <h2>6. Alterações a Esta Política</h2>
            <p>
                Podemos atualizar nossa política de privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações, publicando a nova política de privacidade nesta página.
            </p>

            <h2>7. Contato</h2>
            <p>
                Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco através do e-mail: [email de suporte].
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
