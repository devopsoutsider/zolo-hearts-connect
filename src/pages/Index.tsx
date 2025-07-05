
import { useState } from 'react';
import { Heart, MessageCircle, Users, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import SwipeCard from '@/components/SwipeCard';
import MatchModal from '@/components/MatchModal';
import ChatPanel from '@/components/ChatPanel';
import ProfilePanel from '@/components/ProfilePanel';

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Emma",
    age: 26,
    location: "New York",
    bio: "Love hiking, coffee, and good conversations ☕️🏔️",
    images: ["https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400"],
    interests: ["Hiking", "Coffee", "Travel", "Photography"],
    verified: true
  },
  {
    id: 2,
    name: "Alex",
    age: 28,
    location: "San Francisco",
    bio: "Photographer & adventure seeker 📸✨",
    images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400"],
    interests: ["Photography", "Travel", "Music", "Art"],
    verified: false
  },
  {
    id: 3,
    name: "Maya",
    age: 24,
    location: "Los Angeles",
    bio: "Yoga instructor spreading good vibes 🧘‍♀️💕",
    images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400"],
    interests: ["Yoga", "Wellness", "Cooking", "Dancing"],
    verified: true
  }
];

const Index = () => {
  const [currentView, setCurrentView] = useState<'discover' | 'matches' | 'chat' | 'profile'>('discover');
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // It's a match! (simplified logic)
      const matchedUser = mockUsers[currentUserIndex];
      setMatches(prev => [...prev, matchedUser]);
      setShowMatchModal(true);
    }
    
    // Move to next user
    if (currentUserIndex < mockUsers.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
    } else {
      setCurrentUserIndex(0); // Loop back to start for demo
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'discover':
        return (
          <div className="flex-1 relative p-4">
            <div className="max-w-sm mx-auto">
              {mockUsers.length > 0 && (
                <SwipeCard
                  user={mockUsers[currentUserIndex]}
                  onSwipe={handleSwipe}
                />
              )}
            </div>
          </div>
        );
      case 'matches':
        return (
          <div className="flex-1 p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Your Matches</h2>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="glass-card rounded-xl p-3 text-center cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setCurrentView('chat')}
                >
                  <img
                    src={match.images[0]}
                    alt={match.name}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <p className="font-semibold text-sm">{match.name}</p>
                </div>
              ))}
              {matches.length === 0 && (
                <div className="col-span-2 text-center text-muted-foreground">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No matches yet. Keep swiping!</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'chat':
        return <ChatPanel onBack={() => setCurrentView('matches')} />;
      case 'profile':
        return <ProfilePanel />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-red-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <Header />
      
      {renderContent()}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-pink-200 dark:border-gray-700 p-4">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Button
            variant={currentView === 'discover' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('discover')}
            className="flex flex-col items-center gap-1 p-3 zolo-gradient text-white"
          >
            <Zap className="w-5 h-5" />
            <span className="text-xs">Discover</span>
          </Button>
          
          <Button
            variant={currentView === 'matches' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('matches')}
            className="flex flex-col items-center gap-1 p-3"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Matches</span>
          </Button>
          
          <Button
            variant={currentView === 'chat' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('chat')}
            className="flex flex-col items-center gap-1 p-3"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">Chat</span>
          </Button>
          
          <Button
            variant={currentView === 'profile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('profile')}
            className="flex flex-col items-center gap-1 p-3"
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>

      <MatchModal
        isOpen={showMatchModal}
        onClose={() => setShowMatchModal(false)}
        matchedUser={matches[matches.length - 1]}
        onStartChat={() => {
          setShowMatchModal(false);
          setCurrentView('chat');
        }}
      />
    </div>
  );
};

export default Index;
