import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className, ...props }: { className?: string }) {
    return (
        <div className={cn("relative", className)} {...props}>
            <Image
                src="https://i.ibb.co/6gZ3GAX/raspadinha-click-logo.png"
                alt="Raspadinha.click Logo"
                fill
                className="object-contain"
            />
        </div>
    );
}
