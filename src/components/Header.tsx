
import { Heart, MessageSquare, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-pink-200 dark:border-gray-700">
      <div className="flex items-center justify-between p-4 max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <MessageSquare className="w-8 h-8 text-pink-400" />
            <Heart className="w-4 h-4 text-red-500 absolute top-1 left-1" />
          </div>
          <h1 className="text-2xl font-bold zolo-gradient bg-clip-text text-transparent">
            Zolo
          </h1>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">3</span>
          </div>
        </Button>
      </div>
    </header>
  );
};

export default Header;
