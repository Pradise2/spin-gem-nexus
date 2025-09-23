import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Coins, Image } from "lucide-react";

const recentWins = [
  { player: "Alex", amount: "10,000 SPIN", type: "tokens", time: "2m ago" },
  { player: "Jane", amount: "Rare NFT", type: "nft", time: "5m ago" },
  { player: "0x89...42", amount: "1,250 SPIN", type: "tokens", time: "8m ago" },
  { player: "Mike", amount: "Epic NFT", type: "nft", time: "12m ago" },
  { player: "Sarah", amount: "500 SPIN", type: "tokens", time: "15m ago" },
];

const RecentWins = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Trophy className="w-5 h-5 text-gold" />
          <span>Recent Wins</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentWins.map((win, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
            <div className="flex items-center space-x-3">
              {win.type === "tokens" ? (
                <Coins className="w-4 h-4 text-gold" />
              ) : (
                <Image className="w-4 h-4 text-secondary" />
              )}
              <div>
                <div className="font-medium text-sm">{win.player}</div>
                <div className="text-xs text-muted-foreground">{win.time}</div>
              </div>
            </div>
            <div className={`text-sm font-medium ${
              win.type === "tokens" ? "text-gold" : "text-secondary"
            }`}>
              {win.amount}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentWins;