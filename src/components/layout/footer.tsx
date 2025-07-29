import Link from "next/link";
import Logo from "../icons/logo";

export function Footer() {
  return (
    <footer className="bg-card/50 border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:items-start space-y-8">
          <Logo className="h-10 w-auto" />

          <div className="text-center md:text-left text-muted-foreground space-y-4">
            <p className="text-sm">
              © {new Date().getFullYear()} raspagreen.com. Todos os direitos reservados.
            </p>
            <p className="text-xs max-w-md">
              Raspadinhas e outros jogos de azar são regulamentados e cobertos
              pela nossa licença de jogos. Jogue com responsabilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-auto">
            <div>
              <h3 className="font-bold text-foreground mb-4">Regulamentos</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Jogo responsável</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Política de Privacidade</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Termos de Uso</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Ajuda</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Perguntas Frequentes</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Como Jogar</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Suporte Técnico</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
