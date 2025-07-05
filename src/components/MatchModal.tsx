
import { Heart, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchedUser?: any;
  onStartChat: () => void;
}

const MatchModal = ({ isOpen, onClose, matchedUser, onStartChat }: MatchModalProps) => {
  if (!matchedUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto p-0 bg-transparent border-none shadow-none">
        <div className="glass-card rounded-3xl p-8 text-center relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 zolo-gradient opacity-10"></div>
          
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Hearts Animation */}
          <div className="relative mb-6">
            <div className="flex justify-center items-center gap-4">
              <Heart className="w-12 h-12 text-pink-500 animate-heart" />
              <Heart className="w-8 h-8 text-red-500 animate-heart delay-200" />
              <Heart className="w-12 h-12 text-purple-500 animate-heart delay-400" />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-2 zolo-gradient bg-clip-text text-transparent">
            It's a Match!
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You and {matchedUser.name} liked each other
          </p>

          {/* User Images */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="relative">
              <img
                src={matchedUser.images[0]}
                alt={matchedUser.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-pink-300"
              />
            </div>
            <Heart className="w-8 h-8 text-pink-500" />
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center border-4 border-purple-300">
                <span className="text-2xl">😊</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onStartChat}
              className="w-full zolo-gradient text-white font-semibold py-3 rounded-xl"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Chatting
            </Button>
            
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full py-3 rounded-xl"
            >
              Keep Swiping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchModal;
