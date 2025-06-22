
import { Product } from '@/types/Product';
import { categoryTitles } from '@/data/products';
import ProductCard from './ProductCard';

interface SwipeScreenProps {
  product: Product;
  onVote: (product: Product, voteType: 'yes' | 'no') => void;
  currentStep: number;
  totalSteps: number;
  currentProductIndex: number;
  totalProductsInCategory: number;
}

const SwipeScreen = ({ 
  product, 
  onVote, 
  currentStep, 
  totalSteps,
  currentProductIndex,
  totalProductsInCategory 
}: SwipeScreenProps) => {

  const handleSwipeLeft = () => {
    console.log('Swipe Left - Vote No for:', product.name);
    onVote(product, 'no');
  };

  const handleSwipeRight = () => {
    console.log('Swipe Right - Vote Yes for:', product.name);
    onVote(product, 'yes');
  };

  return (
    <div className="min-h-screen bg-transa-dark flex flex-col p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-transa-cream/60 font-inter text-sm mb-2">
          Schritt {currentStep}/3
        </div>
        <h2 className="text-2xl font-inter font-semibold text-transa-cream mb-2">
          {categoryTitles[product.category]}
        </h2>
        <div className="text-transa-cream/60 font-inter text-sm mb-6">
          Produkt {currentProductIndex + 1} von {totalProductsInCategory}
        </div>
        
        {/* Progress bar */}
        <div className="w-full max-w-xs mx-auto bg-transa-dark border border-transa-cream/20 rounded-full h-2">
          <div 
            className="bg-transa-yellow h-full rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Product card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <ProductCard
            key={product.id}
            product={product}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            isDragging={false}
            dragOffset={0}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-transa-cream/60 font-inter text-sm">
        Wische oder tippe die Buttons für deine Bewertung
      </div>
    </div>
  );
};

export default SwipeScreen;
