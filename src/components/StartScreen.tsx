
import { Button } from '@/components/ui/button';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="min-h-screen bg-transa-dark flex items-center justify-center p-6">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 animate-card-enter">
          <h1 className="text-4xl font-inter font-bold text-transa-cream mb-4">
            Essential Explorer Kit
          </h1>
          <p className="text-lg text-transa-cream/80 leading-relaxed">
            Stelle dein persönliches Outdoor-Bundle zusammen! 
            Wähle in 3 einfachen Schritten deinen perfekten Begleiter für jedes Abenteuer.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4 text-transa-cream/60 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-transa-yellow rounded-full mr-2"></div>
              Rucksack
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-transa-turquoise rounded-full mr-2"></div>
              Trinkflasche
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-transa-red rounded-full mr-2"></div>
              Powerbank
            </div>
          </div>
          
          <Button 
            onClick={onStart}
            className="bg-transa-yellow hover:bg-transa-yellow/90 text-transa-dark font-inter font-semibold px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Jetzt starten
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
