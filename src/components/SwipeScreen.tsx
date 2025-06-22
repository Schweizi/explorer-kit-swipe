
import { Product, Selection } from '@/types/Product';
import { getProductsByCategory } from '@/data/products';
import ProductCard from './ProductCard';
import { useState, useEffect, useRef } from 'react';

interface SwipeScreenProps {
  step: number;
  selection: Selection;
  onProductSelected: (product: Product) => void;
}

const SwipeScreen = ({ step, selection, onProductSelected }: SwipeScreenProps) => {
  const categories = ['backpack', 'bottle', 'powerbank'] as const;
  const categoryTitles = ['Wähle deinen Rucksack', 'Wähle deine Trinkflasche', 'Wähle deine Powerbank'];
  
  const currentCategory = categories[step - 1];
  const [products] = useState(() => getProductsByCategory(currentCategory));
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);

  const currentProduct = products[currentProductIndex];

  const handleSwipeLeft = () => {
    if (currentProductIndex < products.length - 1) {
      setCurrentProductIndex(prev => prev + 1);
    } else {
      setCurrentProductIndex(0);
    }
  };

  const handleSwipeRight = () => {
    onProductSelected(currentProduct);
  };

  // Drag handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - startX;
    setDragOffset(offset);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        handleSwipeRight();
      } else {
        handleSwipeLeft();
      }
    }
    
    setDragOffset(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  // Global event handlers
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.touches[0].clientX);
      }
    };

    const handleGlobalTouchEnd = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, startX]);

  return (
    <div className="min-h-screen bg-transa-dark flex flex-col p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-transa-cream/60 font-inter text-sm mb-2">
          Schritt {step}/3
        </div>
        <h2 className="text-2xl font-inter font-semibold text-transa-cream mb-6">
          {categoryTitles[step - 1]}
        </h2>
        
        {/* Progress bar */}
        <div className="w-full max-w-xs mx-auto bg-transa-dark border border-transa-cream/20 rounded-full h-2">
          <div 
            className="bg-transa-yellow h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Product card */}
      <div className="flex-1 flex items-center justify-center">
        <div 
          className="select-none cursor-grab active:cursor-grabbing touch-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <ProductCard
            key={currentProduct.id}
            product={currentProduct}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            isDragging={isDragging}
            dragOffset={dragOffset}
          />
        </div>
      </div>

      {/* Product counter */}
      <div className="text-center text-transa-cream/60 font-inter text-sm">
        {currentProductIndex + 1} von {products.length}
      </div>
    </div>
  );
};

export default SwipeScreen;
