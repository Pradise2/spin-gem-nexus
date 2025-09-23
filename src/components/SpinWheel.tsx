import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import spinWheelImage from "@/assets/spin-wheel.jpg";

const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [freeSpinsLeft, setFreeSpinsLeft] = useState(2);

  const handleSpin = (type: 'free' | 'premium') => {
    setIsSpinning(true);
    if (type === 'free' && freeSpinsLeft > 0) {
      setFreeSpinsLeft(prev => prev - 1);
    }
    
    // Simulate spin duration
    setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Jackpot Display */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gold animate-shimmer bg-gradient-to-r from-gold via-warning to-gold bg-[length:200%_100%] bg-clip-text text-transparent">
          THE LEGENDARY JACKPOT
        </h2>
        <div className="text-6xl font-bold text-gold animate-bounce-gold">
          1,530,480.25 SPIN
        </div>
      </div>

      {/* Spin Wheel */}
      <div className="relative">
        <div className={`w-80 h-80 rounded-full overflow-hidden animate-glow ${isSpinning ? 'animate-spin-slow' : ''}`}>
          <img 
            src={spinWheelImage} 
            alt="Spin Wheel" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-gold rounded-full border-2 border-gold-foreground shadow-lg"></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-6">
        <div className="text-center space-y-2">
          <Button 
            variant="outline"
            size="lg"
            className="w-48 h-12 bg-success/10 border-success text-success hover:bg-success hover:text-success-foreground disabled:opacity-50"
            disabled={freeSpinsLeft === 0 || isSpinning}
            onClick={() => handleSpin('free')}
          >
            {isSpinning ? "SPINNING..." : `SPIN FOR FREE (${freeSpinsLeft} left)`}
          </Button>
          {freeSpinsLeft === 0 && (
            <p className="text-sm text-muted-foreground">Next free in: 4h 12m</p>
          )}
        </div>

        <Button 
          variant="default"
          size="lg"
          className="w-48 h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold shadow-lg"
          disabled={isSpinning}
          onClick={() => handleSpin('premium')}
        >
          {isSpinning ? "SPINNING..." : "PREMIUM SPIN (50 SPIN)"}
        </Button>
      </div>

      {/* Tier Information */}
      <Card className="w-full max-w-4xl p-6">
        <div className="grid grid-cols-5 gap-4">
          {['TIER 1', 'TIER 2', 'TIER 3', 'TIER 4', 'TIER 5'].map((tier, index) => (
            <div key={tier} className="text-center p-3 rounded-lg bg-muted/30 border border-border">
              <div className="font-semibold text-sm text-muted-foreground">{tier}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {index === 0 && "Common Rewards"}
                {index === 1 && "Rare Rewards"}
                {index === 2 && "Epic Rewards"}
                {index === 3 && "Legendary"}
                {index === 4 && "Mythic + Jackpot"}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SpinWheel;