import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className, ...props }: { className?: string }) {
    return (
        <div className={cn("relative", className)} {...props}>
            <Image
                src="https://i.ibb.co/3kC2Vv4/tomate-seco-e-raspadinha-uma-variedade-para-voce-escolher-sushi-e-macarrao.png"
                alt="Raspadinha.click Logo"
                fill
                className="object-contain"
                unoptimized
            />
        </div>
    );
}
