
import { Product } from '@/types/Product';

export const productData: Record<string, Product[]> = {
  'Rucksäcke': [
    { id: 'backpack-1', name: 'Alpine Explorer 30L', description: 'Robuster Tagesrucksack für alle Outdoor-Abenteuer', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop', category: 'backpack' },
    { id: 'backpack-2', name: 'Summit Pro 45L', description: 'Technischer Rucksack für mehrtägige Touren', image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=400&h=500&fit=crop', category: 'backpack' },
    { id: 'backpack-3', name: 'Urban Hiker 25L', description: 'Kompakter Stadtrucksack für den täglichen Gebrauch', image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400&h=500&fit=crop', category: 'backpack' },
  ],
  'Trinkflaschen': [
    { id: 'bottle-1', name: 'Hydro Steel 750ml', description: 'Isolierte Edelstahlflasche für Wärme und Kälte', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=500&fit=crop', category: 'bottle' },
    { id: 'bottle-2', name: 'Adventure Bottle 1L', description: 'Robuste Outdoor-Flasche mit Karabinerhaken', image: 'https://images.unsplash.com/photo-1544940244-6545dbd71280?w=400&h=500&fit=crop', category: 'bottle' },
    { id: 'bottle-3', name: 'Eco Pure 500ml', description: 'Nachhaltige Glasflasche mit Silikonschutz', image: 'https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?w=400&h=500&fit=crop', category: 'bottle' },
  ],
  'Powerbanks': [
    { id: 'powerbank-1', name: 'Solar Charge 20000mAh', description: 'Wasserdichte Powerbank mit Solarpanel', image: 'https://images.unsplash.com/photo-1616448378583-04b383733221?w=400&h=500&fit=crop', category: 'powerbank' },
    { id: 'powerbank-2', name: 'Compact Power 10000mAh', description: 'Ultraleichte Powerbank für unterwegs', image: 'https://images.unsplash.com/photo-1609592043331-8e6c96bdbc72?w=400&h=500&fit=crop', category: 'powerbank' },
    { id: 'powerbank-3', name: 'Rugged Charge 15000mAh', description: 'Stoßfeste Outdoor-Powerbank mit LED', image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=500&fit=crop', category: 'powerbank' },
  ]
};

// Reihenfolge der Kategorien für den Ablauf
export const categoryOrder: Array<keyof typeof productData> = ['Rucksäcke', 'Powerbanks', 'Trinkflaschen'];

export const categoryTitles: Record<keyof typeof productData, string> = {
  'Rucksäcke': 'Bewerte alle Rucksäcke',
  'Powerbanks': 'Bewerte alle Powerbanks', 
  'Trinkflaschen': 'Bewerte alle Trinkflaschen'
};

// Legacy exports for compatibility
export const products: Product[] = [
  ...productData['Rucksäcke'],
  ...productData['Trinkflaschen'], 
  ...productData['Powerbanks']
];

export const getProductsByCategory = (category: Product['category']): Product[] => {
  const categoryMap = {
    'backpack': 'Rucksäcke',
    'bottle': 'Trinkflaschen',
    'powerbank': 'Powerbanks'
  };
  return productData[categoryMap[category]] || [];
};
