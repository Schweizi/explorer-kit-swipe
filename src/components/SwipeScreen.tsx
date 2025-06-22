
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
  const cardRef = useRef<HTMLDivElement>(null);

  const currentProduct = products[currentProductIndex];

  const handleSwipeLeft = () => {
    console.log('Swipe Left - Next product');
    if (currentProductIndex < products.length - 1) {
      setCurrentProductIndex(prev => prev + 1);
    } else {
      setCurrentProductIndex(0);
    }
  };

  const handleSwipeRight = () => {
    console.log('Swipe Right - Product selected:', currentProduct.name);
    onProductSelected(currentProduct);
  };

  // Drag handlers
  const handleStart = (clientX: number) => {
    console.log('Drag started at:', clientX);
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
    
    console.log('Drag ended with offset:', dragOffset);
    setIsDragging(false);
    
    const threshold = 80; // Reduzierter Threshold für bessere Responsivität
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
    e.stopPropagation();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleEnd();
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.touches.length === 1) {
      handleStart(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleEnd();
    }
  };

  // Global event handlers für bessere Gesten-Erkennung
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleEnd();
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        e.preventDefault();
        handleMove(e.touches[0].clientX);
      }
    };

    const handleGlobalTouchEnd = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleEnd();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
      document.addEventListener('mouseup', handleGlobalMouseUp, { passive: false });
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd, { passive: false });
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, startX, dragOffset]);

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
          ref={cardRef}
          className="select-none cursor-grab active:cursor-grabbing touch-none w-full max-w-sm"
          style={{ 
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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

      {/* Debug Info (nur in Development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs">
          <div>Dragging: {isDragging ? 'Yes' : 'No'}</div>
          <div>Offset: {dragOffset}</div>
          <div>Product: {currentProductIndex + 1}/{products.length}</div>
        </div>
      )}
    </div>
  );
};

export default SwipeScreen;
