export type ScratchCardType = {
  slug: string;
  title: string;
  description: string;
  prizeAmount: number;
  cost: number;
  imageUrl: string;
  aiHint: string;
};

export const heroBanners = [
  {
    imageUrl: "https://placehold.co/1400x400.png",
    alt: "R$ 1.000 com apenas 1 real",
    aiHint: "casino promotion",
  },
  {
    imageUrl: "https://placehold.co/1400x400.png",
    alt: "Special Offer Banner 2",
    aiHint: "lottery tickets",
  },
];

export const recentWinners = [
    { winnerName: "Léia Pr***", prizeName: "Caixa de som JB...", prizeValue: 2500.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "bluetooth speaker" },
    { winnerName: "Pietra Pe**", prizeName: "Datejust 41", prizeValue: 75400.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "luxury watch" },
    { winnerName: "Wilson C.", prizeName: "iPhone 15 Pro", prizeValue: 11000.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "smartphone" },
    { winnerName: "Eloá D.", prizeName: "Smart TV 4K 55\"", prizeValue: 3000.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "television screen" },
];

export const scratchCards: ScratchCardType[] = [
  {
    slug: "centavo-da-sorte",
    title: "Centavo da Sorte",
    description: "Uma moedinha pode valer mil no PIX. Vai ficar de fora?",
    prizeAmount: 1000.0,
    cost: 0.5,
    imageUrl: "https://placehold.co/400x225.png",
    aiHint: "lucky coin",
  },
  {
    slug: "sorte-instantanea",
    title: "Sorte Instantânea",
    description: "Raspou, ganhou, sacou!",
    prizeAmount: 2500.0,
    cost: 1.0,
    imageUrl: "https://placehold.co/400x225.png",
    aiHint: "gold rush",
  },
  {
    slug: "raspadinha-suprema",
    title: "Raspadinha Suprema",
    description: "Seu bilhete para prêmios de verdade.",
    prizeAmount: 5000.0,
    cost: 2.5,
    imageUrl: "https://placehold.co/400x225.png",
    aiHint: "treasure chest",
  },
  {
    slug: "raspa-relampago",
    title: "Raspa Relâmpago",
    description: "Com um lanche você pode ganhar um Playstation!",
    prizeAmount: 15000.0,
    cost: 5.0,
    imageUrl: "https://placehold.co/400x225.png",
    aiHint: "lightning bolt",
  },
  {
    slug: "raspadinha-magica",
    title: "Raspadinha Mágica",
    description: "Raspadinhas online com pagamentos instantâneos no seu Pix.",
    prizeAmount: 30000.0,
    cost: 50.0,
    imageUrl: "https://placehold.co/400x225.png",
    aiHint: "magic hat",
  },
  {
    slug: "raspe-e-ganhe",
    title: "Raspe e Ganhe",
    description: "Transforme sua sorte em dinheiro de verdade com cada raspada.",
    prizeAmount: 60000.0,
    cost: 100.0,
    imageUrl: "https://placehold.co/400x225.png",
    aiHint: "diamond prize",
  },
];
