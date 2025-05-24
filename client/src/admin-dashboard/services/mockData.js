export const mockStats = {
  counts: {
    users: 1247,
    products: 89,
    newMessages: 23,
    orders: 156
  },
  recentMessages: [
    {
      id: 1,
      name: 'Ahmed Ben Salem',
      email: 'ahmed@example.com',
      subject: 'Demande d\'information',
      message: 'Bonjour, je souhaiterais avoir plus d\'informations...',
      createdAt: '2024-01-20T10:30:00Z',
      status: 'non-lu'
    },
    {
      id: 2,
      name: 'Fatima Gharbi',
      email: 'fatima@example.com',
      subject: 'Problème technique',
      message: 'J\'ai rencontré un problème lors de l\'utilisation...',
      createdAt: '2024-01-19T15:45:00Z',
      status: 'lu'
    },
    {
      id: 3,
      name: 'Mohamed Trabelsi',
      email: 'mohamed@example.com',
      subject: 'Suggestion',
      message: 'Je vous propose une amélioration...',
      createdAt: '2024-01-18T09:20:00Z',
      status: 'repondu'
    }
  ],
  chartData: {
    users: [
      { name: 'Jan', value: 1200 },
      { name: 'Fév', value: 1190 },
      { name: 'Mar', value: 1220 },
      { name: 'Avr', value: 1247 }
    ],
    messages: [
      { name: 'Jan', value: 45 },
      { name: 'Fév', value: 38 },
      { name: 'Mar', value: 52 },
      { name: 'Avr', value: 23 }
    ]
  }
};

export const mockUsers = [
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-15T08:00:00Z',
    lastLogin: '2024-01-20T14:30:00Z'
  },
  {
    id: 2,
    name: 'Marie Martin',
    email: 'marie.martin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-10T10:15:00Z',
    lastLogin: '2024-01-20T16:45:00Z'
  },
  {
    id: 3,
    name: 'Pierre Durant',
    email: 'pierre.durant@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-01-12T12:30:00Z',
    lastLogin: '2024-01-18T11:20:00Z'
  }
];

export const mockProducts = [
  {
    id: 1,
    name: 'Ordinateur portable HP ProBook',
    category: 'Informatique',
    price: 1200,
    stock: 15,
    status: 'disponible',
    description: 'Ordinateur portable professionnel haute performance',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-20T10:30:00Z'
  },
  {
    id: 2,
    name: 'Imprimante Canon PIXMA',
    category: 'Informatique',
    price: 250,
    stock: 8,
    status: 'disponible',
    description: 'Imprimante multifonction couleur WiFi',
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-19T16:15:00Z'
  },
  {
    id: 3,
    name: 'Bureau ergonomique',
    category: 'Mobilier',
    price: 450,
    stock: 0,
    status: 'rupture',
    description: 'Bureau réglable en hauteur avec rangements',
    createdAt: '2024-01-08T09:45:00Z',
    updatedAt: '2024-01-20T08:30:00Z'
  }
];