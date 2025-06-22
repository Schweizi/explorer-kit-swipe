
import { Selection } from '@/types/Product';
import { Button } from '@/components/ui/button';
import ContactForm from './ContactForm';
import { useState } from 'react';

interface ResultScreenProps {
  selection: Selection;
  onRestart: () => void;
}

const ResultScreen = ({ selection, onRestart }: ResultScreenProps) => {
  const [showContactForm, setShowContactForm] = useState(false);
  
  const selectedProducts = [
    selection.backpack,
    selection.bottle,
    selection.powerbank
  ].filter(Boolean);

  const selectedProductsForForm = selectedProducts.map(product => ({
    name: product?.name || '',
    category: product?.category || ''
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
            Dein persönliches
          </h1>
          <h2 className="text-4xl font-inter font-bold text-transa-yellow mb-6">
            Essential Explorer Kit
          </h2>
        </div>

        {/* Selected products */}
        <div className="space-y-6 mb-8">
          {selectedProducts.map((product, index) => (
            <div key={product?.id} className="bg-transa-cream rounded-2xl p-4 shadow-lg animate-card-enter" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center space-x-4">
                <img 
                  src={product?.image} 
                  alt={product?.name}
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div className="flex-1 text-left">
                  <h3 className="font-inter font-semibold text-transa-dark">
                    {product?.name}
                  </h3>
                  <p className="text-sm text-transa-dark/70 font-inter">
                    {product?.description}
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
            Nochmal wählen
          </Button>
        </div>

        <div className="mt-8 text-transa-cream/60 font-inter text-sm">
          Perfekt für dein nächstes Abenteuer zusammengestellt!
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
