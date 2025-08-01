import { cn } from "@/lib/utils";

export default function Logo({ className, ...props }: { className?: string }) {
    return (
        <div className={cn("relative", className)} {...props}>
            <img
                src="https://i.ibb.co/6gZ3GAX/raspadinha-click-logo.png"
                alt="Raspadinha.click Logo"
                className="object-contain h-full w-full"
            />
        </div>
    );
}
