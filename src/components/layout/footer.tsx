import Link from 'next/link';
import Logo from '../icons/logo';

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex-1 flex flex-col items-center md:items-start">
            <Logo className="h-12 w-auto" />
            <p className="mt-2 text-muted-foreground text-sm max-w-xs">
              Your lucky day is just a scratch away! Play responsibly.
            </p>
          </div>
          <div className="flex flex-1 justify-center md:justify-end gap-8 mt-8 md:mt-0">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Games</h3>
              <Link
                href="/raspadinhas"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                All Scratch Cards
              </Link>
              <Link
                href="/create"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Create with AI
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Legal</h3>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Lucky Scratch. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
