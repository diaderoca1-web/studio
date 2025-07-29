import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export default function GiftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-5", props.className)}
      {...props}
    >
        <rect x="3" y="8" width="18" height="4" rx="1"></rect>
        <path d="M12 8v13"></path>
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A2.5 2.5 0 0 1 12 5.5V8"></path>
        <path d="M16.5 8a2.5 2.5 0 0 0 0-5A2.5 2.5 0 0 0 12 5.5V8"></path>
    </svg>
  );
}
