export type Project = {
  id: string;
  code: string;
  client: string;
  title: string;
  category: string;
  description: string;
  image: string;
  stats: { year: string; role: string };
};

export const projects: Project[] = [
  {
    id: '01',
    code: 'PRJ_NKORA',
    client: 'NKORA COFFEE',
    title: 'NKORA',
    category: 'Brand Identity',
    description:
      "Rebranding Tokyo's premier artisanal roastery. Defined a visual language that balances organic warmth with industrial minimalism.",
    image:
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop',
    stats: { year: '2024', role: 'Lead Design' },
  },
  {
    id: '02',
    code: 'PRJ_AERO',
    client: 'AERO SPACE',
    title: 'AERO',
    category: 'WebGL Experience',
    description:
      'Real-time orbital visualization interface. High-performance 3D rendering optimized for educational exploration of low-earth orbit.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    stats: { year: '2023', role: 'Creative Dev' },
  },
  {
    id: '03',
    code: 'PRJ_SYNTH',
    client: 'SYNTH FINANCE',
    title: 'SYNTH',
    category: 'Fintech UI',
    description:
      'High-frequency trading dashboard. Zero-latency data visualization system designed for institutional traders.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    stats: { year: '2024', role: 'Product Design' },
  },
  {
    id: '04',
    code: 'PRJ_TOKYO',
    client: 'NEO TOKYO',
    title: 'TOKYO',
    category: 'Art Direction',
    description:
      "Curated digital anthology of underground cyber-culture. A mixed-media exploration of the city's nocturnal rhythm.",
    image:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1994&auto=format&fit=crop',
    stats: { year: '2023', role: 'Art Director' },
  },
];

