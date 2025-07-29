
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
    { winnerName: "Léia Pr***", prizeName: "Caixa de som JBL", prizeValue: 2500.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/variant_jbl_boombox_3_black.png?updatedAt=1751634894498", aiHint: "bluetooth speaker" },
    { winnerName: "Pietra Pe**", prizeName: "iPhone 15 Pro Max", prizeValue: 11000.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/variant_iphone_15_pro_max_256_gb_nio_preto.png?updatedAt=1751634894448", aiHint: "smartphone" },
    { winnerName: "Wilson C.", prizeName: "Moto Pop 110i", prizeValue: 9500.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/variant_pop_110i_branco.png?updatedAt=1751634894490", aiHint: "scooter" },
    { winnerName: "Eloá D.", prizeName: "iPhone 15 Pro", prizeValue: 11000.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/variant_iphone_15_pro_256_gb_tit_nio_natural.png?updatedAt=1751634894188", aiHint: "smartphone" },
    { winnerName: "Carlos F.", prizeName: "Galaxy Z Flip5", prizeValue: 6000.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/variant_galaxy_z_flip5_256_gb_creme.png?updatedAt=1751634892797", aiHint: "smartphone" },
    { winnerName: "Ana G.", prizeName: "Motorola Edge 40 Neo", prizeValue: 2500.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/variant_edge_40_neo_256_gb_black_beauty.png?updatedAt=1751634892779", aiHint: "smartphone" },
    { winnerName: "Beatriz L.", prizeName: "Moto Biz 110i", prizeValue: 13000.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/variant_biz_110i_vermelho.png?updatedAt=1751634892737", aiHint: "scooter" },
    { winnerName: "Daniel M.", prizeName: "Xbox Series X", prizeValue: 4500.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_xbox_series_x.png?updatedAt=1751634892410", aiHint: "video game console" },
    { winnerName: "Eduarda N.", prizeName: "Sofá 3 Lugares", prizeValue: 1800.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_sof_3_lugares_beny_base.png?updatedAt=1751634892378", aiHint: "sofa" },
    { winnerName: "Fernanda P.", prizeName: "Smartwatch D20", prizeValue: 150.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_smartwatch_d20_shock.png?updatedAt=1751634892443", aiHint: "smartwatch" },
    { winnerName: "Gustavo Q.", prizeName: "Smart TV 4K 55\"", prizeValue: 3000.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_smart_tv_4k_55.png?updatedAt=1751634892461", aiHint: "television screen" },
    { winnerName: "Heitor R.", prizeName: "Playstation 5", prizeValue: 4500.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_playstation_5.png?updatedAt=1751634892317", aiHint: "video game console" },
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
