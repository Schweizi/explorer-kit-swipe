
import { Button } from '@/components/ui/button';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="min-h-screen bg-[#f6fddd] flex items-center justify-center p-6">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 animate-card-enter">
          <h1 className="text-4xl font-inter font-bold text-[#1a1a1a] mb-4">
            Stelle das Community-Bundle zusammen!
          </h1>
          <p className="text-lg text-[#1a1a1a]/80 leading-relaxed mb-6">
            Stimme in 3 einfachen Schritten ab und erstelle das offizielle "Transa Essential Explorer Kit" gemeinsam mit der Community.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4 text-[#1a1a1a]/60 text-sm mb-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#f0d600] rounded-full mr-2"></div>
              Rucksäcke
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#00a4b7] rounded-full mr-2"></div>
              Powerbanks
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#d21827] rounded-full mr-2"></div>
              Trinkflaschen
            </div>
          </div>
          
          <Button 
            onClick={onStart}
            className="bg-[#00a4b7] hover:bg-[#00a4b7]/90 text-white font-inter font-semibold px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Jetzt abstimmen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
