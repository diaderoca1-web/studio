
import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export default function DepositIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-6", props.className)}
      {...props}
    >
        <path d="M21 7.25C21 6.00736 20.0196 5 18.8 5H5.2C3.98043 5 3 6.00736 3 7.25V16.75C3 17.9926 3.98043 19 5.2 19H14.85C14.52 18.43 14.28 17.77 14.15 17.05L14.1 16.75C14.1 16.58 14.1 16.42 14.1 16.25C14.1 14.4551 15.5449 13 17.35 13C18.17 13 18.91 13.28 19.49 13.75L19.7 13.91C19.77 13.96 19.83 14.02 19.89 14.07C20.45 14.56 20.85 15.21 21 15.95V7.25Z" />
        <path d="M18.5 14C17.6716 14 17 14.6716 17 15.5V17H15.5C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20H17V21.5C17 22.3284 17.6716 23 18.5 23C19.3284 23 20 22.3284 20 21.5V20H21.5C22.3284 20 23 19.3284 23 18.5C23 17.6716 22.3284 17 21.5 17H20V15.5C20 14.6716 19.3284 14 18.5 14Z" />
    </svg>
  );
}
