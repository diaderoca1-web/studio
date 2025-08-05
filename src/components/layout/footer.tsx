import Link from "next/link";
import Logo from "../icons/logo";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-card/50 border-t md:py-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 md:py-4">
            <div className="flex flex-col items-center md:items-start space-y-4">
                <Logo className="h-12 w-40" />
                <p className="text-sm text-center md:text-left text-muted-foreground">
                © {new Date().getFullYear()} raspadinha.click. Todos os direitos reservados.
                </p>
                <p className="text-xs max-w-md text-center md:text-left text-muted-foreground">
                A Raspadinha.click é uma plataforma de entretenimento e compras online. Nossos jogos oferecem prêmios físicos e digitais que podem ser adquiridos. Jogue com responsabilidade.
                </p>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-8">
                <div>
                <h3 className="font-bold text-foreground mb-4">Regulamentos</h3>
                <ul className="space-y-2">
                    <li><Link href="/politica-de-privacidade" className="text-sm text-muted-foreground hover:text-primary">Política de Privacidade</Link></li>
                    <li><Link href="/termos-de-uso" className="text-sm text-muted-foreground hover:text-primary">Termos de Uso</Link></li>
                </ul>
                </div>
                <div>
                <h3 className="font-bold text-foreground mb-4">Ajuda</h3>
                <ul className="space-y-2">
                    <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">Perguntas Frequentes</Link></li>
                    <li><Link href="/como-jogar" className="text-sm text-muted-foreground hover:text-primary">Como Jogar</Link></li>
                    <li><Link href="/suporte" className="text-sm text-muted-foreground hover:text-primary">Suporte Técnico</Link></li>
                </ul>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
