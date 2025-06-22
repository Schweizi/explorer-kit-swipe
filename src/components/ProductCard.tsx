
import { Product } from '@/types/Product';
import { Heart, X } from 'lucide-react';
import { useState, useRef } from 'react';

interface ProductCardProps {
  product: Product;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isDragging?: boolean;
  dragOffset?: number;
}

const ProductCard = ({ product, onSwipeLeft, onSwipeRight, isDragging = false, dragOffset = 0 }: ProductCardProps) => {
  const [animationClass, setAnimationClass] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (direction: 'left' | 'right') => {
    setAnimationClass(direction === 'left' ? 'animate-swipe-out-left' : 'animate-swipe-out-right');
    
    setTimeout(() => {
      if (direction === 'left') {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
      setAnimationClass('');
    }, 500);
  };

  const rotation = Math.min(Math.max(dragOffset * 0.1, -15), 15);
  const opacity = isDragging ? Math.max(1 - Math.abs(dragOffset) * 0.002, 0.3) : 1;

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div 
        ref={cardRef}
        className={`bg-transa-cream rounded-3xl shadow-xl overflow-hidden transition-all duration-200 ${animationClass} ${isDragging ? '' : 'hover:shadow-2xl'}`}
        style={{
          transform: isDragging ? `translateX(${dragOffset}px) rotate(${rotation}deg)` : 'translateX(0) rotate(0deg)',
          opacity: opacity
        }}
      >
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-inter font-semibold text-transa-dark mb-2">
            {product.name}
          </h3>
          <p className="text-transa-dark/70 font-inter leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center space-x-6 mt-6">
        <button
          onClick={() => handleButtonClick('left')}
          className="bg-transa-red hover:bg-transa-red/90 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          disabled={isDragging}
        >
          <X size={24} />
        </button>
        
        <button
          onClick={() => handleButtonClick('right')}
          className="bg-transa-turquoise hover:bg-transa-turquoise/90 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          disabled={isDragging}
        >
          <Heart size={24} />
        </button>
      </div>

      {/* Drag indicators */}
      {isDragging && (
        <>
          <div 
            className={`absolute top-1/2 left-4 transform -translate-y-1/2 text-transa-red font-bold text-2xl transition-opacity duration-200 ${dragOffset < -50 ? 'opacity-100' : 'opacity-30'}`}
          >
            NEIN
          </div>
          <div 
            className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-transa-turquoise font-bold text-2xl transition-opacity duration-200 ${dragOffset > 50 ? 'opacity-100' : 'opacity-30'}`}
          >
            JA
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
