import { cn } from "@/lib/utils";
import Image from "next/image";
import logoImage from "/images/tomate-seco-e raspadinha-uma variedade-para-voce-escolher-sushi-e-macarrao.png";

export default function Logo({ className, ...props }: { className?: string }) {
    return (
        <div className={cn("relative", className)} {...props}>
            <Image
                src={logoImage}
                alt="Raspadinha.click Logo"
                className="object-contain h-full w-full"
                unoptimized
            />
        </div>
    );
}
