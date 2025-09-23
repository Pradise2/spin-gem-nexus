import Navigation from "@/components/Navigation";
import SpinWheel from "@/components/SpinWheel";
import RecentWins from "@/components/RecentWins";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Recent Wins Sidebar */}
          <div className="lg:col-span-1">
            <RecentWins />
          </div>

          {/* Main Spin Area */}
          <div className="lg:col-span-3">
            <SpinWheel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
