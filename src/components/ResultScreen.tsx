
import { VoteData, Product } from '@/types/Product';
import { Button } from '@/components/ui/button';
import ContactForm from './ContactForm';
import { useState } from 'react';
import { products, categoryOrder, getProductsByCategory } from '@/data/products';

interface ResultScreenProps {
  votes: VoteData;
  onRestart: () => void;
}

const ResultScreen = ({ votes, onRestart }: ResultScreenProps) => {
  const [showContactForm, setShowContactForm] = useState(false);
  
  // Ermittele die Gewinner-Produkte für jede Kategorie
  const getWinningProducts = (): Product[] => {
    return categoryOrder.map(category => {
      const categoryProducts = getProductsByCategory(category);
      let winner = categoryProducts[0]; // Standard-Gewinner falls keine Votes
      let maxVotes = 0;

      categoryProducts.forEach(product => {
        const productVotes = votes[product.id] || 0;
        if (productVotes > maxVotes) {
          maxVotes = productVotes;
          winner = product;
        }
      });

      console.log(`Winner for ${category}: ${winner.name} with ${votes[winner.id] || 0} votes`);
      return winner;
    });
  };

  const winningProducts = getWinningProducts();
  const selectedProductsForForm = winningProducts.map(product => ({
    name: product.name,
    category: product.category
  }));

  if (showContactForm) {
    return (
      <div className="min-h-screen bg-transa-dark flex flex-col items-center justify-center p-6">
        <div className="max-w-md mx-auto">
          <ContactForm selectedProducts={selectedProductsForForm} />
          
          <Button 
            onClick={() => setShowContactForm(false)}
            variant="outline"
            className="w-full border-transa-cream text-transa-cream hover:bg-transa-cream hover:text-transa-dark font-inter font-medium py-4 rounded-2xl transition-all duration-200 mt-4"
          >
            Zurück zur Übersicht
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transa-dark flex flex-col items-center justify-center p-6">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8 animate-card-enter">
          <h1 className="text-3xl font-inter font-bold text-transa-cream mb-4">
            Das Community
          </h1>
          <h2 className="text-4xl font-inter font-bold text-transa-yellow mb-6">
            Essential Explorer Kit
          </h2>
          <p className="text-transa-cream/80 font-inter text-sm mb-4">
            Basierend auf allen Community-Stimmen - die beliebtesten Produkte jeder Kategorie
          </p>
        </div>

        {/* Winning products */}
        <div className="space-y-6 mb-8">
          {winningProducts.map((product, index) => (
            <div key={product.id} className="bg-transa-cream rounded-2xl p-4 shadow-lg animate-card-enter" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center space-x-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div className="flex-1 text-left">
                  <h3 className="font-inter font-semibold text-transa-dark">
                    {product.name}
                  </h3>
                  <p className="text-sm text-transa-dark/70 font-inter">
                    {product.description}
                  </p>
                  <p className="text-xs text-transa-turquoise font-inter font-medium">
                    {votes[product.id] || 0} Community-Stimmen
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <Button 
            onClick={() => setShowContactForm(true)}
            className="w-full bg-transa-turquoise hover:bg-transa-turquoise/90 text-white font-inter font-semibold py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Interesse bekunden
          </Button>
          
          <Button 
            onClick={onRestart}
            variant="outline"
            className="w-full border-transa-cream text-transa-cream hover:bg-transa-cream hover:text-transa-dark font-inter font-medium py-4 rounded-2xl transition-all duration-200"
          >
            Nochmal abstimmen
          </Button>
        </div>

        <div className="mt-8 text-transa-cream/60 font-inter text-sm">
          Das perfekte Bundle - gewählt von der Community!
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
