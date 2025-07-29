import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export default function Logo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 160 40"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <linearGradient id="clover-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#2ECC71', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#27AE60', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <g transform="translate(5,5) scale(0.8)">
            <path d="M21.5,13.2a5.3,5.3,0,0,0-7.5,0,5.3,5.3,0,0,0,0,7.5,5.3,5.3,0,0,0,7.5,0,2.5,2.5,0,0,1,3.5,0,5.3,5.3,0,0,0,7.5,0,5.3,5.3,0,0,0,0-7.5,5.3,5.3,0,0,0-7.5,0,2.5,2.5,0,0,1-3.5,0Z" fill="url(#clover-gradient)"/>
            <path d="M20.8,21.5a5.3,5.3,0,0,0,0-7.5,5.3,5.3,0,0,0-7.5,0,2.5,2.5,0,0,1,0,3.5,5.3,5.3,0,0,0,0,7.5,5.3,5.3,0,0,0,7.5,0,5.3,5.3,0,0,0,0-7.5,2.5,2.5,0,0,1,0-3.5Z" fill="url(#clover-gradient)"/>
            <path d="M13.2,20.8a5.3,5.3,0,0,0,0-7.5,5.3,5.3,0,0,0-7.5,0,2.5,2.5,0,0,1-3.5-3.5,5.3,5.3,0,0,0-7.5,0,5.3,5.3,0,0,0,0,7.5,5.3,5.3,0,0,0,7.5,0,2.5,2.5,0,0,1,3.5,3.5,5.3,5.3,0,0,0,7.5,0Z" fill="url(#clover-gradient)"/>
            <path d="M21.5,20.8a5.3,5.3,0,0,0,7.5,0,5.3,5.3,0,0,0,0-7.5,2.5,2.5,0,0,1-3.5-3.5,5.3,5.3,0,0,0-7.5,0,5.3,5.3,0,0,0,0,7.5,5.3,5.3,0,0,0,7.5,0,2.5,2.5,0,0,1-3.5,3.5Z" fill="url(#clover-gradient)" />
            </g>
             <text x="50" y="28" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="white">
                <tspan>RASPA </tspan>
                <tspan fill="hsl(var(--primary))">GREEN</tspan>
            </text>
        </svg>
    );
}
