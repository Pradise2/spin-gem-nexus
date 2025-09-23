import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Crown, Gem, Star, Zap } from "lucide-react";

interface WinPopupProps {
  tier: number | null;
  prize: string;
  onClose: () => void;
}

const tierConfig = {
  1: {
    name: "TIER 1 WIN!",
    icon: Coins,
    bgColor: "bg-gradient-to-br from-gray-400 to-gray-600",
    textColor: "text-white",
    borderColor: "border-gray-400",
    glowColor: "shadow-gray-400/50"
  },
  2: {
    name: "TIER 2 WIN!",
    icon: Star,
    bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
    textColor: "text-white",
    borderColor: "border-blue-400",
    glowColor: "shadow-blue-400/50"
  },
  3: {
    name: "TIER 3 WIN!",
    icon: Gem,
    bgColor: "bg-gradient-to-br from-purple-400 to-purple-600",
    textColor: "text-white",
    borderColor: "border-purple-400",
    glowColor: "shadow-purple-400/50"
  },
  4: {
    name: "TIER 4 WIN!",
    icon: Crown,
    bgColor: "bg-gradient-to-br from-orange-400 to-orange-600",
    textColor: "text-white",
    borderColor: "border-orange-400",
    glowColor: "shadow-orange-400/50"
  },
  5: {
    name: "LEGENDARY TIER 5!",
    icon: Zap,
    bgColor: "bg-gradient-to-br from-red-400 via-pink-500 to-red-600",
    textColor: "text-white",
    borderColor: "border-red-400",
    glowColor: "shadow-red-400/50"
  }
};

const WinPopup = ({ tier, prize, onClose }: WinPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (tier) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [tier, onClose]);

  if (!tier) return null;

  const config = tierConfig[tier as keyof typeof tierConfig];
  const IconComponent = config.icon;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <Card className={`
        relative overflow-hidden border-4 ${config.borderColor} ${config.bgColor} ${config.glowColor}
        transition-all duration-300 shadow-2xl
        ${isVisible ? 'animate-scale-in' : 'animate-scale-out'}
        ${tier === 5 ? 'animate-pulse' : ''}
      `}>
        {/* Celebration particles effect for higher tiers */}
        {tier >= 4 && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-bounce delay-150"></div>
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
          </div>
        )}
        
        <div className="relative p-8 text-center space-y-4">
          <div className={`flex justify-center ${tier === 5 ? 'animate-bounce' : ''}`}>
            <IconComponent className={`w-16 h-16 ${config.textColor} drop-shadow-lg`} />
          </div>
          
          <div className="space-y-2">
            <Badge className={`text-lg font-bold px-4 py-2 ${config.bgColor} ${config.textColor} border-white/20`}>
              {config.name}
            </Badge>
            <div className={`text-3xl font-bold ${config.textColor} drop-shadow-lg`}>
              {prize}
            </div>
          </div>

          {tier === 5 && (
            <div className="text-lg font-semibold text-yellow-200 animate-pulse">
              🎉 JACKPOT WINNER! 🎉
            </div>
          )}
        </div>

        {/* Animated border effect for Tier 5 */}
        {tier === 5 && (
          <div className="absolute inset-0 rounded-lg border-4 border-transparent bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-border animate-spin-slow opacity-75"></div>
        )}
      </Card>
    </div>
  );
};

export default WinPopup;