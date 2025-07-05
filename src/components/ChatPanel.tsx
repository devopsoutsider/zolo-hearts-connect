
import { useState } from 'react';
import { ArrowLeft, Send, Smile, Image, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatPanelProps {
  onBack: () => void;
}

const mockMessages = [
  { id: 1, text: "Hey! Thanks for the match! 😊", sender: 'other', time: '2:30 PM' },
  { id: 2, text: "Hi Emma! Love your hiking photos!", sender: 'me', time: '2:32 PM' },
  { id: 3, text: "Thank you! Do you hike often?", sender: 'other', time: '2:35 PM' },
  { id: 4, text: "Every weekend! There's this amazing trail I discovered recently 🏔️", sender: 'me', time: '2:37 PM' },
];

const ChatPanel = ({ onBack }: ChatPanelProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'me' as const,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-t-3xl overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 zolo-gradient-light">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <img
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100"
            alt="Emma"
            className="w-10 h-10 rounded-full object-cover"
          />
          
          <div>
            <h3 className="font-semibold">Emma</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Online</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-2xl ${
                msg.sender === 'me'
                  ? 'zolo-gradient text-white rounded-br-md'
                  : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === 'me' ? 'text-pink-100' : 'text-gray-500'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Image className="w-5 h-5 text-gray-500" />
          </Button>
          
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full border-gray-300 focus:border-pink-400"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          
          <Button variant="ghost" size="sm">
            <Smile className="w-5 h-5 text-gray-500" />
          </Button>
          
          <Button
            onClick={handleSendMessage}
            className="zolo-gradient text-white rounded-full p-2"
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
