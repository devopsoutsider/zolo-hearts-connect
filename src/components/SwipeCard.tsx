
import { useState, useRef } from 'react';
import { Heart, X, MapPin, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface User {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  images: string[];
  interests: string[];
  verified: boolean;
}

interface SwipeCardProps {
  user: User;
  onSwipe: (direction: 'left' | 'right') => void;
}

const SwipeCard = ({ user, onSwipe }: SwipeCardProps) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setDragOffset({ x: deltaX, y: deltaY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // Determine swipe direction
      if (Math.abs(dragOffset.x) > 100) {
        if (dragOffset.x > 0) {
          onSwipe('right');
        } else {
          onSwipe('left');
        }
      }
      
      setDragOffset({ x: 0, y: 0 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getCardStyle = () => {
    const rotation = dragOffset.x * 0.1;
    const opacity = Math.max(0.7, 1 - Math.abs(dragOffset.x) / 300);
    
    return {
      transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
      opacity,
      transition: isDragging ? 'none' : 'all 0.3s ease-out',
    };
  };

  const handleAction = (action: 'like' | 'pass') => {
    onSwipe(action === 'like' ? 'right' : 'left');
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div
        ref={cardRef}
        className="glass-card rounded-2xl overflow-hidden shadow-xl cursor-grab active:cursor-grabbing"
        style={getCardStyle()}
        onMouseDown={handleMouseDown}
      >
        {/* Image Section */}
        <div className="relative">
          <img
            src={user.images[currentImageIndex]}
            alt={user.name}
            className="w-full h-96 object-cover"
          />
          
          {/* Image Indicators */}
          {user.images.length > 1 && (
            <div className="absolute top-4 left-4 right-4 flex gap-1">
              {user.images.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Swipe Indicators */}
          {dragOffset.x > 50 && (
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
              <div className="bg-green-500 text-white p-4 rounded-full">
                <Heart className="w-8 h-8" />
              </div>
            </div>
          )}
          
          {dragOffset.x < -50 && (
            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
              <div className="bg-red-500 text-white p-4 rounded-full">
                <X className="w-8 h-8" />
              </div>
            </div>
          )}

          {/* Quick Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold">{user.name}, {user.age}</h3>
              {user.verified && (
                <Shield className="w-5 h-5 text-blue-400" />
              )}
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-4 space-y-3">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {user.bio}
          </p>
          
          {/* Interests */}
          <div className="flex flex-wrap gap-2">
            {user.interests.slice(0, 4).map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="text-xs bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleAction('pass')}
          className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <X className="w-6 h-6 text-gray-500 hover:text-red-500" />
        </Button>
        
        <Button
          size="lg"
          onClick={() => handleAction('like')}
          className="w-16 h-16 rounded-full zolo-gradient text-white hover:scale-110 transition-transform"
        >
          <Heart className="w-6 h-6" />
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="w-16 h-16 rounded-full border-2 border-purple-300 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        >
          <Star className="w-6 h-6 text-purple-500" />
        </Button>
      </div>
    </div>
  );
};

export default SwipeCard;
