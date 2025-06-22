
import { useState } from 'react';
import StartScreen from '@/components/StartScreen';
import SwipeScreen from '@/components/SwipeScreen';
import ResultScreen from '@/components/ResultScreen';
import { Product, VoteData } from '@/types/Product';
import { categoryOrder, getProductsByCategory } from '@/data/products';

type GameState = 'start' | 'voting' | 'result';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [votes, setVotes] = useState<VoteData>({});

  const handleStart = () => {
    setGameState('voting');
    setCurrentCategoryIndex(0);
    setCurrentProductIndex(0);
    setVotes({});
  };

  const handleVote = (product: Product, voteType: 'yes' | 'no') => {
    console.log(`Vote for ${product.name}: ${voteType}`);
    
    // Nur "Ja"-Stimmen werden gezählt
    if (voteType === 'yes') {
      setVotes(prevVotes => ({
        ...prevVotes,
        [product.id]: (prevVotes[product.id] || 0) + 1,
      }));
    }

    // Zur nächsten Bewertung
    const currentCategory = categoryOrder[currentCategoryIndex];
    const categoryProducts = getProductsByCategory(currentCategory);

    if (currentProductIndex < categoryProducts.length - 1) {
      // Nächstes Produkt in der gleichen Kategorie
      setCurrentProductIndex(prev => prev + 1);
    } else {
      // Letzte Produkt der Kategorie -> zur nächsten Kategorie
      if (currentCategoryIndex < categoryOrder.length - 1) {
        setCurrentCategoryIndex(prev => prev + 1);
        setCurrentProductIndex(0);
      } else {
        // Alle Kategorien durchlaufen -> Ergebnis anzeigen
        console.log('Final votes:', votes);
        setGameState('result');
      }
    }
  };

  const handleRestart = () => {
    setGameState('start');
    setCurrentCategoryIndex(0);
    setCurrentProductIndex(0);
    setVotes({});
  };

  const renderContent = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen onStart={handleStart} />;
      case 'voting':
        const currentCategory = categoryOrder[currentCategoryIndex];
        const categoryProducts = getProductsByCategory(currentCategory);
        const currentProduct = categoryProducts[currentProductIndex];
        
        return (
          <SwipeScreen
            product={currentProduct}
            onVote={handleVote}
            currentStep={currentCategoryIndex + 1}
            totalSteps={categoryOrder.length}
            currentProductIndex={currentProductIndex}
            totalProductsInCategory={categoryProducts.length}
          />
        );
      case 'result':
        return <ResultScreen votes={votes} onRestart={handleRestart} />;
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderContent()}
    </div>
  );
};

export default Index;
