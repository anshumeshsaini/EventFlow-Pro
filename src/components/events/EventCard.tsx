import { Event } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, DollarSign, Users } from 'lucide-react';
import { useEvents } from '@/context/EventContext';

interface EventCardProps {
  event: Event;
  onViewDetails: (event: Event) => void;
}

export const EventCard = ({ event, onViewDetails }: EventCardProps) => {
  const { getRegistrationsByEventId } = useEvents();
  const registrations = getRegistrationsByEventId(event.id);
  const totalTickets = registrations.reduce((sum, reg) => sum + reg.numberOfTickets, 0);
  const spotsLeft = event.maxAttendees - totalTickets;

  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-accent text-accent-foreground shadow-lg">
            {event.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="space-y-3 p-5">
        <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-accent transition-colors">
          {event.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4 text-accent" />
            <span>{event.date} at {event.time}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4 text-accent" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="mr-1 h-4 w-4 text-accent" />
              <span className="font-semibold text-foreground">${event.ticketPrice}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="mr-1 h-4 w-4 text-accent" />
              <span className="text-xs">{spotsLeft} spots left</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button 
          className="w-full" 
          onClick={() => onViewDetails(event)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
