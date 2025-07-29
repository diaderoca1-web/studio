import Link from "next/link";
import Logo from "../icons/logo";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} raspagreen.com. Todos os direitos reservados.
            </p>
            <p className="text-xs text-muted-foreground/50">
              Raspadinhas e outros jogos de azar são regulamentados e cobertos pela nossa licença de jogos. Jogue com responsabilidade.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold">Regulamentos</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Jogo responsável</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Política de Privacidade</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Termos de Uso</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Ajuda</h3>
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
