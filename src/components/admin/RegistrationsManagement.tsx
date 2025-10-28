import { useEvents } from '@/context/EventContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';

export const RegistrationsManagement = () => {
  const { events, registrations, checkInAttendee } = useEvents();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Registrations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {registrations.slice(0, 10).map((registration) => {
            const event = events.find(e => e.id === registration.eventId);
            if (!event) return null;

            return (
              <div
                key={registration.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:border-accent"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{registration.name}</h4>
                    {registration.checkedIn ? (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Checked In
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <Circle className="mr-1 h-3 w-3" />
                        Pending
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{registration.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Event: {event.title} • {registration.numberOfTickets} ticket(s)
                  </p>
                </div>
                {!registration.checkedIn && (
                  <Button
                    size="sm"
                    onClick={() => checkInAttendee(registration.id)}
                  >
                    Check In
                  </Button>
                )}
              </div>
            );
          })}
          {registrations.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No registrations yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
