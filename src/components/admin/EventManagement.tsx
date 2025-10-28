import { useState } from 'react';
import { useEvents } from '@/context/EventContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Users } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const EventManagement = () => {
  const { events, deleteEvent, getRegistrationsByEventId } = useEvents();
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteEventId) {
      deleteEvent(deleteEventId);
      setDeleteEventId(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Manage Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => {
              const registrations = getRegistrationsByEventId(event.id);
              const totalTickets = registrations.reduce((sum, reg) => sum + reg.numberOfTickets, 0);

              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:border-accent"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{event.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{event.date}</span>
                        <span>•</span>
                        <Badge variant="secondary">{event.category}</Badge>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-3 w-3" />
                        {totalTickets} / {event.maxAttendees} tickets sold
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteEventId(event.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteEventId !== null} onOpenChange={() => setDeleteEventId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this event and all associated registrations.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
