import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Copy, Share2, Trophy, Coins, Image, Filter, Search, ShoppingCart, ArrowUpDown } from "lucide-react";
import { useState } from "react";

const playerStats = {
  totalSpins: 452,
  premiumSpins: 89,
  totalWinnings: "10,240 SPIN",
  referralCode: "ALEX123",
  referrals: 5,
  referralEarnings: "500 SPIN"
};

const nftCollection = [
  { id: 1, name: "Epic Dragon #1234", rarity: "Epic", image: "/placeholder.svg" },
  { id: 2, name: "Rare Sword #567", rarity: "Rare", image: "/placeholder.svg" },
  { id: 3, name: "Legendary Shield #89", rarity: "Legendary", image: "/placeholder.svg" },
  { id: 4, name: "Common Potion #9999", rarity: "Common", image: "/placeholder.svg" },
  { id: 5, name: "Mythic Crown #1", rarity: "Mythic", image: "/placeholder.svg" },
  { id: 6, name: "Rare Bow #345", rarity: "Rare", image: "/placeholder.svg" },
];

const marketplaceNFTs = [
  { id: 1, name: "SpinGame NFT #123", rarity: "Rare", price: "500 SPIN", owner: "0x34...fG", image: "/placeholder.svg", forSale: true },
  { id: 2, name: "SpinGame NFT #456", rarity: "Legendary", price: "10,000 SPIN", owner: "0x45...eF", image: "/placeholder.svg", forSale: true },
  { id: 3, name: "SpinGame NFT #789", rarity: "Rare", price: "525 SPIN", owner: "0x56...aB", image: "/placeholder.svg", forSale: true },
  { id: 4, name: "SpinGame NFT #234", rarity: "Epic", price: "2,500 SPIN", owner: "0x67...cD", image: "/placeholder.svg", forSale: true },
  { id: 5, name: "SpinGame NFT #567", rarity: "Common", price: "100 SPIN", owner: "0x78...eF", image: "/placeholder.svg", forSale: true },
  { id: 6, name: "SpinGame NFT #890", rarity: "Mythic", price: "25,000 SPIN", owner: "0x89...gH", image: "/placeholder.svg", forSale: true },
  { id: 7, name: "SpinGame NFT #345", rarity: "Rare", price: "750 SPIN", owner: "0x9A...iJ", image: "/placeholder.svg", forSale: true },
  { id: 8, name: "SpinGame NFT #678", rarity: "Epic", price: "3,200 SPIN", owner: "0xAB...kL", image: "/placeholder.svg", forSale: true },
];

