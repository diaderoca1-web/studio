
import Link from "next/link";
import Logo from "../icons/logo";
import Image from "next/image";

const seals = [
    { name: 'SSL Secure', imageUrl: 'https://raspagreen.com/selo-ssl.png' },
    { name: '24/7 Support', imageUrl: 'https://raspagreen.com/selo-24-7.png' },
    { name: 'Pix', imageUrl: 'https://raspagreen.com/selo-pix.png' },
    { name: '18+', imageUrl: 'https://raspagreen.com/selo-18.png' },
    { name: 'Fair Play', imageUrl: 'https://raspagreen.com/selo-fair.png' },
];

export function Footer() {
  return (
    <footer className="bg-card/50 border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start space-y-4">
                <Logo className="h-10 w-auto" />
                <p className="text-sm text-center md:text-left text-muted-foreground">
                © {new Date().getFullYear()} raspagreen.com. Todos os direitos reservados.
                </p>
                <p className="text-xs max-w-md text-center md:text-left text-muted-foreground">
                A RaspaGreen é uma plataforma de entretenimento e compras online. Nossos jogos oferecem prêmios físicos e digitais que podem ser adquiridos. Jogue com responsabilidade.
                </p>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-8">
                <div>
                <h3 className="font-bold text-foreground mb-4">Regulamentos</h3>
                <ul className="space-y-2">
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
         <div className="border-t border-border mt-8 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-6">
                {seals.map((seal) => (
                    <div key={seal.name} className="flex items-center justify-center h-10">
                        <Image
                            src={seal.imageUrl}
                            alt={seal.name}
                            width={100}
                            height={40}
                            className="object-contain h-full w-auto"
                        />
                    </div>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
}
