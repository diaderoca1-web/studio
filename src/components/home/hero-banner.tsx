"use client";

import Image from "next/image";
import Link from "next/link";
import { heroBanners } from "@/lib/data";

export default function HeroBanner() {
  const banner = heroBanners[0];

  return (
    <section className="relative">
      <Link href="/raspadinhas">
        <div className="aspect-video w-full relative overflow-hidden rounded-lg">
          <Image
            src={banner.imageUrl}
            alt={banner.alt}
            fill
            className="object-cover"
            data-ai-hint={banner.aiHint}
          />
        </div>
      </Link>
    </section>
  );
}
