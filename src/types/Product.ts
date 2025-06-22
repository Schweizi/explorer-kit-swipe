
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'backpack' | 'bottle' | 'powerbank';
}

export interface Selection {
  backpack?: Product;
  bottle?: Product;  
  powerbank?: Product;
}

export interface VoteData {
  [productId: string]: number;
}
