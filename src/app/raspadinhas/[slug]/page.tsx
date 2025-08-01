
import { notFound } from "next/navigation";
import { scratchCards } from "@/lib/data";
import ScratchCardPageClient from "@/components/scratch-card-page-client";

export default async function ScratchCardPage({ params }: { params: { slug: string } }) {
  const card = scratchCards.find((c) => c.slug === params.slug);

  if (!card) {
    notFound();
  }

  return <ScratchCardPageClient card={card} />;
}

export async function generateStaticParams() {
    return scratchCards.map((card) => ({
      slug: card.slug,
    }));
}
