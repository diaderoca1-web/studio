
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className, ...props }: { className?: string }) {
    return (
        <div className={cn("relative", className)} {...props}>
            <Image
                src="/images/logo.png"
                alt="Raspadinha.click Logo"
                fill
                className="object-contain"
                unoptimized
            />
        </div>
    );
}
