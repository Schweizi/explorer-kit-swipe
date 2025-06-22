
import { Product } from '@/types/Product';

export const products: Product[] = [
  // Backpacks
  {
    id: 'backpack-1',
    name: 'Alpine Explorer 30L',
    description: 'Robuster Tagesrucksack für alle Outdoor-Abenteuer',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'backpack'
  },
  {
    id: 'backpack-2', 
    name: 'Summit Pro 45L',
    description: 'Technischer Rucksack für mehrtägige Touren',
    image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=400&h=400&fit=crop',
    category: 'backpack'
  },
  {
    id: 'backpack-3',
    name: 'Urban Hiker 25L',
    description: 'Kompakter Stadtrucksack für den täglichen Gebrauch',
    image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400&h=400&fit=crop',
    category: 'backpack'
  },
  
  // Bottles
  {
    id: 'bottle-1',
    name: 'Hydro Steel 750ml',
    description: 'Isolierte Edelstahlflasche für warme und kalte Getränke',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    category: 'bottle'
  },
  {
    id: 'bottle-2',
    name: 'Adventure Bottle 1L',
    description: 'Robuste Outdoor-Flasche mit Karabinerhaken',
    image: 'https://images.unsplash.com/photo-1544940244-6545dbd71280?w=400&h=400&fit=crop',
    category: 'bottle'
  },
  {
    id: 'bottle-3',
    name: 'Eco Pure 500ml',
    description: 'Nachhaltige Glasflasche mit Silikonschutz',
    image: 'https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?w=400&h=400&fit=crop',
    category: 'bottle'
  },

  // Powerbanks  
  {
    id: 'powerbank-1',
    name: 'Solar Charge 20000mAh',
    description: 'Wasserdichte Powerbank mit Solarpanel',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
    category: 'powerbank'
  },
  {
    id: 'powerbank-2',
    name: 'Compact Power 10000mAh',
    description: 'Ultraleichte Powerbank für unterwegs',
    image: 'https://images.unsplash.com/photo-1609592043331-8e6c96bdbc72?w=400&h=400&fit=crop',
    category: 'powerbank'
  },
  {
    id: 'powerbank-3',
    name: 'Rugged Charge 15000mAh',
    description: 'Stoßfeste Outdoor-Powerbank mit LED-Taschenlampe',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
    category: 'powerbank'
  }
];

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(product => product.category === category);
};

export const categoryOrder: Product['category'][] = ['backpack', 'powerbank', 'bottle'];

export const categoryTitles: Record<Product['category'], string> = {
  'backpack': 'Bewerte alle Rucksäcke',
  'powerbank': 'Bewerte alle Powerbanks', 
  'bottle': 'Bewerte alle Trinkflaschen'
};
