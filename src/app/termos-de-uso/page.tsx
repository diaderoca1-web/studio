
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Termos de Uso</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
            <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

            <h2>1. Aceitação dos Termos</h2>
            <p>
                Ao acessar e usar o raspadinha.click, você aceita e concorda em ficar vinculado pelos termos e disposições deste acordo. Além disso, ao usar estes serviços específicos, você estará sujeito a quaisquer diretrizes ou regras aplicáveis.
            </p>

            <h2>2. Elegibilidade</h2>
            <p>
                Você deve ter pelo menos 18 anos de idade para usar nossa plataforma. Ao se registrar, você declara e garante que tem idade legal para formar um contrato vinculativo.
            </p>
            
            <h2>3. Conduta do Usuário</h2>
            <p>
                Você concorda em não usar o Serviço para:
            </p>
            <ul>
                <li>Violar qualquer lei local, estadual, nacional ou internacional.</li>
                <li>Criar múltiplas contas para um único usuário.</li>
                <li>Usar qualquer forma de automação ou bots para interagir com o sistema.</li>
                <li>Tentar fraudar o sistema de qualquer forma.</li>
            </ul>

            <h2>4. Contas</h2>
            <p>
                Você é responsável por manter a confidencialidade de sua conta e senha e por restringir o acesso ao seu computador. Você concorda em aceitar a responsabilidade por todas as atividades que ocorram sob sua conta ou senha.
            </p>

            <h2>5. Propriedade Intelectual</h2>
            <p>
                O Serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva do raspadinha.click e seus licenciadores.
            </p>

            <h2>6. Limitação de Responsabilidade</h2>
            <p>
                Em nenhuma circunstância o raspadinha.click, nem seus diretores, funcionários, parceiros, agentes, fornecedores ou afiliados, serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos.
            </p>

             <h2>7. Encerramento</h2>
            <p>
                Podemos encerrar ou suspender sua conta imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos.
            </p>
            
            <h2>8. Alterações nos Termos</h2>
            <p>
                Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir estes Termos a qualquer momento.
            </p>

        </CardContent>
      </Card>
    </div>
  );
}
