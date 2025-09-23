import Navigation from "@/components/Navigation";
import SpinWheel from "@/components/SpinWheel";
import RecentWins from "@/components/RecentWins";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Main Spin Area */}
          <div>
            <SpinWheel />
          </div>

          {/* Recent Wins Below */}
          <div className="flex justify-center">
            <RecentWins />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
