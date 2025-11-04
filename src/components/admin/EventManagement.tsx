import { useState } from 'react';
import { useEvents } from '@/context/EventContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Users, Calendar, MapPin, MoreVertical, Eye, TrendingUp } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const EventManagement = () => {
  const { events, deleteEvent, getRegistrationsByEventId } = useEvents();
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteEventId) {
      deleteEvent(deleteEventId);
      setDeleteEventId(null);
    }
  };

  const getProgressPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'from-red-500 to-rose-600';
    if (percentage >= 70) return 'from-orange-500 to-amber-600';
    if (percentage >= 50) return 'from-yellow-500 to-amber-500';
    return 'from-green-500 to-emerald-600';
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Your Events</h3>
              <p className="text-sm text-muted-foreground">Manage and track your event performance</p>
            </div>
          </div>
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
            {events.length} Active Events
          </Badge>
        </div>

        <div className="space-y-4">
          {events.map((event, index) => {
            const registrations = getRegistrationsByEventId(event.id);
            const totalTickets = registrations.reduce((sum, reg) => sum + reg.numberOfTickets, 0);
            const progressPercentage = getProgressPercentage(totalTickets, event.maxAttendees);
            const progressColor = getProgressColor(progressPercentage);
            const isPopular = progressPercentage >= 80;
            const isHovered = hoveredEvent === event.id;

            return (
              <div
                key={event.id}
                className="relative group cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${progressColor} rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <Card className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-soft-xl hover:shadow-glow transition-all duration-500 overflow-hidden">
                  {/* Popular Event Badge */}
                  {isPopular && (
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 px-3 py-1 shadow-glow">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-muted/50">
                    <div 
                      className={`h-full bg-gradient-to-r ${progressColor} transition-all duration-1000 ease-out`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1 min-w-0">
                        {/* Event Image */}
                        <div className="relative">
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="h-20 w-20 rounded-xl object-cover shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rounded-2xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 min-w-0 space-y-3">
                          <div>
                            <h4 className="text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors duration-300">
                              {event.title}
                            </h4>
                            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span className="truncate">{event.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Stats and Category */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Badge variant="secondary" className="px-3 py-1 font-medium bg-primary/10 text-primary border-primary/20">
                                {event.category}
                              </Badge>
                              
                              <div className="flex items-center gap-1 text-sm font-medium">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-foreground">{totalTickets}</span>
                                <span className="text-muted-foreground">/ {event.maxAttendees} sold</span>
                              </div>
                            </div>

                            {/* Progress Indicator */}
                            <div className="text-right">
                              <div className="text-sm font-bold text-foreground">
                                {progressPercentage.toFixed(0)}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Capacity
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-9 w-9 p-0 rounded-xl border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group/btn"
                        >
                          <Pencil className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-9 w-9 p-0 rounded-xl border-border/50 hover:border-destructive/50 hover:bg-destructive/10 transition-all duration-300 group/btn"
                            >
                              <MoreVertical className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-soft-xl border-border/50">
                            <DropdownMenuItem className="flex items-center gap-2 rounded-lg cursor-pointer">
                              <Eye className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 rounded-lg cursor-pointer">
                              <Pencil className="h-4 w-4" />
                              Edit Event
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center gap-2 rounded-lg cursor-pointer text-destructive focus:text-destructive"
                              onClick={() => setDeleteEventId(event.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete Event
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}

          {events.length === 0 && (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No events yet</h3>
              <p className="text-muted-foreground">Create your first event to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Delete Dialog */}
      <AlertDialog open={deleteEventId !== null} onOpenChange={() => setDeleteEventId(null)}>
        <AlertDialogContent className="rounded-2xl border-border/50 shadow-glow bg-card/95 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg">Delete Event</AlertDialogTitle>
              <AlertDialogDescription className="text-base">
                This will permanently delete this event and all associated registrations.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          
          <AlertDialogFooter className="flex gap-3">
            <AlertDialogCancel className="rounded-xl border-border/50 hover:bg-muted/50 transition-colors">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-gradient-to-r from-destructive to-red-600 text-white rounded-xl shadow-glow hover:shadow-glow-strong transition-all duration-300 hover:scale-105"
            >
              Delete Event
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};