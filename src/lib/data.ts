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
    alt: "Special Offer Banner 1",
    aiHint: "casino promotion",
  },
  {
    imageUrl: "https://placehold.co/1400x400.png",
    alt: "Special Offer Banner 2",
    aiHint: "lottery tickets",
  },
];

export const recentWinners = [
    { winnerName: "Giovana C.", prizeName: "Notebook Gamer", prizeValue: 4500.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "laptop computer" },
    { winnerName: "Wilson C.", prizeName: "iPhone 15 Pro", prizeValue: 11000.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "smartphone" },
    { winnerName: "Eloá D.", prizeName: "Smart TV 4K 55\"", prizeValue: 3000.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "television screen" },
    { winnerName: "Aline A.", prizeName: "Air Fryer", prizeValue: 850.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "kitchen appliance" },
    { winnerName: "Emilly S.", prizeName: "Smartwatch D20", prizeValue: 150.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "smart watch" },
    { winnerName: "Lavínia T.", prizeName: "10 Reais", prizeValue: 10.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "money cash" },
    { winnerName: "Demian G.", prizeName: "Galaxy Z Flip5", prizeValue: 6000.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "folding phone" },
    { winnerName: "Miranda C.", prizeName: "700 Reais", prizeValue: 700.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "cash pile" },
    { winnerName: "Mayara R.", prizeName: "Redmi 12C", prizeValue: 1400.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "mobile phone" },
    { winnerName: "Miguel da S.", prizeName: "50 Reais", prizeValue: 50.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "money note" },
    { winnerName: "Mariah T.", prizeName: "Bola de Futebol", prizeValue: 500.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "soccer ball" },
    { winnerName: "Márcio S.", prizeName: "Xbox Series X", prizeValue: 4500.00, imageUrl: "https://placehold.co/80x80.png", aiHint: "game console" },
];

export const scratchCards: ScratchCardType[] = [
  {
    slug: "centavo-da-sorte",
    title: "Centavo da Sorte",
    description: "Uma moedinha pode valer mil no PIX. Vai ficar de fora?",
    prizeAmount: 1000.0,
    cost: 0.5,
    imageUrl: "https://placehold.co/400x80.png",
    aiHint: "lucky coin",
  },
  {
    slug: "sorte-instantanea",
    title: "Sorte Instantânea",
    description: "Raspou, ganhou, sacou!",
    prizeAmount: 2500.0,
    cost: 1.0,
    imageUrl: "https://placehold.co/400x80.png",
    aiHint: "gold rush",
  },
  {
    slug: "raspadinha-suprema",
    title: "Raspadinha Suprema",
    description: "Seu bilhete para prêmios de verdade.",
    prizeAmount: 5000.0,
    cost: 2.5,
    imageUrl: "https://placehold.co/400x80.png",
    aiHint: "treasure chest",
  },
  {
    slug: "raspa-relampago",
    title: "Raspa Relâmpago",
    description: "Com um lanche você pode ganhar um Playstation!",
    prizeAmount: 15000.0,
    cost: 5.0,
    imageUrl: "https://placehold.co/400x80.png",
    aiHint: "lightning bolt",
  },
  {
    slug: "raspadinha-magica",
    title: "Raspadinha Mágica",
    description: "Raspadinhas online com pagamentos instantâneos no seu Pix.",
    prizeAmount: 30000.0,
    cost: 50.0,
    imageUrl: "https://placehold.co/400x80.png",
    aiHint: "magic hat",
  },
  {
    slug: "raspe-e-ganhe",
    title: "Raspe e Ganhe",
    description: "Transforme sua sorte em dinheiro de verdade com cada raspada.",
    prizeAmount: 60000.0,
    cost: 100.0,
    imageUrl: "https://placehold.co/400x80.png",
    aiHint: "diamond prize",
  },
  {
    slug: "fortuna-do-pirata",
    title: "Fortuna do Pirata",
    description: "Encontre o tesouro escondido e ganhe prêmios incríveis.",
    prizeAmount: 10000.0,
    cost: 10.0,
    imageUrl: "https://placehold.co/400x80.png",
    aiHint: "pirate treasure",
  },
  {
    slug: "corrida-do-ouro",
    title: "Corrida do Ouro",
    description: "Seja o mais rápido a encontrar o ouro e leve uma bolada.",
    prizeAmount: 20000.0,
    cost: 20.0,
    imageUrl: "https://placehold.co/400x80.png",
    aiHint: "gold mine",
  },
];
