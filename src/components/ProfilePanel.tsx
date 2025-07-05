
import { useState } from 'react';
import { Camera, Edit, Settings, Shield, MapPin, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const ProfilePanel = () => {
  const [darkMode, setDarkMode] = useState(false);

  const userProfile = {
    name: "You",
    age: 25,
    location: "Your City",
    bio: "Adventure seeker, coffee lover, and always up for good conversations! ✨",
    images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400"],
    interests: ["Travel", "Photography", "Coffee", "Hiking", "Music", "Art"],
    verified: true,
    stats: {
      likes: 47,
      matches: 12,
      chats: 8
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 max-w-md mx-auto">
      {/* Profile Header */}
      <Card className="glass-card border-none mb-6">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <img
                src={userProfile.images[0]}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-pink-300"
              />
              <Button
                size="sm"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full zolo-gradient text-white p-0"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">{userProfile.name}, {userProfile.age}</h2>
              {userProfile.verified && (
                <Shield className="w-5 h-5 text-blue-500" />
              )}
            </div>
            
            <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-300 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{userProfile.location}</span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {userProfile.bio}
            </p>

            <Button variant="outline" className="w-full mb-4">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="glass-card border-none text-center">
          <CardContent className="p-4">
            <Heart className="w-6 h-6 mx-auto mb-2 text-pink-500" />
            <p className="text-2xl font-bold">{userProfile.stats.likes}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Likes</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-none text-center">
          <CardContent className="p-4">
            <Star className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">{userProfile.stats.matches}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Matches</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-none text-center">
          <CardContent className="p-4">
            <Settings className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{userProfile.stats.chats}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Chats</p>
          </CardContent>
        </Card>
      </div>

      {/* Interests */}
      <Card className="glass-card border-none mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Interests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {userProfile.interests.map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="glass-card border-none mb-20">
        <CardHeader>
          <CardTitle className="text-lg">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Push Notifications</span>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Show Online Status</span>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Discovery</span>
            <Switch defaultChecked />
          </div>

          <hr className="my-4" />
          
          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePanel;
