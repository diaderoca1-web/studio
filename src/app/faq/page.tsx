
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
    {
        question: "Como funciona a raspadinha online?",
        answer: "Nossa raspadinha online é um produto onde você compra um bilhete virtual e o 'raspa' para revelar símbolos. Se você encontrar uma combinação vencedora de três símbolos iguais, ganha um prêmio em dinheiro ou um produto, que é creditado na sua conta instantaneamente."
    },
    {
        question: "É seguro jogar no raspadinha.click?",
        answer: "Sim, a segurança é nossa prioridade máxima. Usamos criptografia de ponta para proteger todas as transações e dados pessoais. Nossos jogos são baseados em um Gerador de Números Aleatórios (RNG) certificado, garantindo resultados justos e imparciais."
    },
    {
        question: "Como posso depositar dinheiro na minha conta?",
        answer: "Oferecemos depósitos via PIX. Basta ir até a seção 'Depositar', inserir o valor desejado e um QR Code PIX será gerado. Você pode escaneá-lo com o aplicativo do seu banco ou usar o código 'copia e cola'. O saldo é atualizado em poucos segundos."
    },
    {
        question: "Como faço para sacar meus ganhos?",
        answer: "Para sacar, vá para a página 'Sacar', escolha sua chave PIX, insira o valor e confirme. Processamos os saques rapidamente, mas o tempo pode variar. Lembre-se que a conta bancária de destino deve ter a mesma titularidade (CPF) da sua conta em nosso site."
    },
    {
        question: "Qual o valor mínimo para depósito e saque?",
        answer: "O valor mínimo para depósito é de R$10,00 e o valor mínimo para saque é de R$50,00. Estes valores podem ser ajustados e serão sempre informados nas respectivas páginas."
    },
    {
        question: "Recebi um produto físico como prêmio. Como faço para resgatá-lo?",
        answer: "Parabéns! Se você ganhou um produto físico, você tem a opção de receber o valor correspondente em dinheiro na sua conta ou solicitar o envio do produto. Para solicitar o envio, entre em contato com nosso suporte técnico com o ID da rodada premiada e seu endereço completo."
    }
];

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Perguntas Frequentes (FAQ)</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                     <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="prose prose-invert max-w-none">
                           {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