const getRarityColor = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case 'common': return 'bg-gray-500';
    case 'rare': return 'bg-blue-500';
    case 'epic': return 'bg-purple-500';
    case 'legendary': return 'bg-orange-500';
    case 'mythic': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const Profile = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-low");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  
  const filters = ["All", "Common", "Rare", "Epic", "Legendary", "Mythic"];
  const sortOptions = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "recently-listed", label: "Recently Listed" },
    { value: "oldest", label: "Oldest" }
  ];

  const filteredNFTs = selectedFilter === "All" 
    ? nftCollection 
    : nftCollection.filter(nft => nft.rarity === selectedFilter);

  const filteredMarketplaceNFTs = marketplaceNFTs.filter(nft => {
    // Search filter
    if (searchQuery && !nft.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Rarity filter
    if (selectedRarities.length > 0 && !selectedRarities.includes(nft.rarity)) {
      return false;
    }
    
    // Price range filter
    const priceValue = parseInt(nft.price.replace(/[^\d]/g, ''));
    if (priceRange.min && priceValue < parseInt(priceRange.min)) {
      return false;
    }
    if (priceRange.max && priceValue > parseInt(priceRange.max)) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
    const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
    
    switch (sortBy) {
      case "price-low":
        return priceA - priceB;
      case "price-high":
        return priceB - priceA;
      case "recently-listed":
        return b.id - a.id;
      case "oldest":
        return a.id - b.id;
      default:
        return 0;
    }
  });

  const toggleRarityFilter = (rarity: string) => {
    setSelectedRarities(prev => 
      prev.includes(rarity) 
        ? prev.filter(r => r !== rarity)
        : [...prev, rarity]
    );
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(playerStats.referralCode);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Alex's Profile</h1>
            <p className="text-muted-foreground">0x12...aB</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 w-[600px] mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="collection">NFT Collection</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Player Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-gold" />
                    <span>Player Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Spins:</span>
                    <span className="font-medium">{playerStats.totalSpins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Premium Spins:</span>
                    <span className="font-medium">{playerStats.premiumSpins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Winnings:</span>
                    <span className="font-medium text-gold">{playerStats.totalWinnings}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Referral */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Share2 className="w-5 h-5 text-primary" />
                    <span>Referral Link</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Your code:</span>
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{playerStats.referralCode}</code>
                    <Button size="sm" variant="outline" onClick={copyReferralCode}>
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Referrals:</span>
                    <span className="font-medium">{playerStats.referrals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Earnings:</span>
                    <span className="font-medium text-gold">{playerStats.referralEarnings}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="collection" className="mt-6">
            {/* NFT Collection */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Image className="w-5 h-5 text-secondary" />
                    <span>MY NFT COLLECTION</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <div className="flex space-x-1">
                      {filters.map((filter) => (
                        <Button
                          key={filter}
                          size="sm"
                          variant={selectedFilter === filter ? "default" : "outline"}
                          onClick={() => setSelectedFilter(filter)}
                          className="text-xs"
                        >
                          {filter}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredNFTs.map((nft) => (
                    <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="aspect-square bg-muted flex items-center justify-center relative">
                        <Image className="w-16 h-16 text-muted-foreground" />
                        <Badge 
                          className={`absolute top-2 right-2 text-xs ${getRarityColor(nft.rarity)} text-white`}
                        >
                          {nft.rarity}
                        </Badge>
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm truncate">{nft.name}</h4>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {filteredNFTs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No NFTs found for the selected filter.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace" className="mt-6">
            <div className="flex gap-6">
              {/* Filters Sidebar */}
              <div className="w-80 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* For Sale Filter */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Status</h4>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">For Sale</span>
                      </label>
                    </div>

                    {/* Rarity Filter */}
                    <div>
                      <h4 className="font-medium text-sm mb-3">Rarity</h4>
                      <div className="space-y-2">
                        {["Common", "Rare", "Epic", "Legendary", "Mythic"].map((rarity) => (
                          <label key={rarity} className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              className="rounded"
                              checked={selectedRarities.includes(rarity)}
                              onChange={() => toggleRarityFilter(rarity)}
                            />
                            <span className="text-sm">{rarity}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <h4 className="font-medium text-sm mb-3">Price Range (SPIN)</h4>
                      <div className="space-y-2">
                        <input 
                          type="number" 
                          placeholder="Min price"
                          className="w-full px-3 py-2 border rounded-md text-sm"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange(prev => ({...prev, min: e.target.value}))}
                        />
                        <input 
                          type="number" 
                          placeholder="Max price"
                          className="w-full px-3 py-2 border rounded-md text-sm"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange(prev => ({...prev, max: e.target.value}))}
                        />
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => {/* Apply filters */}}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Marketplace Content */}
              <div className="flex-1">
                {/* Search and Sort Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1 max-w-md relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search by NFT ID..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                    <select 
                      className="px-3 py-2 border rounded-lg text-sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* NFT Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMarketplaceNFTs.map((nft) => (
                    <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                      <div className="aspect-square bg-muted flex items-center justify-center relative">
                        <Image className="w-16 h-16 text-muted-foreground" />
                        <Badge 
                          className={`absolute top-2 right-2 text-xs ${getRarityColor(nft.rarity)} text-white`}
                        >
                          {nft.rarity}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm truncate mb-1">{nft.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">Owner: {nft.owner}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary">{nft.price}</span>
                          <Button 
                            size="sm" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            Buy
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredMarketplaceNFTs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No NFTs found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;