
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
  const [isLocalDragging, setIsLocalDragging] = useState(false);
  const [localDragOffset, setLocalDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [animationClass, setAnimationClass] = useState('');

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsLocalDragging(true);
    setStartX(e.clientX);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsLocalDragging(true);
    setStartX(e.touches[0].clientX);
    document.addEventListener('touchmove', handleTouchMove as any);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isLocalDragging) return;
    const currentX = e.clientX;
    const offset = currentX - startX;
    setLocalDragOffset(offset);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isLocalDragging) return;
    const currentX = e.touches[0].clientX;
    const offset = currentX - startX;
    setLocalDragOffset(offset);
  };

  const handleMouseUp = () => {
    finishDrag();
  };

  const handleTouchEnd = () => {
    finishDrag();
  };

  const finishDrag = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleTouchMove as any);
    document.removeEventListener('touchend', handleTouchEnd);
    
    if (Math.abs(localDragOffset) > 100) {
      if (localDragOffset > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    }
    
    setIsLocalDragging(false);
    setLocalDragOffset(0);
  };

  const handleButtonClick = (direction: 'left' | 'right', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAnimationClass(direction === 'left' ? 'animate-pulse' : 'animate-pulse');
    
    if (direction === 'left') {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
    
    setTimeout(() => {
      setAnimationClass('');
    }, 200);
  };

  const currentDragOffset = isLocalDragging ? localDragOffset : dragOffset;
  const currentIsDragging = isLocalDragging || isDragging;
  const rotation = Math.min(Math.max(currentDragOffset * 0.1, -15), 15);
  const opacity = currentIsDragging ? Math.max(1 - Math.abs(currentDragOffset) * 0.002, 0.5) : 1;

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div 
        ref={cardRef}
        className={`bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-200 cursor-grab active:cursor-grabbing ${animationClass} ${currentIsDragging ? '' : 'hover:shadow-2xl'}`}
        style={{
          transform: currentIsDragging ? `translateX(${currentDragOffset}px) rotate(${rotation}deg)` : 'translateX(0) rotate(0deg)',
          opacity: opacity
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
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
          <h3 className="text-xl font-inter font-semibold text-[#1a1a1a] mb-2">
            {product.name}
          </h3>
          <p className="text-[#1a1a1a]/70 font-inter leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center space-x-6 mt-6">
        <button
          onClick={(e) => handleButtonClick('left', e)}
          className="bg-[#d21827] hover:bg-[#d21827]/90 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
          disabled={currentIsDragging}
          type="button"
        >
          <X size={24} />
        </button>
        
        <button
          onClick={(e) => handleButtonClick('right', e)}
          className="bg-[#00a4b7] hover:bg-[#00a4b7]/90 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
          disabled={currentIsDragging}
          type="button"
        >
          <Heart size={24} />
        </button>
      </div>

      {/* Drag indicators */}
      {currentIsDragging && (
        <>
          <div 
            className={`absolute top-1/2 left-4 transform -translate-y-1/2 text-[#d21827] font-bold text-2xl transition-opacity duration-200 pointer-events-none ${currentDragOffset < -50 ? 'opacity-100' : 'opacity-30'}`}
          >
            NEIN
          </div>
          <div 
            className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-[#00a4b7] font-bold text-2xl transition-opacity duration-200 pointer-events-none ${currentDragOffset > 50 ? 'opacity-100' : 'opacity-30'}`}
          >
            JA
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
