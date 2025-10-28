import { useState } from 'react';
import { Event } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, DollarSign, Users, Clock } from 'lucide-react';
import { RegistrationForm } from './RegistrationForm';
import { useEvents } from '@/context/EventContext';

interface EventDetailsProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
}

export const EventDetails = ({ event, open, onClose }: EventDetailsProps) => {
  const [showRegistration, setShowRegistration] = useState(false);
  const { getRegistrationsByEventId } = useEvents();

  if (!event) return null;

  const registrations = getRegistrationsByEventId(event.id);
  const totalTickets = registrations.reduce((sum, reg) => sum + reg.numberOfTickets, 0);
  const spotsLeft = event.maxAttendees - totalTickets;

  const handleRegisterClick = () => {
    setShowRegistration(true);
  };

  const handleRegistrationClose = () => {
    setShowRegistration(false);
    onClose();
  };

  if (showRegistration) {
    return (
      <RegistrationForm
        event={event}
        open={open}
        onClose={handleRegistrationClose}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative h-64 overflow-hidden rounded-lg">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full object-cover"
            />
            <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
              {event.category}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{event.date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{event.time}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Ticket Price</p>
                <p className="font-medium">${event.ticketPrice}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-2 text-lg font-semibold">About This Event</h3>
            <p className="text-muted-foreground">{event.description}</p>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Availability</p>
                <p className="font-medium">
                  {spotsLeft} of {event.maxAttendees} spots remaining
                </p>
              </div>
            </div>
          </div>

          {registrations.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">Attendees</h3>
              <div className="flex -space-x-2">
                {registrations.slice(0, 5).map((reg, index) => (
                  <div
                    key={reg.id}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-accent text-white border-2 border-background font-semibold text-sm"
                    title={reg.name}
                  >
                    {reg.name.charAt(0).toUpperCase()}
                  </div>
                ))}
                {registrations.length > 5 && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground border-2 border-background text-xs font-semibold">
                    +{registrations.length - 5}
                  </div>
                )}
              </div>
            </div>
          )}

          <Button 
            className="w-full shadow-glow" 
            size="lg"
            onClick={handleRegisterClick}
            disabled={spotsLeft === 0}
          >
            {spotsLeft === 0 ? 'Event Full' : 'Register Now'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
