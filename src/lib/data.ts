
export type PrizeType = {
  name: string;
  value: number;
  imageUrl: string;
  aiHint?: string;
};

export type ScratchCardType = {
  slug: string;
  title: string;
  description: string;
  prizeAmount: number;
  cost: number;
  imageUrl: string;
  aiHint: string;
  prizes: PrizeType[];
};

export const heroBanners = [
  {
    imageUrl: "https://ik.imagekit.io/azx3nlpdu/NOVOS-BANNER-RASPA.png?updatedAt=1753297869020",
    alt: "Special Offer Banner 1",
    aiHint: "casino promotion",
  },
  {
    imageUrl: "https://ik.imagekit.io/azx3nlpdu/NOVOS-BANNER-RASPA.png?updatedAt=1753474399329",
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
    { winnerName: "Isabela S.", prizeName: "Notebook G15", prizeValue: 4500.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_notebook_g15.png?updatedAt=1751634891010", aiHint: "laptop" },
    { winnerName: "João T.", prizeName: "Geladeira Frost Free", prizeValue: 7500.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_geladeira_frost_free.png?updatedAt=1751634890810", aiHint: "refrigerator" },
    { winnerName: "Karla U.", prizeName: "Bola de Futebol", prizeValue: 120.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_ft_5_branca_e_preta.png?updatedAt=1751634891004", aiHint: "soccer ball" },
    { winnerName: "Lucas V.", prizeName: "Fone de Ouvido Bluetooth", prizeValue: 170.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_fone_de_ouvido_bluetooth.png?updatedAt=1751634890865", aiHint: "headphones" },
    { winnerName: "Mariana W.", prizeName: "Copo Térmico Stanley Azul", prizeValue: 165.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_copo_termico_stanley_azul.png?updatedAt=1751634891016", aiHint: "thermal cup" },
    { winnerName: "Nicolas X.", prizeName: "Copo Térmico Stanley Rosa", prizeValue: 165.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_copo_t_rmico_stanley_rosa.png?updatedAt=1751634897689", aiHint: "thermal cup" },
    { winnerName: "Otávio Y.", prizeName: "Copo Térmico Stanley Preto", prizeValue: 165.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_copo_t_rmico_stanley_preto.png?updatedAt=1751634897660", aiHint: "thermal cup" },
    { winnerName: "Patrícia Z.", prizeName: "Controle Xbox Eletric Volt", prizeValue: 450.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_controle_xbox_eletric_volt.png?updatedAt=1751634897634", aiHint: "game controller" },
    { winnerName: "Quintino A.", prizeName: "Controle Xbox Astral Purple", prizeValue: 450.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_controle_xbox_astral_purple.png?updatedAt=1751634897414", aiHint: "game controller" },
    { winnerName: "Rafaela B.", prizeName: "Controle DualSense Midnight Black", prizeValue: 470.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_controle_dualsense_playstation_midnight_black.png?updatedAt=1751634897303", aiHint: "game controller" },
    { winnerName: "Sofia C.", prizeName: "Churrasqueira Cerâmica a Carvão", prizeValue: 20000.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_churrasqueira_cer_mica_carv_o.png?updatedAt=1751634896778", aiHint: "barbecue grill" },
    { winnerName: "Tiago D.", prizeName: "Churrasqueira a Gás", prizeValue: 15000.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_churrasqueira_a_g_s_versia_gourmand.png?updatedAt=1751634896402", aiHint: "barbecue grill" },
    { winnerName: "Úrsula E.", prizeName: "Chinelo Havaianas", prizeValue: 40.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_chinelo_havaianas_top_branco.png?updatedAt=1751634896291", aiHint: "sandals" },
    { winnerName: "Valentina F.", prizeName: "Camisa Nike Brasil II", prizeValue: 350.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_camisa_nike_brasil_ii_2022_23_torcedor_pro.png?updatedAt=1751634896216", aiHint: "soccer jersey" },
    { winnerName: "Wagner G.", prizeName: "Camisa Nike Brasil I", prizeValue: 350.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_camisa_nike_brasil_i_2022_23_torcedor_pro.png?updatedAt=1751634896257", aiHint: "soccer jersey" },
    { winnerName: "Xuxa H.", prizeName: "Camisa do seu Time", prizeValue: 300.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_camisa_do_seu_time.png?updatedAt=1751634896240", aiHint: "soccer jersey" },
    { winnerName: "Yasmin I.", prizeName: "AirPods 3ª Geração", prizeValue: 1900.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/item_airpods_3_gera_o.png?updatedAt=1751634894740", aiHint: "earbuds" },
    { winnerName: "Ziraldo J.", prizeName: "500 Reais", prizeValue: 500.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/500-REAIS.png?updatedAt=1752856623150", aiHint: "money" },
    { winnerName: "Abel K.", prizeName: "50 Centavos", prizeValue: 0.50, imageUrl: "https://ik.imagekit.io/azx3nlpdu/50-CENTAVOS-2.png?updatedAt=1752864509979", aiHint: "coin" },
    { winnerName: "Bento L.", prizeName: "10000 Reais", prizeValue: 10000.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/5.png?updatedAt=1752731173073", aiHint: "money" },
    { winnerName: "Caio M.", prizeName: "2000 Reais", prizeValue: 2000.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/2K.png?updatedAt=1752731173023", aiHint: "money" },
    { winnerName: "Davi N.", prizeName: "1000 Reais", prizeValue: 1000.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/1K.png?updatedAt=1752865094958", aiHint: "money" },
    { winnerName: "Enzo O.", prizeName: "1 Real", prizeValue: 1.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/Notas/1%20REAL.png?updatedAt=1752047821586", aiHint: "money" },
    { winnerName: "Felipe P.", prizeName: "2 Reais", prizeValue: 2.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/Notas/2%20REAIS.png?updatedAt=1752047821644", aiHint: "money" },
    { winnerName: "Gabriel Q.", prizeName: "100 Reais", prizeValue: 100.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/Notas/100%20REAIS.png?updatedAt=1752047821876", aiHint: "money" },
    { winnerName: "Heitor R.", prizeName: "20 Reais", prizeValue: 20.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/Notas/20%20REAIS.png?updatedAt=1752047821716", aiHint: "money" },
    { winnerName: "Isaac S.", prizeName: "15 Reais", prizeValue: 15.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/Notas/15%20REAIS.png?updatedAt=1752047821835", aiHint: "money" },
    { winnerName: "Joaquim T.", prizeName: "10 Reais", prizeValue: 10.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/Notas/10%20REAIS.png?updatedAt=1752047821681", aiHint: "money" },
    { winnerName: "Lorenzo U.", prizeName: "3 Reais", prizeValue: 3.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/Notas/3%20REAIS.png?updatedAt=1752047821897", aiHint: "money" },
    { winnerName: "Laura S.", prizeName: "Volkswagen Nivus", prizeValue: 120000.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/banner/01K0BEAQVG9N3GAAJDCKAY5ECP.png", aiHint: "car" },
    { winnerName: "Mateus A.", prizeName: "Nissan Kicks", prizeValue: 115000.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/banner/01K0BEBYS7BN26DVZ0SHQJV8TT.png", aiHint: "car" },
    { winnerName: "Nícolas B.", prizeName: "Air Force 1 Low Retro", prizeValue: 1200.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/banner/01K0BE42XDSF6D848QM4WE2PT0.png", aiHint: "sneakers" },
    { winnerName: "Otávio C.", prizeName: "Rolex Explorer II", prizeValue: 84800.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/banner/01K0BENF3QK662JJA27E96K63Q.png", aiHint: "watch" },
    { winnerName: "Pedro D.", prizeName: "Datejust 41", prizeValue: 75400.00, imageUrl: "https://ik.imagekit.io/azx3nlpdu/banner/01K0BEQH30DBZPFNJNQP2W7V5D.png", aiHint: "watch" }
];

const prizesCentavoDaSorte: PrizeType[] = [
  { name: '1.000 Reais', value: 1000.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/1K.png?updatedAt=1752865094958' },
  { name: '500 Reais', value: 500.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/500-REAIS.png?updatedAt=1752856623150' },
  { name: '100 Reais', value: 100.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/100%20REAIS.png?updatedAt=1752047821876' },
  { name: '50 Reais', value: 50.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/50%20REAIS.png?updatedAt=1752047821745' },
  { name: '20 Reais', value: 20.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/20%20REAIS.png?updatedAt=1752047821716' },
  { name: '10 Reais', value: 10.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/10%20REAIS.png?updatedAt=1752047821681' },
  { name: '5 Reais', value: 5.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/5%20REAIS.png?updatedAt=1752047821734' },
  { name: '2 Reais', value: 2.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/2%20REAIS.png?updatedAt=1752047821644' },
  { name: '1 Real', value: 1.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/1%20REAL.png?updatedAt=1752047821586' },
  { name: '50 Centavos', value: 0.50, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/50-CENTAVOS-2.png?updatedAt=1752864509979' },
];

const prizesSorteInstantanea: PrizeType[] = [
  { name: 'Caixa de som JBL', value: 2500.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/variant_jbl_boombox_3_black.png?updatedAt=1751634894498' },
  { name: 'iPhone 12', value: 2500.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/variant_iphone_15_pro_max_256_gb_nio_preto.png?updatedAt=1751634894448' },
  { name: '1.000 Reais', value: 1000.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/1K.png?updatedAt=1752865094958' },
  { name: 'Smartphone Motorola', value: 800.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/variant_edge_40_neo_256_gb_black_beauty.png?updatedAt=1751634892779' },
  { name: '700 Reais', value: 700.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/700.png?updatedAt=1752856623225' },
  { name: 'Bola de futebol', value: 500.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/item_ft_5_branca_e_preta.png?updatedAt=1751634891004' },
  { name: 'Perfume 212 VIP', value: 399.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/banner/01K0F814MXBZWCF3YV4MCMJGY4.png' },
  { name: 'Camisa de time', value: 350.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/item_camisa_do_seu_time.png?updatedAt=1751634896240' },
  { name: 'Fone de ouvido', value: 220.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/item_fone_de_ouvido_bluetooth.png?updatedAt=1751634890865' },
  { name: '200 Reais', value: 200.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/200%20REAIS.png?updatedAt=1752047821639' },
  { name: 'Copo Stanley', value: 165.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/item_copo_t_rmico_stanley_preto.png?updatedAt=1751634897660' },
  { name: '100 Reais', value: 100.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/100%20REAIS.png?updatedAt=1752047821876' },
  { name: 'PowerBank', value: 60.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/banner/01K0F5KTMSEJBQF1STFZ4BCKXM.png' },
  { name: '50 Reais', value: 50.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/50%20REAIS.png?updatedAt=1752047821745' },
  { name: 'Chinelo Havaianas', value: 35.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/item_chinelo_havaianas_top_branco.png?updatedAt=1751634896291' },
  { name: '10 Reais', value: 10.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/10%20REAIS.png?updatedAt=1752047821681' },
  { name: '5 Reais', value: 5.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/5%20REAIS.png?updatedAt=1752047821734' },
  { name: '3 Reais', value: 3.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/3%20REAIS.png?updatedAt=1752047821897' },
  { name: '2 Reais', value: 2.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/2%20REAIS.png?updatedAt=1752047821644' },
  { name: '1 Real', value: 1.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/1-real-coin.png?updatedAt=1753862142426' },
  { name: '50 Centavos', value: 0.50, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/50-cent-coin.png?updatedAt=1753862142410' },
];

const allPrizes: PrizeType[] = [
  { name: '1.000 Reais', value: 1000.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/1K.png?updatedAt=1752865094958' },
  { name: '700 Reais', value: 700.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/700.png?updatedAt=1752856623225' },
  { name: '500 Reais', value: 500.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/500-REAIS.png?updatedAt=1752856623150' },
  { name: '200 Reais', value: 200.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/200-REAIS.png?updatedAt=1752865094953' },
  { name: 'Smartwatch D20 Shock', value: 80.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/item_smartwatch_d20_shock.png?updatedAt=1751634892443' },
  { name: '100 Reais', value: 100.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/100%20REAIS.png?updatedAt=1752047821876' },
  { name: 'PowerBank', value: 70.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/banner/01K0F5KTMSEJBQF1STFZ4BCKXM.png' },
  { name: '50 Reais', value: 50.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/50%20REAIS.png?updatedAt=1752047821745' },
  { name: '20 Reais', value: 20.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/20%20REAIS.png?updatedAt=1752047821716' },
  { name: '15 Reais', value: 15.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/15%20REAIS.png?updatedAt=1752047821835' },
  { name: '10 Reais', value: 10.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/10%20REAIS.png?updatedAt=1752047821681' },
  { name: '5 Reais', value: 5.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/5%20REAIS.png?updatedAt=1752047821734' },
  { name: '4 Reais', value: 4.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/4%20REAIS.png?updatedAt=1752047821875' },
  { name: '3 Reais', value: 3.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/3%20REAIS.png?updatedAt=1752047821897' },
  { name: '2 Reais', value: 2.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/2%20REAIS.png?updatedAt=1752047821644' },
  { name: '1 Real', value: 1.00, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/Notas/1%20REAL.png?updatedAt=1752047821586' },
  { name: '50 Centavos', value: 0.50, imageUrl: 'https://ik.imagekit.io/azx3nlpdu/50-CENTAVOS-2.png?updatedAt=1752864509979' },
];


export const scratchCards: ScratchCardType[] = [
  {
    slug: "centavo-da-sorte",
    title: "Centavo da Sorte",
    description: "Uma moedinha pode valer mil no PIX. Vai ficar de fora?",
    prizeAmount: 1000.0,
    cost: 0.5,
    imageUrl: "https://ik.imagekit.io/azx3nlpdu/scratch-card/01K0FF7ZDNXFVAFJ6R79MX2ZZ5.png",
    aiHint: "lucky coin",
    prizes: prizesCentavoDaSorte,
  },
  {
    slug: "sorte-instantanea",
    title: "Sorte Instantânea",
    description: "Raspou, ganhou, sacou!",
    prizeAmount: 2500.0,
    cost: 1.0,
    imageUrl: "https://ik.imagekit.io/azx3nlpdu/scratch-card/01K0FH5P70HZV4PV88Y9KV06PA.jpg",
    aiHint: "gold rush",
    prizes: prizesSorteInstantanea,
  },
  {
    slug: "raspadinha-suprema",
    title: "Raspadinha Suprema",
    description: "Seu bilhete para prêmios de verdade.",
    prizeAmount: 5000.0,
    cost: 2.5,
    imageUrl: "https://ik.imagekit.io/azx3nlpdu/scratch-card/01K0FJA0JE70JMW0Y30HMFCP46.jpg",
    aiHint: "treasure chest",
    prizes: allPrizes, // using all prizes as a fallback
  },
  {
    slug: "raspa-relampago",
    title: "Raspa Relâmpago",
    description: "Com um lanche você pode ganhar um Playstation!",
    prizeAmount: 15000.0,
    cost: 5.0,
    imageUrl: "https://ik.imagekit.io/azx3nlpdu/scratch-card/01K0F77Z6HB3SZ5C9HEH3TQ90W.jpg",
    aiHint: "lightning bolt",
    prizes: allPrizes, // using all prizes as a fallback
  },
  {
    slug: "raspadinha-magica",
    title: "Raspadinha Mágica",
    description: "Raspadinhas online com pagamentos instantâneos no seu Pix.",
    prizeAmount: 30000.0,
    cost: 50.0,
    imageUrl: "https://ik.imagekit.io/azx3nlpdu/BIKE%20,%20MAQUINA%20-%20MOTO.png?updatedAt=1752534650346",
    aiHint: "motorcycle prize",
    prizes: allPrizes, // using all prizes as a fallback
  },
  {
    slug: "raspe-e-ganhe",
    title: "Raspe e Ganhe",
    description: "Transforme sua sorte em dinheiro de verdade com cada raspada.",
    prizeAmount: 60000.0,
    cost: 100.0,
    imageUrl: "https://ik.imagekit.io/azx3nlpdu/PREMIOS%20DIVERSOS.png?updatedAt=1752534650509",
    aiHint: "diamond prize",
    prizes: allPrizes, // using all prizes as a fallback
  },
];
