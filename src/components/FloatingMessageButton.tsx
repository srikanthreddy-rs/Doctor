
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MessagingSystem } from './MessagingSystem';

interface FloatingMessageButtonProps {
  doctorId: number;
  doctorName: string;
  appointmentId?: string;
}

export const FloatingMessageButton = ({ 
  doctorId, 
  doctorName, 
  appointmentId 
}: FloatingMessageButtonProps) => {
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsMessagingOpen(true)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg z-40"
        size="sm"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <MessagingSystem
        doctorId={doctorId}
        doctorName={doctorName}
        appointmentId={appointmentId}
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
      />
    </>
  );
};
