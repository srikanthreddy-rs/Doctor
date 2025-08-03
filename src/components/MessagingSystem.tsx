
import { useState, useEffect } from 'react';
import { MessageCircle, Send, Phone, MapPin, Calendar, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'sent' | 'received' | 'system';
  content: string;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

interface MessagingSystemProps {
  doctorId: number;
  doctorName: string;
  appointmentId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MessagingSystem = ({ 
  doctorId, 
  doctorName, 
  appointmentId, 
  isOpen, 
  onClose 
}: MessagingSystemProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  // Initialize with system messages
  useEffect(() => {
    if (isOpen) {
      const systemMessages: Message[] = [
        {
          id: '1',
          type: 'system',
          content: `Connected to ${doctorName}'s office. How can we help you today?`,
          timestamp: new Date()
        }
      ];
      
      if (appointmentId) {
        systemMessages.push({
          id: '2',
          type: 'system',
          content: `Your appointment (ID: ${appointmentId}) is confirmed for today at 2:30 PM. Please arrive 15 minutes early.`,
          timestamp: new Date()
        });
      }
      
      setMessages(systemMessages);
    }
  }, [isOpen, doctorName, appointmentId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageId = Date.now().toString();
    const userMessage: Message = {
      id: messageId,
      type: 'sent',
      content: newMessage,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate automated responses
    setTimeout(() => {
      setIsTyping(false);
      const response = getAutomatedResponse(newMessage);
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'received',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);

    // Update message status
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: 'read' } : msg
      ));
    }, 2000);
  };

  const getAutomatedResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('reschedule') || lowerMessage.includes('change')) {
      return "I can help you reschedule your appointment. What date and time would work better for you? Our next available slots are tomorrow at 10:00 AM or Thursday at 2:30 PM.";
    }
    
    if (lowerMessage.includes('cancel')) {
      return "I understand you'd like to cancel your appointment. Please note our 24-hour cancellation policy. Would you like me to cancel your appointment or reschedule it instead?";
    }
    
    if (lowerMessage.includes('parking') || lowerMessage.includes('location')) {
      return "Our clinic is located at 123 Medical Drive. Free parking is available in the adjacent lot. The main entrance is wheelchair accessible.";
    }
    
    if (lowerMessage.includes('insurance') || lowerMessage.includes('payment')) {
      return "We accept most major insurance plans including Blue Cross, Aetna, and UnitedHealth. Your copay will be $30. We also accept cash, credit cards, and HSA cards.";
    }
    
    if (lowerMessage.includes('prepare') || lowerMessage.includes('bring')) {
      return "Please bring a valid ID, insurance card, and list of current medications. If this is a follow-up, bring any test results. Arrive 15 minutes early for check-in.";
    }
    
    if (lowerMessage.includes('test') || lowerMessage.includes('result')) {
      return "Test results are typically available within 24-48 hours. You'll receive a notification when they're ready. You can view them through our patient portal or we can discuss them during your next visit.";
    }
    
    return "Thank you for your message. A member of our team will get back to you shortly. For urgent medical concerns, please call our office directly at (555) 123-4567.";
  };

  const quickActions = [
    { label: "Reschedule", icon: Calendar },
    { label: "Directions", icon: MapPin },
    { label: "Call Office", icon: Phone },
    { label: "Parking Info", icon: MapPin }
  ];

  const handleQuickAction = (action: string) => {
    setNewMessage(action === "Call Office" ? "I need to speak with someone" : `Tell me about ${action.toLowerCase()}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <Card className="w-full max-w-md h-[600px] sm:h-[500px] flex flex-col">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <span>{doctorName}'s Office</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Usually responds in a few minutes</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'sent' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'sent'
                      ? 'bg-blue-600 text-white'
                      : message.type === 'system'
                      ? 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {message.status && message.type === 'sent' && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ml-2 ${
                          message.status === 'read' ? 'bg-green-100 text-green-800' :
                          message.status === 'delivered' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {message.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.label)}
                className="text-xs"
              >
                <action.icon className="h-3 w-3 mr-1" />
                {action.label}
              </Button>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
