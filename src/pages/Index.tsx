
import { useState } from 'react';
import { Product, Selection } from '@/types/Product';
import StartScreen from '@/components/StartScreen';
import SwipeScreen from '@/components/SwipeScreen';
import ResultScreen from '@/components/ResultScreen';

type Screen = 'start' | 'swipe' | 'result';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [currentStep, setCurrentStep] = useState(1);
  const [selection, setSelection] = useState<Selection>({});

  const handleStart = () => {
    setCurrentScreen('swipe');
    setCurrentStep(1);
    setSelection({});
  };

  const handleProductSelected = (product: Product) => {
    const newSelection = { ...selection };
    
    if (product.category === 'backpack') {
      newSelection.backpack = product;
    } else if (product.category === 'bottle') {
      newSelection.bottle = product;
    } else if (product.category === 'powerbank') {
      newSelection.powerbank = product;
    }
    
    setSelection(newSelection);

    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentScreen('result');
    }
  };

  const handleRestart = () => {
    setCurrentScreen('start');
    setCurrentStep(1);
    setSelection({});
  };

  return (
    <div className="font-inter">
      {currentScreen === 'start' && (
        <StartScreen onStart={handleStart} />
      )}
      
      {currentScreen === 'swipe' && (
        <SwipeScreen 
          step={currentStep}
          selection={selection}
          onProductSelected={handleProductSelected}
        />
      )}
      
      {currentScreen === 'result' && (
        <ResultScreen 
          selection={selection}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
